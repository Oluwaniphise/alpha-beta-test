import { NextResponse } from "next/server";
import { getCaseById } from "@/lib/mock-db";
import type { ApiErrorBody, CaseDetail } from "@/lib/types";

const MOCK_LATENCY_MS = 700;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * GET /api/cases/:id
 * Append ?fail=1 to simulate a server error (used to demo the error state).
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<CaseDetail | ApiErrorBody>> {
  const { id } = await params;
  await delay(MOCK_LATENCY_MS);

  if (new URL(request.url).searchParams.get("fail") === "1") {
    return NextResponse.json(
      { message: "Upstream case service unavailable." },
      { status: 502 }
    );
  }

  const caseDetail = getCaseById(id);
  if (!caseDetail) {
    return NextResponse.json(
      { message: `Case ${id} was not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(caseDetail);
}
