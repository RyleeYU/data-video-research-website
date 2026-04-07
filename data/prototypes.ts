export type PrototypeItem = {
    id: string;
    title: string;
    year: number;
    venue: string;
    paperLink?: string;
    projectLink?: string;
    automation: number;
    agency: number;
    narration: number;
    accuracy: number;
  };
  
  export const prototypes: PrototypeItem[] = [
    {
      id: "proto-1",
      title: "DataClips",
      year: 2017,
      venue: "TVCG",
      paperLink: "https://example.com/paper1",
      projectLink: "https://example.com/project1",
      automation: 2,
      agency: 4,
      narration: 3,
      accuracy: 4,
    },
    {
      id: "proto-2",
      title: "ChartStory",
      year: 2022,
      venue: "CHI",
      paperLink: "https://example.com/paper2",
      projectLink: "https://example.com/project2",
      automation: 3,
      agency: 3,
      narration: 4,
      accuracy: 3,
    },
    {
      id: "proto-3",
      title: "NarrativeFlow",
      year: 2023,
      venue: "UIST",
      paperLink: "https://example.com/paper3",
      projectLink: "https://example.com/project3",
      automation: 2,
      agency: 4,
      narration: 4,
      accuracy: 2,
    },
    {
      id: "proto-4",
      title: "VisComposer",
      year: 2024,
      venue: "CHI",
      paperLink: "https://example.com/paper4",
      projectLink: "https://example.com/project4",
      automation: 4,
      agency: 2,
      narration: 3,
      accuracy: 3,
    },
  ];