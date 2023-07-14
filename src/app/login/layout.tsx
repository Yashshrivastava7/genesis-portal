"use client";
import { SessionProvider } from "next-auth/react";

export default function RegisterLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        {children}
      </section>
    </SessionProvider>
  );
}
