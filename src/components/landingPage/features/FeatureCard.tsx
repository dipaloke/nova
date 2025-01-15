import * as React from "react";
import Image from "next/image";
import { Feature } from "@/types";

export function FeatureCard({ icon, title, description }: Feature): JSX.Element {
  return (
    <div className="flex gap-3 items-start p-4 rounded-lg hover:bg-accent/50 transition-colors">
      <Image
        src={icon}
        alt=""
        width={24}
        height={24}
        className="shrink-0"
      />
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}
