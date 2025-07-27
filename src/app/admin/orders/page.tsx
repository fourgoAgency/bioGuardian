"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import OverviewCard from "@/components/admin/OverviewCard";
import { BaggageClaim, DollarSign, ShoppingBag, Truck } from "lucide-react";
import OrdersTable from "@/components/admin/OrdersTable";
import type { Order, OrderItem } from './order_type'

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Real-time listener
  useEffect(() => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("created_at", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        ...(doc.data() as Order),
        id: doc.id,
      }));

      setOrders(fetchedOrders);
      setTotalOrders(fetchedOrders.length);
      setDeliveredOrders(fetchedOrders.filter((o) => o.status === "delivered").length);
      setPendingOrders(fetchedOrders.filter((o) => o.status === "pending").length);

      // ✅ FIX: Calculate revenue from items array
      const totalRevenue = fetchedOrders.reduce((acc, order) => {
        const orderItems = (order).items || [];
        const orderTotal = orderItems.reduce(
          (sum: number, item: OrderItem) =>
            sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
          0
        );

        return acc + orderTotal;
      }, 0);

      setTotalRevenue(totalRevenue);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
  // Inside OrdersPage component

  const filteredOrders = orders.filter((order) => {
    // ✅ Search filter (matches ID or customer name)
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // ✅ Status filter
    const matchesStatus =
      statusFilter === "all" ||
      order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // ✅ Calculate filtered revenue
  const filteredRevenue = filteredOrders.reduce((acc, order) => {
    const orderItems = order.items || [];
    const orderTotal = orderItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
    return acc + orderTotal;
  }, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders Management</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          timeframe="All time"
          Icon={ShoppingBag}
        />
        <OverviewCard
          title="Delivered Orders"
          value={deliveredOrders.toLocaleString()}
          timeframe="All time"
          Icon={Truck}
        />
        <OverviewCard
          title="Pending Orders"
          value={pendingOrders.toLocaleString()}
          timeframe="All time"
          Icon={BaggageClaim}
        />
        <OverviewCard
          title="Total Revenue"
          value={`PKR ${statusFilter === "all"
              ? totalRevenue.toLocaleString()
              : filteredRevenue.toLocaleString()
            }`}
          timeframe="All time"
          Icon={DollarSign}
        />

      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <Input
          type="text"
          placeholder="Search order ID or customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 sm:mb-0"
        />

        <Select onValueChange={(value) => setStatusFilter(value)} value={statusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Orders</h1>
          {orders.length === 0 ? <p>No orders found.</p> : <OrdersTable orders={filteredOrders} />}
        </CardContent>
      </Card>
    </div>
  );
}
