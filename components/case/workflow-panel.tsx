"use client";

import { useState } from "react";
import { Check, ChevronUp } from "lucide-react";
import type { WorkflowStep } from "@/lib/types";
import { cn } from "@/lib/utils";

function StepIndicator({ step }: { step: WorkflowStep }) {
  if (step.status === "completed") {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-emerald-600">
        <Check className="size-3 text-white" strokeWidth={3} />
      </span>
    );
  }
  if (step.status === "active") {
    return (
      <span className="flex size-5 items-center justify-center rounded-full bg-blue-500 text-[11px] font-semibold text-white">
        {step.step}
      </span>
    );
  }
  return (
    <span className="bg-white rounded-full flex size-5 items-center justify-center text-xs text-[#565656]">
      {step.step}
    </span>
  );
}

export function WorkflowPanel({ steps }: { steps: WorkflowStep[] }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section aria-labelledby="workflow-heading" className="border-b bg-[#F9F9F9] border-neutral-200">
      <div className="flex h-12 items-center justify-between border-b border-neutral-200 px-4">
        <h2 id="workflow-heading" className="text-sm font-semibold text-neutral-900">
          Workflow Progress
        </h2>
        <button
          type="button"
          aria-label={collapsed ? "Expand workflow" : "Collapse workflow"}
          onClick={() => setCollapsed((c) => !c)}
          className="text-neutral-400 hover:text-neutral-600"
        >
          <ChevronUp className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {!collapsed && (
        <ol className="px-4 py-4">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li key={step.step} className="relative flex gap-3 pb-5 last:pb-0">
                {!isLast && (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-2.5 top-6 h-[calc(100%-1.25rem)] w-px -translate-x-1/2",
                      step.status === "completed" ? "bg-emerald-600" : "bg-neutral-200"
                    )}
                  />
                )}
                <div className="relative z-10 mt-0.5 shrink-0">
                  <StepIndicator step={step} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900">{step.name}</p>
                  <span className="mt-1 inline-block border border-neutral-200 bg-[#EFEEEC] px-1.5 py-0.5 text-[10px] font-medium text-[#565656]">
                    {step.unit}
                  </span>
                  {step.status === "completed" && step.completedAt && (
                    <p className="mt-1 text-[11px] text-neutral-500">
                      Completed: <span className="font-medium text-neutral-700">{step.completedAt}</span>
                    </p>
                  )}
                  {step.status === "active" && (
                    <p className="mt-1 text-[11px] text-neutral-500">Pending</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
