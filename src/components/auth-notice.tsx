"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
export function AuthNotice() {
  const p = useSearchParams();
  useEffect(() => {
    if (p.get("reason") === "protected")
      toast.error("বিস্তারিত দেখতে আগে সাইন ইন করুন");
  }, [p]);
  return null;
}
