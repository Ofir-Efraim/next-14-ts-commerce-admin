"use client";
import { useEffect, useState } from "react";
import Locations from "../components/Locations/Locations";
import { location } from "../types";
import { getLocations } from "../api";

export default function Home() {
  const [locations, setLocations] = useState<location[]>([]);
  const fetchLocations = async () => {
    const res = await getLocations();
    setLocations(res.data.locations);
  };
  useEffect(() => {
    fetchLocations();
  }, []);
  return (
    <main>
      <Locations locations={locations} fetchLocations={fetchLocations} />
    </main>
  );
}
