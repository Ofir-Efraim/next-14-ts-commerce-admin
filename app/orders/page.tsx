"use client";
import { useEffect, useState } from "react";
import OrdersTable from "../components/OrdersTable/OrdersTable";
import { order, Query } from "../types";
import {
  deleteOrder,
  getOrders,
  markOrderDelivered,
  markOrderNew,
  markOrderPaid,
  markOrderUnpaid,
  markOrderBagged,
  markOrderUnbagged,
} from "../api";

export default function Home() {
  const [orders, setorders] = useState<order[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<Query>({});
  const [page, setPage] = useState<number>(1);
  const rows_per_page = 10;
  const fetchorders = async () => {
    let res = null;
    res = await getOrders(page, rows_per_page, query, search);
    setorders(res.data.orders);
    setTotalOrders(res.data.total);
  };
  useEffect(() => {
    fetchorders();
  }, [query, page, search]);

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
  const handleToggleOrderBagged = async (orderId: string, bagged: boolean) => {
    if (bagged) {
      await markOrderUnbagged(orderId);
    } else {
      await markOrderBagged(orderId);
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
  const handleRemoveQuery = (queryKey: string, queryValue?: string) => {
    setQuery((prevQuery) => {
      const existingValue = prevQuery[queryKey];

      if (Array.isArray(existingValue)) {
        // If a specific value is provided, remove it from the array
        const updatedArray = existingValue.filter(
          (item) => item !== queryValue
        );

        // If the array is empty, remove the key entirely, otherwise update the key with the new array
        if (updatedArray.length === 0) {
          const { [queryKey]: _, ...newQuery } = prevQuery;
          return newQuery;
        } else {
          return { ...prevQuery, [queryKey]: updatedArray };
        }
      } else {
        // If no value or the key does not exist, remove the key entirely
        const { [queryKey]: _, ...newQuery } = prevQuery;
        return newQuery;
      }
    });
  };

  const handleAddQuery = (queryKey: string, queryValue: string) => {
    setQuery((prevQuery) => {
      const existingValue = prevQuery[queryKey];

      if (Array.isArray(existingValue)) {
        // If the value is already an array, add the new value to the array
        return { ...prevQuery, [queryKey]: [...existingValue, queryValue] };
      } else {
        // If the key does not exist or exists but is not an array, create a new array with the new value
        return { ...prevQuery, [queryKey]: [queryValue] };
      }
    });
  };

  return (
    <main>
      <OrdersTable
        page={page}
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        rows_per_page={rows_per_page}
        totalOrders={totalOrders}
        orders={orders}
        onDeleteOrder={handleDeleteOrder}
        onToggleOrderStatus={handleToggleOrderStatus}
        onToggleOrderBagged={handleToggleOrderBagged}
        onToggleOrderPaid={handleToggleOrderPaid}
        handleAddQuery={handleAddQuery}
        handleRemoveQuery={handleRemoveQuery}
      />
    </main>
  );
}
