"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  /** Path prefix used for active matching when href points at a specific record. */
  match?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Cases", href: "/cases/1700541112", match: "/cases" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center border-b border-neutral-200 bg-white pr-4">
      <div className="flex h-full items-center px-4">
        <Link
          href="/"
          aria-label="Home"
          className="flex size-8 items-center justify-center rounded-md bg-neutral-950"
        >
          <span className="size-3 rounded-full border-2 border-white" />
        </Link>
      </div>

      <nav className="flex h-full items-center">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.match ?? item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative flex h-full items-center px-4 text-sm transition-colors",
                active
                  ? "font-medium text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              )}
            >
              {item.label}
              {active && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 bg-emerald-600" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-8 items-center justify-center rounded-md text-neutral-600 hover:bg-neutral-100"
        >
          <Bell className="size-4" />
        </button>
        <span className="h-6 w-px bg-neutral-200" aria-hidden />
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-neutral-900">Hassan Adewale</p>
          <p className="text-[10px] tracking-widest text-neutral-500">ADMINISTRATOR</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-full border border-neutral-200 p-0.5 pr-1.5 hover:bg-neutral-50"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-800">
            HA
          </span>
          <ChevronDown className="size-3.5 text-neutral-500" />
        </button>
      </div>
    </header>
  );
}
