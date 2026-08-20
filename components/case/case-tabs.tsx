"use client";

import type { ComponentType } from "react";
import { FileText, LayoutGrid, ListChecks, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export type CaseTabId = "overview" | "checklist" | "financial-data" | "reports";

const TABS: { id: CaseTabId; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "checklist", label: "Checklist", icon: ListChecks },
  { id: "financial-data", label: "Financial Data", icon: PieChart },
  { id: "reports", label: "Reports", icon: FileText },
];

export function CaseTabs({
  active,
  onChange,
}: {
  active: CaseTabId;
  onChange: (tab: CaseTabId) => void;
}) {
  return (
    <div role="tablist" className="flex h-12 items-end gap-1 border-b border-neutral-200 bg-white px-4">
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={cn(
              "relative flex h-12 items-center gap-2 px-3 text-sm transition-colors",
              isActive
                ? "font-medium text-neutral-900"
                : "text-neutral-500 hover:text-neutral-800"
            )}
          >
            <Icon className={cn("size-4", isActive && "text-emerald-600")} />
            {label}
            {isActive && <span className="absolute inset-x-2 bottom-0 h-0.5 bg-emerald-600" />}
          </button>
        );
      })}
    </div>
  );
}
