"use client";
import { useState } from "react";
import OrdersTable from "../components/OrdersTable/OrdersTable";
import { order } from "../types";

export default function Home() {
  const [orders, setOrders] = useState<order[]>([
    {
      orderId: "1",
      firstName: "יאנה",
      lastName: "כהן",
      email: "yana.cohen@example.com",
      phoneNumber: "123-456-7890",
      pickupSpot: "מקום איסוף",
      totalPrice: 40,
      products: [
        {
          name: "מוצר 1",
          price: 20,
          id: "1",
          active: true,
          quantity: 2,
          order_id: "1",
        },
      ],
    },
    {
      orderId: "2",
      firstName: "אבי",
      lastName: "לוי",
      email: "avi.levi@example.com",
      phoneNumber: "987-654-3210",
      pickupSpot: "מקום איסוף נוסף",
      totalPrice: 60 + 75,
      products: [
        {
          name: "מוצר 2",
          price: 30,
          id: "2",
          active: true,
          quantity: 1,
          order_id: "2",
        },
        {
          name: "מוצר 3",
          price: 25,
          id: "3",
          active: true,
          quantity: 3,
          order_id: "2",
        },
      ],
    },
  ]);

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  return (
    <main>
      <OrdersTable orders={orders} onDeleteOrder={handleDeleteOrder} />
    </main>
  );
}
