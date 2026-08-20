import { FileSearch, RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


export function CasePageSkeleton() {
  return (
    <div aria-busy className="px-6 py-4">
      <Skeleton className="h-3 w-32" />
      <div className="mt-3 flex items-center justify-between">
        <Skeleton className="h-8 w-96 max-w-full" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40" />
        ))}
      </div>
    </div>
  );
}

export function CaseErrorState({
  message,
  notFound,
  onRetry,
}: {
  message: string;
  notFound: boolean;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <TriangleAlert className="size-8 text-red-500" />
      <h2 className="mt-3 text-base font-semibold text-neutral-900">
        {notFound ? "Case not found" : "Unable to load case"}
      </h2>
      <p className="mt-1 max-w-sm text-sm text-neutral-500">{message}</p>
      {!notFound && (
        <Button variant="outline" size="sm" className="mt-4 rounded-sm" onClick={onRetry}>
          <RefreshCw className="size-3.5" /> Try again
        </Button>
      )}
    </div>
  );
}


export function TabEmptyState({ tabLabel }: { tabLabel: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      <FileSearch className="size-8 text-neutral-300" />
      <h2 className="mt-3 text-base font-semibold text-neutral-900">
        No {tabLabel.toLowerCase()} yet
      </h2>
      <p className="mt-1 max-w-sm text-sm text-neutral-500">
        There is nothing to show here for this case at the moment.
      </p>
    </div>
  );
}
