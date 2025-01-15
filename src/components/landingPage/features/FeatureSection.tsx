import * as React from "react";
import { FeatureCard } from "./FeatureCard";
import { Feature } from "@/types";

const features: Feature[] = [
  {
    icon: "/icons/video.svg",
    title: "Video Creation",
    description: "Create stunning videos effortlessly with Nova.",
  },
  {
    icon: "/icons/analytics.svg",
    title: "Video Analytics",
    description: "Gain insights into viewer engagement and performance.",
  },
  {
    icon: "/icons/collaboration.svg",
    title: "Collaboration Tools",
    description: "Work together seamlessly with your team.",
  },
  {
    icon: "/icons/support.svg",
    title: "Support Center",
    description: "Get help and support whenever you need it.",
  },
];

export function FeatureSection(): JSX.Element {
  return (
    <section
      className="py-16 px-8"
      aria-labelledby="features-heading"
    >
      <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">
        Powerful Features for Video Creation
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
