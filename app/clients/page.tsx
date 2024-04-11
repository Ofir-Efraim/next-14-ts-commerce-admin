"use client";
import { useEffect, useState } from "react";
import { deleteClient, getClients } from "../api";
import { client } from "../types";
import ClientsTable from "../components/ClientsTable/ClientsTable";

export default function Home() {
  const [clients, setClients] = useState<client[]>([]);
  const [totalClients, setTotalClients] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const rows_per_page = 10;
  const fetchClients = async () => {
    const res = await getClients(page, rows_per_page);
    setClients(res.data.clients);
    setTotalClients(res.data.total);
  };
  useEffect(() => {
    fetchClients();
  }, [page]);

  const handleDeleteClient = async (ClientId: string) => {
    await deleteClient(ClientId);
    fetchClients();
  };

  return (
    <main>
      <ClientsTable
        page={page}
        setPage={setPage}
        rows_per_page={rows_per_page}
        totalClients={totalClients}
        clients={clients}
        onDeleteClient={handleDeleteClient}
      />
    </main>
  );
}
