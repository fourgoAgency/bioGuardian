import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';
import type { Order } from '@/app/admin/orders/order_type'
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderSlip from '@/components/admin/OrderSlip'; 


interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  const [updating, setUpdating] = useState(false);

  if (!order) return null;

  const items = order?.items ?? [];
  const grandTotal = items.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );


  const handleStatusChange = async (newStatus: string) => {
    try {
      setUpdating(true);
      const OrderId = order?.id;
      if (!OrderId) {
        toast.error('Order ID is missing');
        return;
      }
      const orderRef = doc(db, 'orders', OrderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updated_at: new Date().toISOString(),
      });
      toast.success(`Order status updated to ${newStatus}`);
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - #{order.id?.slice(0, 8)}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{order.customer_email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{order.customer_phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-medium capitalize">{order.payment_method.replace('_', ' ')}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Shipping Address</h3>
            <p className="text-gray-700">{order.shipping_address}</p>
          </div>

          {/* Order Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Order Status</h3>
            <div className="flex items-center gap-4">
              <Badge
                variant={
                  order.status === 'cancelled' ? 'destructive'
                    : order.status === 'pending' ? 'default'
                      : 'secondary'
                }
                className={cn({
                  "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80": order.status === 'delivered',
                  "capitalize": true,
                })}
              >
                {order.status}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={order.status === status ? 'default' : 'outline'}
                  disabled={updating}
                  onClick={() => handleStatusChange(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Order Items ({order.total_items})</h3>
            <div className="space-y-3">
              {items.map((item: { name: string; price: number; quantity: number }, index: number) => (
                <div key={index} className="bg-white p-3 rounded border flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">PKR {item.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total: PKR {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center font-semibold text-lg">
                <span>Grand Total</span>
                <span>PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Notes</h3>
              <p className="text-gray-700">{order.notes}</p>
            </div>
          )}
        </div>
        <PDFDownloadLink
          document={<OrderSlip order={order} />}
          fileName={`order-slip-${order.id?.slice(0, 8)}.pdf`}
        >
          {({ loading }) => (
            <Button className="mt-6" disabled={loading}>
              {loading ? 'Preparing Slip...' : 'Download Slip'}
            </Button>
          )}
        </PDFDownloadLink>

      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
