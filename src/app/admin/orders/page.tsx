'use client';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  total_items: number;
  created_at: any;
  items: any[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersData: any[] = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Orders</h2>
      <div className="overflow-x-auto rounded shadow border border-gray-300">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left">Customer Name</th>
              <th className="px-4 py-2 border-b text-left">Customer Email</th>
              <th className="px-4 py-2 border-b text-left">Phone</th>
              <th className="px-4 py-2 border-b text-left">Address</th>
              <th className="px-4 py-2 border-b text-center">Total Items</th>
              <th className="px-4 py-2 border-b text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <td className="px-4 py-2 border-b">{order.customer_name}</td>
                <td className="px-4 py-2 border-b">{order.customer_email}</td>
                <td className="px-4 py-2 border-b">{order.customer_phone}</td>
                <td className="px-4 py-2 border-b">{order.shipping_address}</td>
                <td className="px-4 py-2 border-b text-center">
                  {order.total_items}
                </td>
                <td className="px-4 py-2 border-b">
                  {order.created_at && order.created_at.seconds
                    ? new Date(order.created_at.seconds * 1000).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
              onClick={() => setSelectedOrder(null)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">
              Order Details - #{selectedOrder.id.slice(0, 8)}
            </h3>
            <p className="mb-2">
              <strong>Customer:</strong> {selectedOrder.customer_name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {selectedOrder.customer_email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {selectedOrder.customer_phone}
            </p>
            <p className="mb-4">
              <strong>Address:</strong> {selectedOrder.shipping_address}
            </p>
            <h4 className="text-lg font-semibold mb-2">Products</h4>
            <table className="min-w-full text-sm border mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 border">Product</th>
                  <th className="py-2 px-3 border">Quantity</th>
                  <th className="py-2 px-3 border">Price</th>
                  <th className="py-2 px-3 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 px-3 border">{item.name}</td>
                    <td className="py-2 px-3 border">{item.quantity}</td>
                    <td className="py-2 px-3 border">Rs {item.price}</td>
                    <td className="py-2 px-3 border">
                      Rs {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right font-bold">
              Grand Total: Rs{" "}
              {selectedOrder.items?.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;










