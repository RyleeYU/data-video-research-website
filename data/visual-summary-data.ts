import { prototypeItems, prototypeGroups } from "./prototype-matrix-data";
import { tools } from "./tools";

export const datasetOverview = [
  { label: "Academic Prototypes", value: 19 },
  { label: "Commercial Tools", value: 22 },
  { label: "Total Systems", value: 41 },
  { label: "Window", value: "2022–2026" },
];

export const commercialHeatmapData = tools.map((tool) => ({
  title: tool.title,
  automation: tool.automation,
  agency: tool.agency,
  narration: tool.narration,
  accuracy: tool.accuracy,
  average: Number(
    (
      (tool.automation + tool.agency + tool.narration + tool.accuracy) /
      4
    ).toFixed(2)
  ),
}));

export const commercialScatterData = tools.map((tool) => ({
  title: tool.title,
  automation: tool.automation,
  agency: tool.agency,
  narration: tool.narration,
  accuracy: tool.accuracy,
  size: 60 + tool.narration * 35,
}));

export const academicGroupCoverage = prototypeGroups.map((group) => {
  const total = prototypeItems.reduce((sum, item) => {
    return (
      sum +
      group.columns.reduce((inner, col) => {
        return inner + (item.codes[col] === 1 ? 1 : 0);
      }, 0)
    );
  }, 0);

  const maxPossible = prototypeItems.length * group.columns.length;

  return {
    group: group.group,
    total,
    proportion: Number((total / maxPossible).toFixed(2)),
  };
});

export const academicYearDistribution = (() => {
  const counts: Record<string, number> = {};

  for (const item of prototypeItems) {
    const year = item.year ? String(item.year) : "Unknown";
    counts[year] = (counts[year] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year.localeCompare(b.year));
})();
export const academicSubdimensionSummary = prototypeGroups.map((group) => ({
  group: group.group,
  items: group.columns.map((col) => {
    const count = prototypeItems.reduce((sum, item) => {
      return sum + (item.codes[col] === 1 ? 1 : 0);
    }, 0);

    return {
      key: col,
      label: col
        .replace("Editable ", "")
        .replace("Iterative_Regeneration", "Iter Regen")
        .replace("Explicit_DataBinding", "Explicit Bind")
        .replace("DataValidation", "Validation")
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
        .replace("EndToEnd", "E2E"),
      count,
    };
  }),
}));
