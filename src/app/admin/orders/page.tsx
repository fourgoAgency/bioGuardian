"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import OverviewCard from "@/components/admin/OverviewCard";
import { BaggageClaim, DollarSign, ShoppingBag, Truck } from "lucide-react";
import { Timestamp } from "firebase/firestore";
import OrdersTable from "@/components/admin/OrdersTable";

// Dummy data (Replace with real data from backend later)
const dummyOrders: Order[] = [
  {
    id: "1",
    productName: "Product A",
    status: "Delivered",
    price: 50,
    quantity: 2,
    timestamp: new Date(),
    orderId: "ORD-001",
    customerName: "Alice",
    paymentStatus: "Paid",
  },
  {
    id: "2",
    productName: "Product B",
    status: "Pending",
    price: 30,
    quantity: 1,
    timestamp: new Date(),
    orderId: "ORD-002",
    customerName: "Bob",
    paymentStatus: "Unpaid",
  },
];

interface Order {
  id: string;
  productName: string;
  status: string;
  price: number;
  quantity: number;
  timestamp: Timestamp | Date;
  orderId?: string;
  customerName?: string;
  paymentStatus?: string;
}





export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");


  const filteredOrders = useMemo(() => {
    return dummyOrders.filter((order) => {
      const matchesSearch =
        (order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesStatus =
        statusFilter !== "all" ? order.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalOrders = dummyOrders.length;
  const deliveredOrders = dummyOrders.filter((o) => o.status === "Delivered").length;
  const pendingOrders = dummyOrders.filter((o) => o.status === "Pending").length;
  const totalRevenue = dummyOrders.reduce(
    (acc, o) => (o.paymentStatus === "Paid" ? acc + o.price * o.quantity : acc),
    0
  );

  return (
    <div className="flex h-screen w-full overflow-hidden justify-center">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <OverviewCard title="Total Orders" value={totalOrders.toLocaleString()} timeframe="All time" Icon={ShoppingBag} />
          <OverviewCard title="Delivered Orders" value={deliveredOrders.toLocaleString()} timeframe="All time" Icon={Truck} />
          <OverviewCard title="Pending Orders" value={pendingOrders.toLocaleString()} timeframe="All time" Icon={BaggageClaim} />
          <OverviewCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} timeframe="All time" Icon={DollarSign} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
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
       <Card>
         <CardContent className="p-4">
           <h1 className="text-2xl font-semibold mb-4">Orders</h1>
           {filteredOrders.length === 0 ? (
             <p>No orders found.</p>
           ) : (
       <OrdersTable/>
           )}
        {/* Orders Table
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        {order.timestamp
                          ? format(
                            order.timestamp instanceof Timestamp
                              ? order.timestamp.toDate()
                              : order.timestamp,
                            "MMM dd, yyyy HH:mm"
                          )
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-sm rounded ${statusColor[order.status] || "bg-gray-100 text-gray-800"}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        ${(order.price * order.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-sm rounded ${paymentColor[order.paymentStatus ?? ""] || "bg-gray-100 text-gray-800"}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
