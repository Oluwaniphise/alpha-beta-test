"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { CaseHeader } from "@/components/case/case-header";
import { CaseTabs, type CaseTabId } from "@/components/case/case-tabs";
import { InfoSection } from "@/components/case/info-section";
import { SummaryCards } from "@/components/case/summary-cards";
import { TeamsSection } from "@/components/case/teams-section";
import { WorkflowPanel } from "@/components/case/workflow-panel";
import { TimelinePanel } from "@/components/case/timeline-panel";
import {
  CaseErrorState,
  CasePageSkeleton,
  TabEmptyState,
} from "@/components/case/states";
import { useCaseDetail } from "@/lib/queries";
import { ApiError } from "@/lib/api";

const TAB_LABELS: Record<Exclude<CaseTabId, "overview">, string> = {
  checklist: "Checklist items",
  "financial-data": "Financial data",
  reports: "Reports",
};

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<CaseTabId>("overview");
  const { data, status, error, refetch } = useCaseDetail(id);

  if (status === "pending") {
    return <CasePageSkeleton />;
  }

  if (status === "error") {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <CaseErrorState
        message={error.message}
        notFound={notFound}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <>
      <CaseHeader caseDetail={data} />

      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="min-w-0 flex-1">
          <CaseTabs active={activeTab} onChange={setActiveTab} />

          {activeTab === "overview" ? (
            <div className="px-6 py-5">
              <InfoSection caseDetail={data} />
              <div className="my-6 border-t border-dashed border-neutral-200" />
              <SummaryCards caseDetail={data} />
              <div className="my-6 border-t border-dashed border-neutral-200" />
              {/* <TeamsSection caseDetail={data} /> */}
            </div>
          ) : (
            <TabEmptyState tabLabel={TAB_LABELS[activeTab]} />
          )}
        </main>

        <aside className="w-full shrink-0 border-t border-neutral-200 lg:w-[384px] lg:border-l lg:border-t-0">
          {/* <WorkflowPanel steps={data.workflow} /> */}
          <TimelinePanel events={data.timeline} />
        </aside>
      </div>
    </>
  );
}
