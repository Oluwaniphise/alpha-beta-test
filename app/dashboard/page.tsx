import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <LayoutDashboard className="size-8 text-neutral-300" />
      <h1 className="mt-3 text-base font-semibold text-neutral-900">Dashboard</h1>
      <p className="mt-1 max-w-sm text-sm text-neutral-500">
        Aggregate case metrics will appear here. Head over to a case to see the
        detail view.
      </p>
    </div>
  );
}
