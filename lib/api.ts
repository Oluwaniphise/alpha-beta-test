import type { ApiErrorBody, CaseDetail } from "./types";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = (await res.json()) as ApiErrorBody;
      if (body.message) message = body.message;
    } catch {
      // non-JSON error body — keep the generic message
    }
    throw new ApiError(message, res.status);
  }
  return (await res.json()) as T;
}

export function fetchCase(id: string, options?: { fail?: boolean }): Promise<CaseDetail> {
  const query = options?.fail ? "?fail=1" : "";
  return request<CaseDetail>(`/api/cases/${encodeURIComponent(id)}${query}`);
}
