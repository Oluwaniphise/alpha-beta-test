import type { CaseDetail, Team } from "@/lib/types";
import { cn } from "@/lib/utils";

const ACCENT_CLASSES: Record<Team["accent"], string> = {
  pink: "bg-fuchsia-100 text-fuchsia-700",
  blue: "bg-blue-500 text-white",
  green: "bg-emerald-600 text-white",
};

function TeamCard({ team }: { team: Team }) {
  return (
    <div className="flex items-center gap-4 border border-dashed border-neutral-300 bg-white p-4">
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
          ACCENT_CLASSES[team.accent]
        )}
      >
        {team.initials}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold tracking-widest text-neutral-500">
          {team.role}
        </p>
        <p className="truncate text-sm font-semibold text-neutral-900">
          {team.name}
          {team.code && (
            <span className="font-normal text-neutral-500"> ({team.code})</span>
          )}
        </p>
        <p className="truncate text-xs text-neutral-500">
          {team.leadLabel}: {team.leadName}
        </p>
      </div>
    </div>
  );
}

export function TeamsSection({ caseDetail }: { caseDetail: CaseDetail }) {
  return (
    <section aria-labelledby="teams-heading">
      <h2 id="teams-heading" className="pb-4 text-sm font-semibold text-neutral-900">
        Teams
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {caseDetail.teams.map((team) => (
          <TeamCard key={team.role} team={team} />
        ))}
      </div>
    </section>
  );
}
