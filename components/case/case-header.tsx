import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { CaseDetail } from "@/lib/types";

export function CaseHeader({ caseDetail }: { caseDetail: CaseDetail }) {
  return (
    <div className="border-b border-neutral-200 bg-white px-6 pb-4 pt-4">
      <nav aria-label="Breadcrumb" className="text-[11px] font-medium tracking-widest">
        <Link href="/cases/1700541112" className="text-emerald-700 hover:underline">
          CASE
        </Link>
        <span className="mx-1.5 text-neutral-400">/</span>
        <span className="text-neutral-500">{caseDetail.code}</span>
      </nav>

      <div className="mt-1 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold text-neutral-900">
          {caseDetail.corporation.name}
        </h1>
        <span className="text-lg text-neutral-500">
          (Period: {caseDetail.periodStart}-{caseDetail.periodEnd})
        </span>
        <Badge className="rounded-[3px] border border-[#5D86E4] bg-[#1855DF1A] px-1.5 text-[10px] font-semibold tracking-wide text-[#01216B]">
          {caseDetail.status.replace("_", " ")}
        </Badge>

        <div className="ml-auto">
          <Button className="h-8 rounded-[3px] bg-[#0A9648] px-2 text-xs font-bold tracking-wide text-white hover:bg-emerald-700">
            BEGIN
          </Button>
        </div>
      </div>
    </div>
  );
}
