import type { CaseDetail } from "./types";


const cases: Record<string, CaseDetail> = {
  "1700541112": {
    id: "1700541112",
    code: "TA/1700541112",
    status: "NEW",
    periodStart: 2021,
    periodEnd: 2023,
    referenceNumber: "1700541112",
    corporation: {
      name: "Evergrande Holdings Limited",
      id: "1201637",
      nuban: "2482492",
      station: "Ikoyi",
      regNo: "2342411",
      regVerified: true,
      sector: "Manufacturing",
    },
    period: "2021 - 2023",
    directors: 0,
    employees: { total: 0, local: 0, expatriates: 0 },
    progress: { completion: 0 },
    documentRequests: { missingMandatory: 12, pendingUploads: 0 },
    deadlines: {
      dateAssigned: "Oct 18, 2025",
      auditDeadline: "Nov 18, 2025",
      daysElapsed: 14,
    },
    teams: [
      {
        role: "MONITORING",
        name: "Team 001",
        leadLabel: "Team Head",
        leadName: "Ibrahim Musa",
        initials: "FS",
        accent: "pink",
      },
      {
        role: "CONSULTANT",
        name: "Philips Apex",
        code: "89283",
        leadLabel: "Admin",
        leadName: "Hassan Adewale",
        initials: "PC",
        accent: "blue",
      },
    ],
    workflow: [
      {
        step: 1,
        name: "Assignment",
        unit: "Audit Management Office",
        status: "completed",
        completedAt: "Oct 18, 2024 9:05 AM",
      },
      { step: 2, name: "Execution", unit: "Consultant", status: "active" },
      { step: 3, name: "Monitoring", unit: "Head Team", status: "pending" },
      { step: 4, name: "Validation", unit: "Correspondence Unit", status: "pending" },
      { step: 5, name: "Quality Assurance", unit: "Review Unit", status: "pending" },
      { step: 6, name: "Assessment", unit: "Assessment Unit", status: "pending" },
    ],
    timeline: [
      {
        id: "evt-3",
        actor: "Acronym",
        avatar: "logo",
        parts: [
          { kind: "text", text: " updated case status to " },
          { kind: "badge", text: "NEW" },
        ],
        time: "9:00 AM",
      },
      {
        id: "evt-2",
        actor: "Ibrahim Musa",
        avatar: { initials: "IM", accent: "green" },
        parts: [
          { kind: "text", text: " assigned case " },
          { kind: "link", text: "TA/1700541112" },
          { kind: "text", text: " to " },
          { kind: "strong", text: "Phillips Apex" },
          { kind: "text", text: "." },
        ],
        time: "9:00 AM",
      },
      {
        id: "evt-1",
        actor: "Ibrahim Musa",
        avatar: { initials: "IM", accent: "green" },
        parts: [{ kind: "text", text: " created case." }],
        time: "9:00 AM",
      },
    ],
  },
};

export function getCaseById(id: string): CaseDetail | undefined {
  return cases[id];
}
