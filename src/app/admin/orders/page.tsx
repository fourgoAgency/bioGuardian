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
import type { Order, OrderItem } from "./order_type";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>(""); // yyyy-mm-dd
  const [endDate, setEndDate] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch orders in real-time
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
      setDeliveredOrders(
        fetchedOrders.filter((o) => o.status?.toLowerCase() === "delivered")
          .length
      );
      setPendingOrders(
        fetchedOrders.filter((o) => o.status?.toLowerCase() === "pending").length
      );

      // Calculate total revenue
      const totalRevenue = fetchedOrders.reduce((acc, order) => {
        const orderItems = order.items || [];
        const orderTotal = orderItems.reduce(
          (sum: number, item: OrderItem) =>
            sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
          0
        );
        return acc + orderTotal;
      }, 0);

      setTotalRevenue(totalRevenue);
    });

    return () => unsubscribe();
  }, []);

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    // ✅ Convert Firestore Timestamp or Date to JS Date
    let orderDate: Date | null = null;
    if (order.created_at instanceof Date) {
      orderDate = order.created_at;
    } else if (order.created_at && "seconds" in order.created_at) {
      orderDate = new Date(order.created_at.seconds * 1000);
    }

    if (!orderDate) return false;

    // ✅ Search filter
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer_name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // ✅ Status filter
    const matchesStatus =
      statusFilter === "all" ||
      order.status?.toLowerCase() === statusFilter.toLowerCase();

    // ✅ Date range filter
    const matchesDateRange = (() => {
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (orderDate < start) return false;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (orderDate > end) return false;
      }
      return true;
    })();

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Calculate filtered revenue
  const filteredRevenue = filteredOrders.reduce((acc, order) => {
    const orderItems = order.items || [];
    const orderTotal = orderItems.reduce(
      (sum, item) =>
        sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
      0
    );
    return acc + orderTotal;
  }, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold m-4">Orders Management</h1>

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
          value={`PKR ${(startDate || endDate ? filteredRevenue : totalRevenue).toLocaleString()
            }`}
          timeframe={
            startDate && endDate
              ? `${startDate} → ${endDate}`
              : startDate
                ? `From ${startDate}`
                : endDate
                  ? `Until ${endDate}`
                  : "All time"
          }
          Icon={DollarSign}
        />

      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <Input
          type="text"
          placeholder="Search order ID or customer name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />

        {/* Status Filter */}
        <div className="w-full md:w-1/4">
          <Select
            onValueChange={(value) => setStatusFilter(value)}
            value={statusFilter}
          >
            <SelectTrigger className="w-full">
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
        </div>

        {/* Date Range Inputs */}
        <div className="flex mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Start Date</p>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
              placeholder="Start Date"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">End Date</p>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full"
              placeholder="End Date"
            />
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full md:w-fit"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setStartDate("");
            setEndDate("");
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0 md:p-4">
          <h1 className="text-xl md:text-2xl font-semibold p-4 pb-0">Orders</h1>
          <div className="overflow-x-auto w-full">
            {filteredOrders.length === 0 ? (
              <p className="p-4">No orders found.</p>
            ) : (
              <OrdersTable orders={filteredOrders} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
