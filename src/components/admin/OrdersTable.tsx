'use client';
import React, { useState } from "react";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Order } from '@/app/admin/orders/order_type';
import OrderDetailsModal from "./OrderDetailsModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, {
        status,
        updated_at: new Date().toISOString(),
      });
      toast.success("Order status updated successfully!");
    } catch (err) {
      toast.error("Failed to update order status.");
      console.error(err);
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (!orders || orders.length === 0) {
    return <div className="p-4 text-gray-500">No orders found.</div>;
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block w-full overflow-x-auto">
        <Table className="min-w-full">
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
            {orders.map((order, index) => (
              <TableRow
                key={order.id || index}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleOrderClick(order)}
              >
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>
                  <div>{order.customer_email}</div>
                  <div>{order.customer_phone}</div>
                </TableCell>
                <TableCell>{order.total_items} items</TableCell>
                <TableCell className="max-w-xs truncate">
                  {order.shipping_address}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "cancelled"
                        ? "destructive"
                        : order.status === "pending"
                        ? "default"
                        : "secondary"
                    }
                    className={cn({
                      "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80":
                        order.status === "delivered",
                      "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100/80":
                        order.status === "processing",
                      "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100/80":
                        order.status === "shipped",
                      capitalize: true,
                    })}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.created_at
                    ? format(
                        order.created_at instanceof Timestamp
                          ? order.created_at.toDate()
                          : order.created_at,
                        "MMM dd, yyyy HH:mm"
                      )
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      asChild
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        e.stopPropagation()
                      }
                    >
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, "processing");
                        }}
                      >
                        Mark as Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, "shipped");
                        }}
                      >
                        Mark as Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, "delivered");
                        }}
                      >
                        Mark as Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order.id, "cancelled");
                        }}
                        className="text-red-600"
                      >
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View: Cards */}
      <div className="md:hidden space-y-4 ">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
            onClick={() => handleOrderClick(order)}
          >
            <div className="text-sm justify-between">
              <p><strong>Customer:</strong> {order.customer_name}</p>
              <p><strong>Phone:</strong> {order.customer_phone}</p>
              <p><strong>Email:</strong> {order.customer_email}</p>
              <p><strong>Items:</strong> {order.total_items} items</p>
              <p><strong>Address:</strong> {order.shipping_address}</p>
              <div>
                <strong>Status:</strong>{" "}
                <Badge className="ml-1 capitalize">{order.status}</Badge>
              </div>
              <p><strong>Placed:</strong> {order.created_at instanceof Timestamp
                ? format(order.created_at.toDate(), "MMM dd, yyyy HH:mm")
                : "N/A"}</p>
            </div>
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(order.id, "delivered");
                }}
              >
                Mark as Delivered
              </Button>
            </div>
          </div>
        ))}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default OrdersTable;
