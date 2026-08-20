export type CaseStatus = "NEW" | "IN_PROGRESS" | "CLOSED";

export interface Corporation {
  name: string;
  id: string;
  nuban: string;
  station: string;
  regNo: string;
  regVerified: boolean;
  sector: string;
}

export interface EmployeeBreakdown {
  total: number;
  local: number;
  expatriates: number;
}

export interface ProgressSummary {
  completion: number;
}

export interface DocumentRequestSummary {
  missingMandatory: number;
  pendingUploads: number;
}

export interface DeadlineSummary {
  dateAssigned: string;
  auditDeadline: string;
  daysElapsed: number;
}

export type TeamRole = "MONITORING" | "CONSULTANT";

export interface Team {
  role: TeamRole;
  name: string;
  code?: string;
  leadLabel: string;
  leadName: string;
  initials: string;

  accent: "pink" | "blue" | "green";
}

export type WorkflowStepStatus = "completed" | "active" | "pending";

export interface WorkflowStep {
  step: number;
  name: string;
  unit: string;
  status: WorkflowStepStatus;
  completedAt?: string;
}

export interface TimelineEvent {
  id: string;
  actor: string;
  avatar: "logo" | { initials: string; accent: "green" | "blue" };
  parts: TimelineMessagePart[];
  time: string;
}

export type TimelineMessagePart =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "badge"; text: string };

export interface CaseDetail {
  id: string;
  code: string;
  status: CaseStatus;
  periodStart: number;
  periodEnd: number;
  referenceNumber: string;
  corporation: Corporation;
  period: string;
  directors: number;
  employees: EmployeeBreakdown;
  progress: ProgressSummary;
  documentRequests: DocumentRequestSummary;
  deadlines: DeadlineSummary;
  teams: Team[];
  workflow: WorkflowStep[];
  timeline: TimelineEvent[];
}

export interface ApiErrorBody {
  message: string;
}
