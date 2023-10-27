import DashboardSideNav from "@/components/dashboard/dashboard-side-nav";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard | TopicHub",
  description: "The website dashboard.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="w-full space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Users and topics management dashboard.
        </p>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DashboardSideNav />
        <section className="flex-1 lg:max-w-2xl">{children}</section>
      </div>
    </section>
  );
}
