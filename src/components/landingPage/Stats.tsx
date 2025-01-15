import * as React from "react";
import { StatProps } from "@/types";

export function Stats({ stats }: { stats: StatProps[] }): JSX.Element {
  return (
    <section
      // className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8"
      className="py-8 px-8"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="text-3xl font-bold text-center mb-12">
        Our Impact in Numbers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:justify-items-center  max-w-7xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <strong className="text-5xl font-bold">{stat.value}</strong>
            <span className="mt-2 text-base">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
