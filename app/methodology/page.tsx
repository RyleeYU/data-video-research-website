export default function MethodologyPage() {
    return (
      <main className="min-h-screen bg-white text-gray-900 px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
            Methodology
          </p>
  
          <h1 className="text-4xl font-semibold mb-6">
            Data Collection and Analysis
          </h1>
  
          <div className="space-y-8 text-gray-700 leading-8">
            <section>
              <h2 className="text-2xl font-medium mb-3">Overview</h2>
              <p>
                This supplementary website documents the academic prototypes and
                commercial tools reviewed in the paper.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-medium mb-3">Inclusion Criteria</h2>
              <p>
                Tools were selected based on their relevance to AI-assisted data
                video creation and their support for at least one stage of the
                workflow.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-medium mb-3">Core Dimensions</h2>
              <p>
                The analysis focuses on AI automation, human agency, narration,
                and data accuracy.
              </p>
            </section>
          </div>
        </div>
      </main>
    );
  }