"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts";
import {
  academicGroupCoverage,
  academicSubdimensionSummary,
  commercialHeatmapData,
  commercialScatterData,
  datasetOverview,
} from "../data/visual-summary-data";

function accuracyColor(score: number) {
  if (score === 4) return "#5C7393";
  if (score === 3) return "#7E97AF";
  if (score === 2) return "#A7BDC4";
  if (score === 1) return "#C9D7DB";
  return "#E7ECEF";
}

function scoreFill(score: number) {
  if (score === 4) return "#5C7393";
  if (score === 3) return "#7E97AF";
  if (score === 2) return "#A7BDC4";
  if (score === 1) return "#C9D7DB";
  return "#E7ECEF";
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[18px] border border-slate-300 bg-white p-6">
      <h2 className="text-[18px] font-semibold mb-2">{title}</h2>
      {description ? (
        <p className="text-[13px] text-slate-500 mb-4">{description}</p>
      ) : null}
      {children}
    </div>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number | string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-[14px] border border-slate-300 bg-white px-4 py-3 shadow-sm">
      {label ? (
        <p className="text-[12px] font-medium text-slate-700 mb-1">{label}</p>
      ) : null}
      {payload.map((entry, index) => (
        <p key={index} className="text-[12px] text-slate-600">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

type ClusterItem = (typeof commercialScatterData)[number];

type ClusterDatum = {
  key: string;
  automation: number;
  agency: number;
  items: ClusterItem[];
  narrationAverage: number;
  accuracyAverage: number;
  count: number;
};

export default function AboutPage() {
  const [hoveredClusterKey, setHoveredClusterKey] = useState<string | null>(null);

  const commercialClusters = useMemo<ClusterDatum[]>(() => {
    const grouped = new Map<
      string,
      {
        key: string;
        automation: number;
        agency: number;
        items: ClusterItem[];
      }
    >();

    commercialScatterData.forEach((item) => {
      const key = `${item.automation}-${item.agency}`;
      const existing = grouped.get(key);

      if (existing) {
        existing.items.push(item);
      } else {
        grouped.set(key, {
          key,
          automation: item.automation,
          agency: item.agency,
          items: [item],
        });
      }
    });

    return Array.from(grouped.values()).map((group) => {
      const avgNarration =
        group.items.reduce((sum, item) => sum + item.narration, 0) /
        group.items.length;

      const avgAccuracy =
        group.items.reduce((sum, item) => sum + item.accuracy, 0) /
        group.items.length;

      return {
        ...group,
        narrationAverage: Number(avgNarration.toFixed(2)),
        accuracyAverage: Number(avgAccuracy.toFixed(2)),
        count: group.items.length,
      };
    });
  }, []);

  const hoveredCluster =
    commercialClusters.find((cluster) => cluster.key === hoveredClusterKey) ?? null;

  const dimensions = [
    { key: "automation", label: "Automation" },
    { key: "agency", label: "Agency" },
    { key: "narration", label: "Narration" },
    { key: "accuracy", label: "Accuracy" },
  ] as const;

  const commercialScoreDistribution = dimensions.map((dim) => {
    const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

    commercialHeatmapData.forEach((tool) => {
      const value = tool[dim.key] as 0 | 1 | 2 | 3 | 4;
      counts[value] += 1;
    });

    return {
      dimension: dim.label,
      score0: counts[0],
      score1: counts[1],
      score2: counts[2],
      score3: counts[3],
      score4: counts[4],
    };
  });

  const academicBarFills = [
    "#7389A3",
    "#8298AF",
    "#91A8B8",
    "#9EB6C1",
    "#A9B1C9",
    "#B7BCC8",
  ];

  return (
    <main className="min-h-screen bg-[#F5F5F5] text-[#1F2937]">
      <section className="pt-12 pb-10">
        <div className="max-w-5xl mx-auto px-8">
          <h1 className="max-w-5xl mx-auto text-[30px] md:text-[27px] font-semibold text-center leading-[1.18] mb-8 tracking-[-0.01em]">
            <span className="block">
              Understanding Human-AI Collaboration in Data Video Creation:
            </span>
            <span className="block">
              A Review of Academic Prototypes and Commercial Tools
            </span>
          </h1>

          <div className="max-w-5xl mx-auto space-y-6 text-[15px] md:text-[15.5px] leading-[1.25] text-[#374151]">
            <p>
              This website presents our study on AI-assisted data video
              creation, focusing on how current tools support data video
              authoring across both academic research and commercial practice.
            </p>

            <p>
              The <strong>Prototype Analysis</strong> page presents the academic
              prototypes included in our review. These systems are documented as
              a structured research collection and analyzed through coded
              characteristics relevant to data video creation.
            </p>

            <p>
              The <strong>Tool Analysis</strong> page presents the commercial
              tools included in our study. These tools are comparatively
              assessed across core dimensions including AI automation, human
              agency, narration, and data accuracy.
            </p>

            <p>
              The summary views below provide a high-level overview of both
              datasets, while the <strong>Codebook</strong> documents the
              operational definitions, coding logic, and scoring criteria used
              throughout the website.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {datasetOverview.map((item) => (
              <div
                key={item.label}
                className="rounded-[18px] border border-slate-300 bg-white px-7 py-5 min-h-[96px] flex flex-col justify-between"
              >
                <p className="text-[14px] text-slate-500">{item.label}</p>
                <p className="text-[30px] md:text-[34px] font-semibold leading-none tracking-[-0.02em] text-[#0F172A]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="max-w-6xl mx-auto px-8">
          <div className="rounded-[18px] border border-slate-300 bg-white px-5 py-4">
            <p className="text-[13px] leading-[1.6] text-slate-600">
              <span className="font-semibold text-slate-700">
                Important note.
              </span>{" "}
              Academic prototypes and commercial tools are not represented on
              the same scale. Academic systems are documented through binary
              coding of supported characteristics, while commercial tools are
              evaluated using a 0–4 rubric. The summaries below are intended as
              high-level analytical views rather than directly equivalent
              measurements.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-6">
          <Card
            title="Academic Coding Coverage by Group"
            description="Total coded presences across the six academic coding groups."
          >
            <div className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={academicGroupCoverage}
                  margin={{ top: 8, right: 10, left: -10, bottom: 24 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="group"
                    interval={0}
                    tick={{ fontSize: 11, fill: "#475569" }}
                    axisLine={{ stroke: "#CBD5E1" }}
                    tickLine={{ stroke: "#CBD5E1" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    axisLine={{ stroke: "#CBD5E1" }}
                    tickLine={{ stroke: "#CBD5E1" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="total"
                    name="Total Coded Presence"
                    radius={[10, 10, 0, 0]}
                  >
                    {academicGroupCoverage.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={academicBarFills[index % academicBarFills.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card
            title="Commercial Automation–Human Agency Trade-off"
            description="Automation is shown on the x-axis and human agency on the y-axis. Point size represents narration support, and point color represents accuracy. When multiple tools share the same coordinate, they remain aligned to the original values. Hovering reveals a separate expansion panel rather than shifting the points themselves."
          >
            <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#5C7393]" />
                <span>Higher accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#C9D7DB]" />
                <span>Lower accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-slate-400" />
                <span>Smaller point = lower narration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-5 w-5 rounded-full border border-slate-400" />
                <span>Larger point = higher narration</span>
              </div>
            </div>

            <div className="relative">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 28, bottom: 24, left: 18 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      type="number"
                      dataKey="automation"
                      name="Automation"
                      domain={[0, 4]}
                      ticks={[0, 1, 2, 3, 4]}
                      tick={{ fontSize: 12, fill: "#475569" }}
                      axisLine={{ stroke: "#CBD5E1" }}
                      tickLine={{ stroke: "#CBD5E1" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="agency"
                      name="Human Agency"
                      domain={[0, 4]}
                      ticks={[0, 1, 2, 3, 4]}
                      tick={{ fontSize: 12, fill: "#475569" }}
                      axisLine={{ stroke: "#CBD5E1" }}
                      tickLine={{ stroke: "#CBD5E1" }}
                    />
                    <Tooltip cursor={false} content={<></>} />
                    <Scatter
                      data={commercialClusters}
                      shape={(props: any) => {
                        const { cx, cy, payload } = props;
                        const items = payload.items;

                        const radius =
                          items.length === 1
                            ? 6 + items[0].narration * 2.2
                            : 7 + Math.min(items.length, 4);

                        const fill =
                          items.length === 1
                            ? accuracyColor(items[0].accuracy)
                            : accuracyColor(Math.round(payload.accuracyAverage));

                        return (
                          <g
                            onMouseEnter={() => setHoveredClusterKey(payload.key)}
                            onMouseLeave={() => setHoveredClusterKey((current) =>
                              current === payload.key ? null : current
                            )}
                            style={{ cursor: "pointer" }}
                          >
                            <circle
                              cx={cx}
                              cy={cy}
                              r={radius}
                              fill={fill}
                              stroke="#ffffff"
                              strokeWidth={1.5}
                            />
                            {items.length > 1 && (
                              <text
                                x={cx}
                                y={cy + 4}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#ffffff"
                                fontWeight="600"
                              >
                                {items.length}
                              </text>
                            )}
                          </g>
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {hoveredCluster && hoveredCluster.count > 1 && (
                <div
                  className="absolute right-3 top-3 w-[250px] rounded-[14px] border border-slate-300 bg-white/95 backdrop-blur px-4 py-3 shadow-sm"
                  onMouseEnter={() => setHoveredClusterKey(hoveredCluster.key)}
                  onMouseLeave={() => setHoveredClusterKey(null)}
                >
                  <p className="text-[12px] font-medium text-slate-700 mb-1">
                    Automation {hoveredCluster.automation}, Human Agency{" "}
                    {hoveredCluster.agency}
                  </p>
                  <p className="text-[12px] text-slate-600 mb-3">
                    {hoveredCluster.count} tools at this coordinate
                  </p>

                  <div className="space-y-2">
                    {hoveredCluster.items.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-2 rounded-[10px] bg-[#F8FAFB] px-2.5 py-2"
                      >
                        <span
                          className="mt-0.5 inline-block rounded-full border border-white"
                          style={{
                            width: `${10 + item.narration * 4}px`,
                            height: `${10 + item.narration * 4}px`,
                            backgroundColor: accuracyColor(item.accuracy),
                            minWidth: `${10 + item.narration * 4}px`,
                          }}
                        />
                        <div className="min-w-0">
                          <div className="text-[12px] leading-[1.3] text-slate-700">
                            {item.title}
                          </div>
                          <div className="mt-1 text-[11px] text-slate-500">
                            Narration {item.narration} · Accuracy {item.accuracy}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-8">
          <Card
            title="Academic Sub-dimension Summary"
            description="Number of academic prototypes supporting each coded sub-dimension."
          >
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[12px]">
                <thead>
                  <tr className="bg-[#EEF2F5] text-[#374151]">
                    <th className="px-3 py-3 font-semibold min-w-[140px]">
                      Group
                    </th>
                    <th className="px-3 py-3 font-semibold">
                      Sub-dimensions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {academicSubdimensionSummary.map((group) => (
                    <tr
                      key={group.group}
                      className="border-t border-slate-200 align-top"
                    >
                      <td className="px-3 py-3 font-medium text-[#1F2937]">
                        {group.group}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <div
                              key={item.key}
                              className="rounded-[10px] border border-slate-200 bg-[#F8FAFB] px-2.5 py-2 min-w-[88px]"
                              title={`${item.label}: ${item.count}`}
                            >
                              <div className="text-[11px] leading-[1.2] text-slate-500 mb-1">
                                {item.label}
                              </div>
                              <div className="text-[13px] font-semibold text-[#1F2937]">
                                {item.count}
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-8">
          <Card
            title="Commercial Score Distribution by Dimension"
            description="Distribution of commercial tool scores across the four analytical dimensions. This summarizes the overall score profile without repeating tool-level detail."
          >
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={commercialScoreDistribution}
                  margin={{ top: 8, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="dimension"
                    tick={{ fontSize: 12, fill: "#475569" }}
                    axisLine={{ stroke: "#CBD5E1" }}
                    tickLine={{ stroke: "#CBD5E1" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    axisLine={{ stroke: "#CBD5E1" }}
                    tickLine={{ stroke: "#CBD5E1" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score0" stackId="a" name="Score 0" fill={scoreFill(0)} />
                  <Bar dataKey="score1" stackId="a" name="Score 1" fill={scoreFill(1)} />
                  <Bar dataKey="score2" stackId="a" name="Score 2" fill={scoreFill(2)} />
                  <Bar dataKey="score3" stackId="a" name="Score 3" fill={scoreFill(3)} />
                  <Bar dataKey="score4" stackId="a" name="Score 4" fill={scoreFill(4)} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}