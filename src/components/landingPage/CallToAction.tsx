import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CallToActionProps } from "@/types";

export function CallToAction({
  title,
  description,
  primaryCta,
  secondaryCta,
}: CallToActionProps): JSX.Element {
  return (
    <section
      className="flex flex-col items-center px-16 py-28 bg-primary text-primary-foreground"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-[768px] text-center">
        <h2
          id="cta-heading"
          className="text-5xl font-bold leading-tight max-md:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-6 text-lg">{description}</p>
        <div className="flex gap-4 justify-center mt-8">
          <Button
            size="lg"
            variant="secondary"
            asChild
          >
            <Link href={primaryCta.href}>{primaryCta.text}</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent hover:bg-primary-foreground/10"
            asChild
          >
            <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
