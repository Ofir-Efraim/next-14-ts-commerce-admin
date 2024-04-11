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
  markOrderPaid,
  markOrderUnpaid,
} from "../api";

export default function Home() {
  const [orders, setorders] = useState<order[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const rows_per_page = 10;
  const fetchorders = async () => {
    let res = null;
    if (isNew) {
      res = await getNewOrders(page, rows_per_page);
    } else {
      res = await getOrders(page, rows_per_page);
    }
    setorders(res.data.orders);
    setTotalOrders(res.data.total);
  };
  useEffect(() => {
    fetchorders();
  }, [isNew, page]);

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
  const handleToggleOrderPaid = async (orderId: string, paid: boolean) => {
    if (paid) {
      await markOrderUnpaid(orderId);
    } else {
      await markOrderPaid(orderId);
    }
    fetchorders();
  };

  return (
    <main>
      <OrdersTable
        page={page}
        setPage={setPage}
        rows_per_page={rows_per_page}
        totalOrders={totalOrders}
        orders={orders}
        onDeleteOrder={handleDeleteOrder}
        onToggleOrderStatus={handleToggleOrderStatus}
        onToggleOrderPaid={handleToggleOrderPaid}
        setIsNew={setIsNew}
        fetchorders={fetchorders}
      />
    </main>
  );
}
