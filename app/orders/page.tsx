"use client";
import { useEffect, useState } from "react";
import OrdersTable from "../components/OrdersTable/OrdersTable";
import { order } from "../types";
import {
  deleteOrder,
  getNewOrders,
  getOrders,
  markOrderDelivered,
  markOrderNew,
} from "../api";

export default function Home() {
  const [orders, setorders] = useState<order[]>([]);
  const [isNew, setIsNew] = useState<boolean>(true);
  const fetchorders = async () => {
    let res = null;
    if (isNew) {
      res = await getNewOrders();
    } else {
      res = await getOrders();
    }
    setorders(res.data.orders);
  };
  useEffect(() => {
    fetchorders();
  }, [isNew]);

  const handleDeleteOrder = async (orderId: string) => {
    await deleteOrder(orderId);
    fetchorders();
  };
  const handleToggleOrderStatus = async (orderId: string, status: string) => {
    if (status === "new") {
      await markOrderDelivered(orderId);
    } else {
      await markOrderNew(orderId);
    }
    fetchorders();
  };

  return (
    <main>
      <OrdersTable
        orders={orders}
        onDeleteOrder={handleDeleteOrder}
        onToggleOrderStatus={handleToggleOrderStatus}
        setIsNew={setIsNew}
      />
    </main>
  );
}
