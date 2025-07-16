import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import OrderDetailsModal from './OrderDetailsModal';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  status: string;
  created_at: string;
  updated_at: string;
  total_items: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  notes?: string;
}

const fetchOrders = async (): Promise<Order[]> => {
  const ordersRef = collection(db, 'orders');
  const q = query(ordersRef, orderBy('created_at', 'desc'));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Order),
  }));
};

const updateOrderStatus = async ({ id, status }: { id: string, status: string }) => {
  const orderRef = doc(db, 'orders', id);
  await updateDoc(orderRef, {
    status,
    updated_at: new Date().toISOString(),
  });
};

const OrdersTable = () => {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: orders, isLoading, error } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const mutation = useMutation({
    mutationFn: updateOrderStatus,
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ['orders'] });
      const previousOrders = queryClient.getQueryData<Order[]>(['orders']);
      if (previousOrders) {
        queryClient.setQueryData<Order[]>(['orders'],
          previousOrders.map(order =>
            order.id === id ? { ...order, status: status } : order
          )
        );
      }
      return { previousOrders };
    },
    onError: (err, variables, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(['orders'], context.previousOrders);
      }
      toast.error('Failed to update order status.');
    },
    onSuccess: () => {
        toast.success('Order status updated successfully!');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleStatusChange = (id: string, status: string) => {
    mutation.mutate({ id, status });
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="p-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error fetching orders: {error.message}</div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Placed At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow 
              key={order.id} 
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => handleOrderClick(order)}
            >
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>
                <div>{order.customer_email}</div>
                <div>{order.customer_phone}</div>
              </TableCell>
              <TableCell>{order.total_items} items</TableCell>
              <TableCell className="max-w-xs truncate">{order.shipping_address}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === 'cancelled' ? 'destructive'
                    : order.status === 'pending' ? 'default'
                    : 'secondary'
                  }
                  className={cn({
                    "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80": order.status === 'delivered',
                    "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100/80": order.status === 'processing',
                    "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100/80": order.status === 'shipped',
                    "capitalize": true,
                  })}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'processing'); }}>
                      Mark as Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'shipped'); }}>
                      Mark as Shipped
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'delivered'); }}>
                      Mark as Delivered
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleStatusChange(order.id, 'cancelled'); }} className="text-red-600">
                      Cancel Order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default OrdersTable;
