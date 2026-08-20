import { ListFilter } from "lucide-react";
import type { TimelineEvent, TimelineMessagePart } from "@/lib/types";
import { cn } from "@/lib/utils";

function EventAvatar({ avatar }: { avatar: TimelineEvent["avatar"] }) {
  if (avatar === "logo") {
    return (
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-950">
        <span className="size-2 rounded-full border-2 border-white" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
        avatar.accent === "green" ? "bg-emerald-600" : "bg-blue-500"
      )}
    >
      {avatar.initials}
    </span>
  );
}

function MessagePart({ part }: { part: TimelineMessagePart }) {
  switch (part.kind) {
    case "link":
      return (
        <a href="#" className="font-medium text-emerald-600 hover:underline">
          {part.text}
        </a>
      );
    case "strong":
      return <span className="font-semibold text-neutral-900">{part.text}</span>;
    case "badge":
      return (
        <span className="ml-0.5 inline-block rounded-sm border border-sky-200 bg-sky-50 px-1 py-px align-middle text-[9px] font-semibold tracking-wide text-sky-700">
          {part.text}
        </span>
      );
    default:
      return <>{part.text}</>;
  }
}

export function TimelinePanel({ events }: { events: TimelineEvent[] }) {
  return (
    <section aria-labelledby="timeline-heading">
      <div className="bg-[#F9F9F9] flex h-12 items-center justify-between border-b border-neutral-200 px-4">
        <h2 id="timeline-heading" className="text-sm font-semibold text-neutral-900">
          Timeline
        </h2>
        <button
          type="button"
          aria-label="Filter timeline"
          className="text-neutral-400 hover:text-neutral-600"
        >
          <ListFilter className="size-4" />
        </button>
      </div>

      {events.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-neutral-500">
          No activity recorded yet.
        </p>
      ) : (
        <ul className=" bg-[#F9F9F9] space-y-5 px-4 py-4">
          {events.map((event) => (
            <li key={event.id} className="flex gap-3">
              <EventAvatar avatar={event.avatar} />
              <div className="min-w-0 text-sm leading-5 text-neutral-700">
                <p>
                  <span className="font-semibold text-neutral-900">{event.actor}</span>
                  {event.parts.map((part, i) => (
                    <MessagePart key={i} part={part} />
                  ))}
                </p>
                <p className="mt-0.5 text-[11px] text-neutral-400">{event.time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
