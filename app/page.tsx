"use client";

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
  ZAxis,
  Cell,
  Legend,
} from "recharts";
import {
  academicGroupCoverage,
  academicSubdimensionSummary,
  commercialHeatmapData,
  commercialScatterData,
  datasetOverview,
} from "../data/visual-summary-data";

function accuracyColor(score: number) {
  if (score === 4) return "#4E6A8C";
  if (score === 3) return "#6F879F";
  if (score === 2) return "#8FB9BE";
  if (score === 1) return "#BFD5D8";
  return "#E5E7EB";
}

function scoreFill(score: number) {
  if (score === 4) return "#4E6A8C";
  if (score === 3) return "#6F879F";
  if (score === 2) return "#8FB9BE";
  if (score === 1) return "#BFD5D8";
  return "#E5E7EB";
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

function ScatterTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: any }>;
}) {
  if (!active || !payload || payload.length === 0) return null;

  const d = payload[0].payload;

  return (
    <div className="rounded-[14px] border border-slate-300 bg-white px-4 py-3 shadow-sm">
      <p className="text-[12px] font-medium text-slate-700 mb-1">{d.title}</p>
      <p className="text-[12px] text-slate-600">Automation: {d.automation}</p>
      <p className="text-[12px] text-slate-600">Agency: {d.agency}</p>
      <p className="text-[12px] text-slate-600">Narration: {d.narration}</p>
      <p className="text-[12px] text-slate-600">Accuracy: {d.accuracy}</p>
    </div>
  );
}

export default function AboutPage() {
  // Academic + commercial overview data already imported.

  // Jitter commercial scatter points so tools with identical coordinates do not overlap completely.
  const scatterKeyGroups = new Map<string, number>();
  const jitterPattern = [
    { dx: 0, dy: 0 },
    { dx: -0.12, dy: 0.08 },
    { dx: 0.12, dy: -0.08 },
    { dx: -0.1, dy: -0.1 },
    { dx: 0.1, dy: 0.1 },
    { dx: -0.16, dy: 0 },
    { dx: 0.16, dy: 0 },
    { dx: 0, dy: 0.16 },
    { dx: 0, dy: -0.16 },
  ];

  const jitteredCommercialScatterData = commercialScatterData.map((item) => {
    const key = `${item.automation}-${item.agency}`;
    const count = scatterKeyGroups.get(key) ?? 0;
    scatterKeyGroups.set(key, count + 1);

    const pattern = jitterPattern[count % jitterPattern.length];

    return {
      ...item,
      plotAutomation: Number((item.automation + pattern.dx).toFixed(2)),
      plotAgency: Number((item.agency + pattern.dy).toFixed(2)),
    };
  });

  // Build score distribution summary for commercial tools.
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
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={academicGroupCoverage}
                  margin={{ top: 8, right: 10, left: -18, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="group"
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
                  <Bar
                    dataKey="total"
                    name="Total Coded Presence"
                    radius={[6, 6, 0, 0]}
                  >
                    {academicGroupCoverage.map((entry, index) => {
                      const fills = [
                        "#6F879F",
                        "#8AA2B7",
                        "#8FB9BE",
                        "#A3B3C7",
                        "#B0A5CB",
                        "#C1C4CC",
                      ];
                      return (
                        <Cell
                          key={index}
                          fill={fills[index % fills.length]}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card
            title="Commercial Automation–Agency Trade-off"
            description="Automation on the x-axis and agency on the y-axis. Points with identical coordinates are slightly offset for visibility. Point size reflects narration, and color reflects accuracy."
          >
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    type="number"
                    dataKey="plotAutomation"
                    name="Automation"
                    domain={[0, 4]}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    axisLine={{ stroke: "#CBD5E1" }}
                    tickLine={{ stroke: "#CBD5E1" }}
                  />
                  <YAxis
                    type="number"
                    dataKey="plotAgency"
                    name="Agency"
                    domain={[0, 4]}
                    tick={{ fontSize: 12, fill: "#475569" }}
                    axisLine={{ stroke: "#CBD5E1" }}
                    tickLine={{ stroke: "#CBD5E1" }}
                  />
                  <ZAxis type="number" dataKey="size" range={[60, 320]} />
                  <Tooltip content={<ScatterTooltip />} />
                  <Scatter data={jitteredCommercialScatterData}>
                    {jitteredCommercialScatterData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={accuracyColor(entry.accuracy)}
                        stroke="#ffffff"
                        strokeWidth={1.5}
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-8">
          <Card
            title="Academic Sub-dimension Heatmap Summary"
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
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
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