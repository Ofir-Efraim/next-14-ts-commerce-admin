"use client";
import { useEffect, useState } from "react";
import { deleteClient, getClients } from "../api";
import { client } from "../types";
import ClientsTable from "../components/ClientsTable/ClientsTable";

export default function Home() {
  const [clients, setClients] = useState<client[]>([]);
  const fetchClients = async () => {
    const res = await getClients();
    setClients(res.data.clients);
  };
  useEffect(() => {
    fetchClients();
  }, []);

  const handleDeleteClient = async (ClientId: string) => {
    await deleteClient(ClientId);
    fetchClients();
  };

  return (
    <main>
      <ClientsTable clients={clients} onDeleteClient={handleDeleteClient} />
    </main>
  );
}
