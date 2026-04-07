"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { tools } from "../../data/tools";

function scoreClass(score: number) {
  if (score >= 4) return "bg-[#4E6A8C] text-white border border-[#5E768E]";
  if (score >= 3) return "bg-[#8FB9BE] text-[#163A4A] border border-[#7FA8AD]";
  if (score >= 2) return "bg-[#D9E8EA] text-[#244A52] border border-[#C8DBDE]";
  if (score >= 1) return "bg-[#EEF4F5] text-[#4B5563] border border-[#DCE6E8]";
  return "bg-white text-slate-300 border border-slate-300";
}

export default function ToolAnalysisPage() {
  const [query, setQuery] = useState("");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    const keyword = query.trim().toLowerCase();
  
    if (!keyword) return tools;
  
    return tools.filter((item) =>
      item.title.toLowerCase().includes(keyword)
    );
  }, [query]);

  const columns = [
    { key: "automation", label: "Automation" },
    { key: "agency", label: "Agency" },
    { key: "narration", label: "Narration" },
    { key: "accuracy", label: "Accuracy" },
  ] as const;

  const hasHoverFocus = hoveredRow !== null || hoveredColumn !== null;

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1F2937]">
      <section className="pt-12 pb-10">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-[28px] md:text-[27px] font-semibold leading-[1.2] mb-4 text-center">
            Tool Analysis
          </h1>

          <div className="max-w-5xl mx-auto">
            <p className="text-[15px] leading-[1.35] text-[#4B5563] text-center">
              This page presents the commercial tools included in our study. The
              table below provides a structured overview of the reviewed tools
              and their rubric-based scores across the four core dimensions.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-8">
          <div className="rounded-[18px] border border-slate-300 bg-white px-5 py-4">
            <input
              type="text"
              placeholder="Search by tool name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-[15px] text-[#1F2937] placeholder:text-slate-400 bg-transparent"
            />
          </div>
        </div>
      </section>

      <section className="pb-4">
        <div className="max-w-6xl mx-auto px-8 flex items-center justify-between gap-4">
          <p className="text-[13px] text-slate-500">
            Showing {filteredTools.length} of {tools.length} tools
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
        <div className="max-w-6xl mx-auto px-8">
          <div className="overflow-x-auto rounded-[18px] border border-slate-300 bg-white">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead className="bg-[#EEF2F5] text-[#374151]">
                <tr>
                  <th className="px-5 py-4 font-semibold">Tool</th>
                  <th className="px-4 py-4 font-semibold">Year</th>
                  <th className="px-4 py-4 font-semibold">Type</th>
                  {columns.map((column) => {
                    const isActive = hoveredColumn === column.label;
                    const shouldDim = hasHoverFocus && !isActive;

                    return (
                      <th
                        key={column.key}
                        className={`px-4 py-4 font-semibold transition-colors ${
                          isActive
                            ? "bg-[#E1EAF0] text-[#1F2937]"
                            : shouldDim
                            ? "opacity-40"
                            : ""
                        }`}
                        onMouseEnter={() => setHoveredColumn(column.label)}
                        onMouseLeave={() => setHoveredColumn(null)}
                      >
                        {column.label}
                      </th>
                    );
                  })}
                  <th className="px-4 py-4 font-semibold">Link</th>
                </tr>
              </thead>

              <tbody>
                {filteredTools.map((item) => {
                  const isRowActive = hoveredRow === item.title;
                  const shouldDimRow = hasHoverFocus && !isRowActive;

                  return (
                    <tr
                      key={item.id}
                      className={`border-t border-slate-200 transition-colors ${
                        isRowActive ? "bg-[#F3F7FA]" : "hover:bg-slate-50"
                      }`}
                      onMouseEnter={() => setHoveredRow(item.title)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td
                        className={`px-5 py-4 font-medium text-[#1F2937] ${
                          shouldDimRow ? "opacity-50" : ""
                        }`}
                      >
                        {item.title}
                      </td>

                      <td
                        className={`px-4 py-4 text-[#4B5563] ${
                          shouldDimRow ? "opacity-50" : ""
                        }`}
                      >
                        {item.year}
                      </td>

                      <td
                        className={`px-4 py-4 text-[#4B5563] ${
                          shouldDimRow ? "opacity-50" : ""
                        }`}
                      >
                        {item.venue}
                      </td>

                      {columns.map((column) => {
                        const value = item[column.key];
                        const isColumnActive = hoveredColumn === column.label;
                        const isCellFocused =
                          hoveredRow === item.title &&
                          hoveredColumn === column.label;
                        const shouldDim =
                          hasHoverFocus &&
                          !isRowActive &&
                          !isColumnActive &&
                          !isCellFocused;

                        return (
                          <td
                            key={column.key}
                            className={`px-4 py-4 transition-all ${
                              shouldDim ? "opacity-25" : ""
                            } ${
                              isRowActive || isColumnActive
                                ? "bg-[#FAFCFD]"
                                : ""
                            } ${
                              isCellFocused
                                ? "bg-[#E9F0F4] ring-1 ring-inset ring-[#8AA2B7]"
                                : ""
                            }`}
                            onMouseEnter={() => {
                              setHoveredRow(item.title);
                              setHoveredColumn(column.label);
                            }}
                            onMouseLeave={() => {
                              setHoveredRow(null);
                              setHoveredColumn(null);
                            }}
                          >
                            <span
                              className={`inline-flex min-w-[42px] justify-center rounded-full px-3 py-1 text-[13px] font-semibold transition-all ${scoreClass(
                                value
                              )} ${isCellFocused ? "scale-105" : ""}`}
                            >
                              {value}
                            </span>
                          </td>
                        );
                      })}

                      <td
                        className={`px-4 py-4 ${
                          shouldDimRow ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.projectLink && (
                            <a
                              href={item.projectLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#4E6A8C] hover:text-[#2E4A6A]"
                              title="Open website"
                            >
                              <ExternalLink size={15} strokeWidth={2} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredTools.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-10 text-center text-[14px] text-slate-500"
                    >
                      No tools found for this search.
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