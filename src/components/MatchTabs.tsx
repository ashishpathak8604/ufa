"use client";

import { useRef, useState } from "react";
import { Clock, MapPin, Radio } from "lucide-react";
import { matchCentre, matches, standings, type Match } from "@/content/site";
import { PlaceholderBadge } from "./PlaceholderBadge";

type TabName = (typeof matchCentre.tabs)[number];

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-gold/15 text-gold-strong",
  Scheduled: "bg-sage text-eucalyptus-strong",
  "Full time": "bg-olive/10 text-olive",
  Postponed: "bg-rose-soft text-olive",
};

/**
 * Match Centre tabs (section 5F).
 * Client Component only for tab state; accessible tablist with arrow keys.
 * Every fixture is mock data and is labelled as such.
 */
export function MatchTabs() {
  const [activeTab, setActiveTab] = useState<TabName>(matchCentre.tabs[0]);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = matchCentre.tabs.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex !== null) {
      event.preventDefault();
      const nextTab = matchCentre.tabs[nextIndex];
      if (nextTab) {
        setActiveTab(nextTab);
        tabRefs.current[nextIndex]?.focus();
      }
    }
  };

  const list = matches[activeTab];

  return (
    <div className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Match Centre views"
          className="inline-flex rounded-full bg-ivory p-1"
        >
          {matchCentre.tabs.map((tab, index) => {
            const selected = tab === activeTab;
            return (
              <button
                key={tab}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                role="tab"
                type="button"
                id={`tab-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.toLowerCase().replace(/\s+/g, "-")}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-olive text-warmwhite"
                    : "text-olive/70 hover:text-olive"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <PlaceholderBadge label="Sample data" />
      </div>

      {matchCentre.tabs.map((tab) => {
        const slug = tab.toLowerCase().replace(/\s+/g, "-");
        const selected = tab === activeTab;
        return (
          <div
            key={tab}
            role="tabpanel"
            id={`panel-${slug}`}
            aria-labelledby={`tab-${slug}`}
            hidden={!selected}
            tabIndex={0}
            className="mt-5 outline-none"
          >
            {selected && <MatchList items={matches[tab]} />}
          </div>
        );
      })}

      <p className="mt-4 text-xs text-muted-strong">{matchCentre.sampleNotice}</p>

      <div className="divider my-6" />

      <table className="w-full text-left text-sm">
        <caption className="mb-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-eucalyptus-strong">
          {standings.caption}
        </caption>
        <thead>
          <tr className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-strong">
            {standings.columns.map((column) => (
              <th
                key={column}
                scope="col"
                className={column === "Team" ? "pb-2 font-semibold" : "pb-2 text-right font-semibold"}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-olive/10">
          {standings.rows.map((row) => (
            <tr key={row.position}>
              <th scope="row" className="w-8 py-3 text-left font-semibold tabular-nums text-eucalyptus-strong">
                {row.position}
              </th>
              <td className="py-3 font-medium text-olive">{row.team}</td>
              <td className="py-3 text-right tabular-nums text-muted-strong">{row.played}</td>
              <td className="py-3 text-right font-semibold tabular-nums text-olive">{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MatchList({ items }: { items: Match[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-[1.5rem] bg-sage-soft p-5 text-sm text-muted-strong">
        Nothing to show in this view right now.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((match) => (
        <li key={match.id} className="rounded-[1.5rem] border border-olive/10 bg-warmwhite p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-eucalyptus-strong">
              {match.competition}
            </p>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${
                STATUS_STYLES[match.status] ?? "bg-olive/10 text-olive"
              }`}
            >
              {match.status === "Live" && <Radio aria-hidden="true" size={12} />}
              {match.status}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <TeamBadge abbr={match.home.abbr} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-olive">{match.home.name}</p>
              <p className="truncate text-sm text-muted-strong">{match.away.name}</p>
            </div>
            <div className="shrink-0 text-right">
              {match.score ? (
                <p className="font-display text-xl font-semibold tabular-nums text-olive">
                  {match.score}
                </p>
              ) : (
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-strong">
                  vs
                </p>
              )}
              {match.minute && (
                <p className="text-[0.68rem] text-muted-strong">{match.minute}</p>
              )}
            </div>
            <TeamBadge abbr={match.away.abbr} />
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-strong">
            <span className="inline-flex items-center gap-1.5">
              <Clock aria-hidden="true" size={13} />
              {match.date} · {match.kickoff}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" size={13} />
              {match.venue}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function TeamBadge({ abbr }: { abbr: string }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-olive/10 bg-sage-soft font-display text-xs font-semibold tracking-widest text-eucalyptus-strong"
    >
      {abbr}
    </span>
  );
}
