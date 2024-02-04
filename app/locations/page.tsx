"use client"
import { useState } from "react";
import Locations from "../components/Locations/Locations";
import { location } from "../types";

export default function Home() {
  const [locations, setLocations] = useState<location[]>([
    {
      name: "בדיקה",
      id: "1",
    },
    {
      name: "בדיקה",
      id: "2",
    },
    {
      name: "בדיקה",
      id: "3",
    },
    {
      name: "בדיקה",
      id: "4",
    },
    {
      name: "בדיקה",
      id: "5",
    },
  ]);

  return (
    <main>
      <Locations locations={locations} setLocations={setLocations} />
    </main>
  );
}
