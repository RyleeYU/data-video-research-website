export type ToolItem = {
    id: string;
    title: string;
    category: "academic" | "commercial";
    year: number;
    authors?: string;
    venue?: string;
    summary: string;
    paperLink?: string;
    websiteLink?: string;
    screenshot?: string;
  
    dimensions: {
      automation: number;
      agency: number;
      narration: number;
      accuracy: number;
    };
  
    inputs?: string[];
    outputs?: string[];
  
    coding?: Record<string, number | string>;
    notes?: string;
    inclusionNote?: string;
  };
  
  export const items: ToolItem[] = [
    {
      id: "example-academic-1",
      title: "Example Academic Tool",
      category: "academic",
      year: 2024,
      authors: "Author et al.",
      venue: "CHI",
      summary:
        "A prototype for AI-assisted data video creation with support for scene planning and animation.",
      paperLink: "https://example.com/paper-1",
      websiteLink: "https://example.com/tool-1",
      dimensions: {
        automation: 3,
        agency: 2,
        narration: 4,
        accuracy: 3,
      },
      inputs: ["table"],
      outputs: ["video", "storyboard"],
      coding: {
        scenePlanning: 1,
        animation: 1,
        editableScript: 0,
        editableShotOrder: 1,
      },
      notes: "Example note for supplementary display.",
      inclusionNote: "Included as an academic prototype for demonstration.",
    },
    {
      id: "example-commercial-1",
      title: "Example Commercial Tool",
      category: "commercial",
      year: 2025,
      summary:
        "A commercial AI tool that supports video generation, narration, and lightweight editing.",
      websiteLink: "https://example.com/tool-2",
      dimensions: {
        automation: 4,
        agency: 2,
        narration: 4,
        accuracy: 2,
      },
      inputs: ["text", "table"],
      outputs: ["video"],
      notes: "Example commercial entry.",
      inclusionNote: "Included as a commercial tool for demonstration.",
    },
  ];