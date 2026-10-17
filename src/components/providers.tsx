"use client";
import { Toaster } from "react-hot-toast";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        containerStyle={{ top: 82 }}
        toastOptions={{ duration: 3500 }}
      />
    </>
  );
}
