"use client";
import React from "react";
import styles from "./Topbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Topbar() {
  const pathName = usePathname();
  return (
    <nav className={styles.nav}>
      <Link
        href="/products"
        style={
          pathName === "/products"
            ? {
                backgroundColor: "#555",
                color: "#fff",
              }
            : {}
        }
        className={styles.link}
      >
        מוצרים
      </Link>
      <Link
        href="/locations"
        style={
          pathName === "/locations"
            ? {
                backgroundColor: "#555",
                color: "#fff",
              }
            : {}
        }
        className={styles.link}
      >
        מיקומים
      </Link>
      <Link
        href="/orders"
        style={
          pathName === "/orders"
            ? {
                backgroundColor: "#555",
                color: "#fff",
              }
            : {}
        }
        className={styles.link}
      >
        הזמנות
      </Link>
      <Link
        href="/clients"
        style={
          pathName === "/clients"
            ? {
                backgroundColor: "#555",
                color: "#fff",
              }
            : {}
        }
        className={styles.link}
      >
        לקוחות
      </Link>
      <Link
        href="/couponCodes"
        style={
          pathName === "/couponCodes"
            ? {
                backgroundColor: "#555",
                color: "#fff",
              }
            : {}
        }
        className={styles.link}
      >
        קודי קופון
      </Link>
    </nav>
  );
}
