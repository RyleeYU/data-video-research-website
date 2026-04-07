export default function CodebookPage() {
    const coreDimensions = [
      {
        title: "AI Automation",
        description:
          "The extent to which the tool or system automatically performs key stages of the data video workflow.",
      },
      {
        title: "Human Agency",
        description:
          "The extent to which users can meaningfully control, revise, and refine the generation process and outputs.",
      },
      {
        title: "Narration",
        description:
          "The extent to which the system supports structured narrative communication of data through text, scenes, or guided emphasis.",
      },
      {
        title: "Data Accuracy",
        description:
          "The extent to which generated outputs remain faithful to the source data and avoid misleading or fabricated content.",
      },
    ];
  
    const academicRows = [
      ["Input", "Table", "The system takes structured data such as tables, CSV files, or databases as input.", "0/1"],
      ["Input", "TimeSeries", "Time functions as a core narrative dimension rather than only appearing as a metadata field.", "0/1"],
      ["Input", "TextAsData", "Text is treated as analyzable data rather than only as a prompt or annotation.", "0/1"],
      ["Input", "Multimedia", "The system accepts images, video, or audio as input data.", "0/1"],
  
      ["Output", "Video", "The system directly generates a video, animation, GIF, or other time-based visual output.", "0/1"],
      ["Output", "Interactive", "The system outputs an interactive webpage or interface rather than a fixed linear video artifact.", "0/1"],
      ["Output", "Storyboard", "The system outputs a storyboard or scene-based structure for downstream production.", "0/1"],
      ["Output", "ScriptOnly", "The system outputs narration text or script without generating visual scenes or video.", "0/1"],
  
      ["AI Automation", "DataAnalysis", "The system automatically identifies trends, peaks, comparisons, insights, or other patterns from the input data.", "0/1"],
      ["AI Automation", "ScriptGeneration", "The system automatically generates narration text or script content.", "0/1"],
      ["AI Automation", "ScenePlanning", "The system automatically organizes scene order, shot sequence, or presentation flow.", "0/1"],
      ["AI Automation", "Animation", "The system automatically generates animations, transitions, or motion effects.", "0/1"],
      ["AI Automation", "EndToEnd", "The system can generate a complete video from data input with little or no manual intervention.", "0/1"],
  
      ["Human Agency", "EditableData", "Users can modify the data or the system’s interpretation of the data during the workflow.", "0/1"],
      ["Human Agency", "EditableScript", "Users can edit generated narration or script content.", "0/1"],
      ["Human Agency", "EditableShotOrder", "Users can change the sequence or structure of scenes or shots.", "0/1"],
      ["Human Agency", "EditableVisualEncoding", "Users can modify visual encodings, chart forms, or scene-level presentation choices.", "0/1"],
      ["Human Agency", "IterativeRegeneration", "The system supports local or iterative regeneration rather than only one-shot generation.", "0/1"],
  
      ["Narration", "Trend", "The output explicitly communicates an overall trend or temporal pattern in the data.", "0/1"],
      ["Narration", "Peak", "The output explicitly highlights a maximum, minimum, or other peak value.", "0/1"],
      ["Narration", "Compare", "The output explicitly presents a comparison across values, groups, or time points.", "0/1"],
      ["Narration", "Outlier", "The output explicitly identifies anomalies or outliers.", "0/1"],
      ["Narration", "Cause", "The output includes causal explanation or interpretive reasoning about why a pattern occurs.", "0/1"],
      ["Narration", "Forecast", "The output includes prediction or future-oriented interpretation.", "0/1"],
      ["Narration", "MultiSection", "The output presents a multi-section narrative structure rather than isolated descriptive statements.", "0/1"],
  
      ["Data Accuracy", "ExplicitDataBinding", "Narration or visual output is explicitly tied to data values or calculations.", "0/1"],
      ["Data Accuracy", "DataValidation", "The system includes mechanisms to check consistency or validate generated content against the data.", "0/1"],
      ["Data Accuracy", "SourceTraceable", "The source of the data is traceable or explicitly documented.", "0/1"],
      ["Data Accuracy", "HallucinationDiscussed", "The paper explicitly discusses hallucination, generation error, or related reliability concerns.", "0/1"],
    ];
  
    const commercialRows = [
      [
        "AI Automation",
        "No meaningful AI-supported generation related to the data video workflow.",
        "Very limited automation. The tool can generate isolated outputs, but support for data-driven visual or narrative generation is weak.",
        "Partial automation. The tool can generate useful static visual or textual outputs, but does not support coherent motion or video generation.",
        "Strong but incomplete automation. The tool supports animated, scene-based, or video-oriented generation, but the workflow remains constrained or only partially integrated.",
        "High automation. The tool can generate coherent animated or video-based outputs with limited manual intervention and clear support for data video creation.",
      ],
      [
        "Data Accuracy",
        "Output is largely inconsistent with the input data or contains fabricated content.",
        "Limited accuracy. The output captures only a small part of the provided data or reflects it unreliably.",
        "Moderate accuracy. The output preserves some key values or patterns, but remains incomplete or partially inconsistent.",
        "Strong accuracy. The output preserves the main values, patterns, and key points of the data with only limited omissions or inconsistencies.",
        "Very strong accuracy. The output faithfully reflects the full dataset, preserves key values exactly, avoids fabrication, and clearly indicates how the data is used or referenced.",
      ],
      [
        "Narration",
        "No meaningful support for structured narration.",
        "Minimal narration. The output contains isolated description but lacks clear organization or scene structure.",
        "Moderate narration. The output covers some core narrative elements, such as trend, peak, comparison, or takeaway, but the structure remains partial.",
        "Strong narration. The output presents a clear multi-scene or multi-step narrative structure with explicit scene-level guidance.",
        "Very strong narration. The tool generates well-structured narration that is closely aligned with corresponding visual or motion instructions, such as highlighting, zooming, or scene-specific emphasis.",
      ],
      [
        "Human Agency",
        "The user has little or no meaningful control over the generation process or result.",
        "Limited agency. The user can influence only one aspect of the workflow, such as input prompting or basic revision.",
        "Moderate agency. The user can revise multiple aspects of the output, but control remains coarse or unstable.",
        "Strong agency. The tool supports meaningful collaborative control, such as choosing among alternatives, editing local content, or iteratively refining outputs.",
        "Very strong agency. The tool supports stable and fine-grained user control across multiple stages of generation while preserving overall consistency across revisions.",
      ],
    ];
  
    return (
      <main className="min-h-screen bg-[#F5F5F5] text-[#1F2937]">
        <section className="pt-12 pb-10">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-[28px] md:text-[27px] font-semibold leading-[1.2] mb-4 text-center">
              Codebook
            </h1>
  
            <div className="max-w-5xl mx-auto">
              <p className="text-[15px] leading-[1.35] text-[#4B5563] text-center">
                This page documents the analytical framework used throughout the
                website, including the binary coding scheme for academic
                prototypes and the rubric-based scoring scheme for commercial
                tools.
              </p>
            </div>
          </div>
        </section>
  
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-[22px] font-semibold mb-6">Core Dimensions</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {coreDimensions.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[18px] border border-slate-300 bg-white px-6 py-5"
                >
                  <h3 className="text-[17px] font-semibold mb-2">{item.title}</h3>
                  <p className="text-[14px] leading-[1.6] text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <section className="pb-12">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-[22px] font-semibold mb-3">
              Academic Coding Scheme
            </h2>
            <p className="text-[14px] text-slate-500 mb-5">
              A value of 1 indicates that the capability was explicitly supported
              or clearly evidenced in the paper and related materials, while 0
              indicates that it was not reported or could not be confirmed.
            </p>
  
            <div className="overflow-x-auto rounded-[18px] border border-slate-300 bg-white">
              <table className="w-full border-collapse text-left text-[14px]">
                <thead className="bg-[#EEF2F5] text-[#374151]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Sub-dimension</th>
                    <th className="px-4 py-3 font-semibold">
                      Operational definition
                    </th>
                    <th className="px-4 py-3 font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {academicRows.map((row, index) => (
                    <tr key={index} className="border-t border-slate-200">
                      <td className="px-4 py-3 align-top font-medium">{row[0]}</td>
                      <td className="px-4 py-3 align-top">{row[1]}</td>
                      <td className="px-4 py-3 align-top text-slate-600 leading-[1.5]">
                        {row[2]}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-600">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
  
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-[22px] font-semibold mb-3">
              Commercial Scoring Rubric
            </h2>
            <p className="text-[14px] text-slate-500 mb-5">
              Scores range from 0 to 4, where 0 indicates absence of the
              capability and 4 indicates strong and well-supported performance.
            </p>
  
            <div className="overflow-x-auto rounded-[18px] border border-slate-300 bg-white">
              <table className="w-full border-collapse text-left text-[14px] min-w-[1100px]">
                <thead className="bg-[#EEF2F5] text-[#374151]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Dimension</th>
                    <th className="px-4 py-3 font-semibold">0</th>
                    <th className="px-4 py-3 font-semibold">1</th>
                    <th className="px-4 py-3 font-semibold">2</th>
                    <th className="px-4 py-3 font-semibold">3</th>
                    <th className="px-4 py-3 font-semibold">4</th>
                  </tr>
                </thead>
                <tbody>
                  {commercialRows.map((row, index) => (
                    <tr key={index} className="border-t border-slate-200">
                      <td className="px-4 py-3 align-top font-medium">{row[0]}</td>
                      <td className="px-4 py-3 align-top text-slate-600 leading-[1.5]">
                        {row[1]}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-600 leading-[1.5]">
                        {row[2]}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-600 leading-[1.5]">
                        {row[3]}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-600 leading-[1.5]">
                        {row[4]}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-600 leading-[1.5]">
                        {row[5]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    );
  }