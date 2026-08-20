"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError, fetchCase } from "./api";

export const caseKeys = {
  all: ["cases"] as const,
  detail: (id: string) => [...caseKeys.all, id] as const,
};

export function useCaseDetail(id: string) {
  return useQuery({
    queryKey: caseKeys.detail(id),
    queryFn: () => fetchCase(id),
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.status === 404) && failureCount < 1,
  });
}
