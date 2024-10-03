"use client";
import { useEffect, useState } from "react";
import CouponCodes from "../components/CouponCodes/CouponCodes";
import { couponCode } from "../types";
import { getCouponCodes } from "../api";

export default function Home() {
  const [couponCodes, setCouponCodes] = useState<couponCode[]>([]);
  const fetchCouponCodes = async () => {
    const res = await getCouponCodes();
    setCouponCodes(res.data.coupon_codes);
  };
  useEffect(() => {
    fetchCouponCodes();
  }, []);
  return (
    <main>
      <CouponCodes couponCodes={couponCodes} fetchCouponCodes={fetchCouponCodes} />
    </main>
  );
}
