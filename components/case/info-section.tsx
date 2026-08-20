"use client";

import { useState, type ReactNode } from "react";
import { BadgeCheck, Check, Copy } from "lucide-react";
import type { CaseDetail } from "@/lib/types";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-medium tracking-wider text-neutral-500">{label}</p>
      <div className="mt-1 text-sm text-neutral-900">{children}</div>
    </div>
  );
}

export function InfoSection({ caseDetail }: { caseDetail: CaseDetail }) {
  const { corporation, employees } = caseDetail;
  const [copied, setCopied] = useState(false);

  const copyReference = async () => {
    await navigator.clipboard.writeText(caseDetail.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section aria-labelledby="info-heading">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
        <h2 id="info-heading" className="text-sm font-semibold text-neutral-900">
          Information
        </h2>
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-neutral-500">Reference Number:</span>
          <span className="font-semibold text-neutral-900">{caseDetail.referenceNumber}</span>
          <button
            type="button"
            aria-label="Copy reference number"
            onClick={copyReference}
            className="ml-1 text-emerald-600 hover:text-emerald-700"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-dashed border-neutral-200 pt-5 md:grid-cols-4">
        <Field label="CORPORATION NAME">{corporation.name}</Field>
        <Field label="ID">{corporation.id}</Field>
        <Field label="NUBAN">{corporation.nuban}</Field>
        <Field label="STATION">{corporation.station}</Field>

        <Field label="REG NO.">
          <span className="flex items-center gap-1.5">
            {corporation.regNo}
            {corporation.regVerified && (
              <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-emerald-600">
                <BadgeCheck className="size-3.5" /> VERIFIED
              </span>
            )}
          </span>
        </Field>
        <Field label="PERIOD">{caseDetail.period}</Field>
        <Field label="NO. OF DIRECTORS">{caseDetail.directors}</Field>
        <Field label="NO. OF EMPLOYEES">
          Total: {employees.total} Local: {employees.local} Expatriates: {employees.expatriates}
        </Field>

        <Field label="SECTOR / INDUSTRY">{corporation.sector}</Field>
      </div>
    </section>
  );
}
