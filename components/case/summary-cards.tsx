import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, Clock } from "lucide-react";
import type { CaseDetail } from "@/lib/types";

function SummaryCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col border border-neutral-200 bg-white p-4">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="mt-0.5 text-xs text-neutral-500">{subtitle}</p>
      <div className="mt-4 flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function LinkButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
    >
      {children} <ArrowRight className="size-3.5" />
    </button>
  );
}

export function SummaryCards({ caseDetail }: { caseDetail: CaseDetail }) {
  const { progress, documentRequests, deadlines } = caseDetail;

  return (
    <section aria-label="Case summary" className="grid gap-4 md:grid-cols-3">
      <SummaryCard title="Progress" subtitle="Monitors progress towards submission requirements">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-semibold text-emerald-600">
            {progress.completion}%
          </span>
          <LinkButton>View evidence</LinkButton>
        </div>
        <p className="mt-auto border-t border-dashed border-neutral-200 pt-3 text-xs text-neutral-500">
          Completion of mandatory checklist items.
        </p>
      </SummaryCard>

      <SummaryCard title="Document Requests" subtitle="Actionable items requiring taxpayer input">
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-neutral-700">
              <AlertTriangle className="size-4 text-red-500" />
              Missing mandatory documents
            </dt>
            <dd className="font-semibold text-neutral-900">
              {documentRequests.missingMandatory}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-2 text-neutral-700">
              <Clock className="size-4 text-neutral-400" />
              Pending document uploads
            </dt>
            <dd className="font-semibold text-neutral-900">
              {documentRequests.pendingUploads}
            </dd>
          </div>
        </dl>
        <div className="mt-auto pt-3 text-right">
          <LinkButton>View all requests</LinkButton>
        </div>
      </SummaryCard>

      <SummaryCard title="Deadlines" subtitle="Critical case metrics & dates">
        <dl className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">Date assigned</dt>
            <dd className="font-medium text-neutral-900">{deadlines.dateAssigned}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">Audit Deadline</dt>
            <dd className="font-medium text-neutral-900">{deadlines.auditDeadline}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">Days elapsed</dt>
            <dd className="font-medium text-neutral-900">{deadlines.daysElapsed} days</dd>
          </div>
        </dl>
      </SummaryCard>
    </section>
  );
}
