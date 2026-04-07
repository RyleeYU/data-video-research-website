"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  prototypeGroups,
  prototypeItems,
} from "../../data/prototype-matrix-data";

const flatColumns = prototypeGroups.flatMap((group) =>
  group.columns.map((column) => ({
    group: group.group,
    key: column,
  }))
);

function cellClass(value: 0 | 1) {
  return value === 1
    ? "bg-[#6F879F] text-white border border-[#5E768E]"
    : "bg-white text-slate-300 border border-slate-300";
}

function shortHeader(label: string) {
  return label
    .replace("Editable ", "Edit ")
    .replace("Iterative_Regeneration", "Iter Regen")
    .replace("Explicit_DataBinding", "Explicit Bind")
    .replace("DataValidation", "Validate")
    .replace("SourceTraceable", "Source")
    .replace("HallucinationDiscussed", "Halluc.")
    .replace("VisualEncoding", "Visual")
    .replace("ShotOrder", "Shot")
    .replace("ScriptGeneration", "Script Gen")
    .replace("ScenePlanning", "Scene Plan")
    .replace("TimeSeries", "Time")
    .replace("TextAsData", "Text")
    .replace("Multimedia", "Media")
    .replace("Interactive", "Interact")
    .replace("Storyboard", "Board")
    .replace("ScriptOnly", "Script")
    .replace("DataAnalysis", "Analysis")
    .replace("Animation", "Anim")
    .replace("EndToEnd", "E2E");
}

function groupSurface(group: string) {
  switch (group) {
    case "Input":
      return "bg-[#F4F7FB]";
    case "Output":
      return "bg-[#F7FAFC]";
    case "Auto":
      return "bg-[#EEF6F7]";
    case "Human Control":
      return "bg-[#F6F8FB]";
    case "Narrative":
      return "bg-[#F8F6FB]";
    case "Data Grounding":
      return "bg-[#F7F7F8]";
    default:
      return "bg-[#F8FAFB]";
  }
}

function groupHeaderSurface(group: string) {
  switch (group) {
    case "Input":
      return "bg-[#E9F0F8]";
    case "Output":
      return "bg-[#EEF3F7]";
    case "Auto":
      return "bg-[#E5F0F1]";
    case "Human Control":
      return "bg-[#ECEFF5]";
    case "Narrative":
      return "bg-[#F0ECF8]";
    case "Data Grounding":
      return "bg-[#EEEEF1]";
    default:
      return "bg-[#EEF2F5]";
  }
}

export default function PrototypeAnalysisPage() {
  const [query, setQuery] = useState("");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return prototypeItems;

    return prototypeItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.venue.toLowerCase().includes(keyword) ||
        item.no.toLowerCase().includes(keyword) ||
        String(item.year ?? "").includes(keyword)
      );
    });
  }, [query]);

  const hasHoverFocus = hoveredRow !== null || hoveredColumn !== null;

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1F2937]">
      <section className="pt-12 pb-8">
        <div className="max-w-[1500px] mx-auto px-6">
          <h1 className="text-[28px] md:text-[27px] font-semibold leading-[1.2] mb-4 text-center">
            Prototype Analysis
          </h1>

          <div className="max-w-5xl mx-auto">
            <p className="text-[15px] leading-[1.35] text-[#4B5563] text-center">
              The matrix below summarizes the coded characteristics of the
              academic prototypes included in the review.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-5">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="rounded-[16px] border border-slate-300 bg-white px-4 py-3 flex-1 min-w-[240px]">
              <input
                type="text"
                placeholder="Search by title, venue, year, or number..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none text-[14px] text-[#1F2937] placeholder:text-slate-400 bg-transparent"
              />
            </div>

            <div className="flex items-center gap-4 text-[12px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3.5 w-3.5 rounded-[4px] bg-[#6F879F]" />
                <span>Present / Supported</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3.5 w-3.5 rounded-[4px] border border-slate-300 bg-white" />
                <span>Not Present</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="max-w-[1500px] mx-auto px-6 flex items-center justify-between gap-4">
          <p className="text-[12px] text-slate-500">
            Showing {filteredItems.length} of {prototypeItems.length} prototypes
          </p>

          <p className="text-[12px] text-slate-500 min-h-[18px]">
            {hoveredRow && hoveredColumn
              ? `${hoveredRow} · ${hoveredColumn}`
              : hoveredRow
              ? hoveredRow
              : hoveredColumn
              ? hoveredColumn
              : ""}
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-[1500px] mx-auto px-6">
          <div className="overflow-x-auto rounded-[16px] border border-slate-300 bg-white">
            <table className="border-collapse text-left text-[12px] min-w-[1320px] w-full">
              <thead>
                <tr className="text-[#374151]">
                  <th
                    rowSpan={2}
                    className="sticky left-0 z-30 bg-[#EEF2F5] px-2 py-2 border-b border-r border-slate-300 font-semibold min-w-[42px]"
                  >
                    No.
                  </th>
                  <th
                    rowSpan={2}
                    className="sticky left-[42px] z-30 bg-[#EEF2F5] px-3 py-2 border-b border-r border-slate-300 font-semibold min-w-[250px]"
                  >
                    Prototype
                  </th>
                  {prototypeGroups.map((group) => {
                    const activeGroup = flatColumns.some(
                      (c) => c.group === group.group && c.key === hoveredColumn
                    );

                    return (
                      <th
                        key={group.group}
                        colSpan={group.columns.length}
                        className={`px-2 py-2 border-b border-r border-slate-300 text-center font-semibold whitespace-nowrap text-[12px] transition-colors ${
                          activeGroup
                            ? "bg-[#DCE6EC]"
                            : groupHeaderSurface(group.group)
                        }`}
                      >
                        {group.group}
                      </th>
                    );
                  })}
                </tr>

                <tr className="text-[#4B5563]">
                  {flatColumns.map((column) => {
                    const isColumnActive = hoveredColumn === column.key;
                    const shouldDim = hasHoverFocus && !isColumnActive;

                    return (
                      <th
                        key={column.key}
                        className={`px-1 py-2 border-b border-r border-slate-300 text-center font-medium min-w-[30px] whitespace-nowrap transition-all ${
                          isColumnActive
                            ? "bg-[#E1EAF0] text-[#1F2937]"
                            : `${groupSurface(column.group)} ${
                                shouldDim ? "opacity-40" : ""
                              }`
                        }`}
                        title={column.key}
                        onMouseEnter={() => setHoveredColumn(column.key)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        <div className="mx-auto h-[84px] flex items-end justify-center [writing-mode:vertical-rl] rotate-180 text-[11px] leading-none">
                          {shortHeader(column.key)}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {filteredItems.map((item) => {
                  const isRowActive = hoveredRow === item.title;
                  const shouldDimRow = hasHoverFocus && !isRowActive;

                  return (
                    <tr
                      key={item.no}
                      className={`border-t border-slate-200 transition-colors ${
                        isRowActive ? "bg-[#F3F7FA]" : "hover:bg-slate-50"
                      }`}
                      onMouseEnter={() => setHoveredRow(item.title)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td
                        className={`sticky left-0 z-20 px-2 py-2 border-r border-slate-300 text-[#4B5563] text-[12px] transition-colors ${
                          isRowActive ? "bg-[#F3F7FA]" : "bg-white"
                        } ${shouldDimRow ? "opacity-50" : ""}`}
                      >
                        {item.no}
                      </td>

                      <td
                        className={`sticky left-[42px] z-20 px-3 py-2 border-r border-slate-300 transition-colors ${
                          isRowActive ? "bg-[#F3F7FA]" : "bg-white"
                        } ${shouldDimRow ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="min-w-0">
                            <div className="font-medium text-[#1F2937] leading-[1.25] text-[12px] break-words">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 leading-[1.25]">
                              {item.year ?? ""}
                              {item.year ? " · " : ""}
                              {item.venue}
                            </div>
                          </div>

                          {item.paperLink && (
                            <a
                              href={item.paperLink}
                              target="_blank"
                              rel="noreferrer"
                              className="shrink-0 text-[#4E6A8C] hover:text-[#2E4A6A] mt-[1px]"
                              title="Open paper"
                            >
                              <ExternalLink size={14} strokeWidth={2} />
                            </a>
                          )}
                        </div>
                      </td>

                      {flatColumns.map((column) => {
                        const value = (item.codes[column.key] ?? 0) as 0 | 1;
                        const isColumnActive = hoveredColumn === column.key;
                        const isCellFocused =
                          hoveredRow === item.title &&
                          hoveredColumn === column.key;
                        const shouldDim =
                          hasHoverFocus &&
                          !isRowActive &&
                          !isColumnActive &&
                          !isCellFocused;

                        return (
                          <td
                            key={`${item.no}-${column.key}`}
                            className={`px-1 py-1.5 border-r border-slate-200 text-center transition-all ${
                              shouldDim ? "opacity-25" : ""
                            } ${
                              isRowActive || isColumnActive
                                ? groupSurface(column.group)
                                : ""
                            } ${
                              isCellFocused
                                ? "bg-[#E9F0F4] ring-1 ring-inset ring-[#8AA2B7]"
                                : ""
                            }`}
                            title={`${item.title} · ${column.key}: ${value}`}
                            onMouseEnter={() => {
                              setHoveredRow(item.title);
                              setHoveredColumn(column.key);
                            }}
                            onMouseLeave={() => {
                              setHoveredRow(null);
                              setHoveredColumn(null);
                            }}
                          >
                            <span
                              className={`inline-flex h-5 w-5 items-center justify-center rounded-[5px] text-[10px] font-semibold transition-all ${cellClass(
                                value
                              )} ${isCellFocused ? "scale-105" : ""}`}
                            >
                              {value === 1 ? "■" : ""}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}

                {filteredItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={2 + flatColumns.length}
                      className="px-5 py-10 text-center text-[13px] text-slate-500"
                    >
                      No prototypes found for this search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}