import Link from "next/link";
import { items } from "../../data/items";

export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
          Collection
        </p>

        <h1 className="text-4xl font-semibold mb-6">Tool Collection</h1>

        <p className="text-lg text-gray-600 mb-10">
          This page displays academic prototypes and commercial tools included
          in the supplementary collection.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow block"
            >
              <p className="text-sm text-gray-500 mb-3">
                {item.category === "academic" ? "Academic" : "Commercial"} ·{" "}
                {item.year}
              </p>

              <h2 className="text-xl font-medium mb-3">{item.title}</h2>

              <p className="text-gray-600 leading-7 mb-4">{item.summary}</p>

              <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                <span className="px-3 py-1 rounded-full bg-gray-100">
                  Automation {item.dimensions.automation}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100">
                  Agency {item.dimensions.agency}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100">
                  Narration {item.dimensions.narration}
                </span>
                <span className="px-3 py-1 rounded-full bg-gray-100">
                  Accuracy {item.dimensions.accuracy}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}