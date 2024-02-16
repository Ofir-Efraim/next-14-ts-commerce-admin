"use client";
import { useEffect, useState } from "react";
import OrdersTable from "../components/OrdersTable/OrdersTable";
import { order } from "../types";
import { deleteOrder, getOrders } from "../api";

export default function Home() {
  const [orders, setorders] = useState<order[]>([]);
  const fetchorders = async () => {
    const res = await getOrders();
    setorders(res.data.orders);
  };
  useEffect(() => {
    fetchorders();
  }, []);

  const handleDeleteOrder = async (orderId: string) => {
    await deleteOrder(orderId);
    fetchorders();
  };

  return (
    <main>
      <OrdersTable orders={orders} onDeleteOrder={handleDeleteOrder} />
    </main>
  );
}
