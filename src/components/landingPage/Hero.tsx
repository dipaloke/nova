import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroProps } from "@/types";

export function Hero({
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
}: HeroProps): JSX.Element {
  return (
    <section
      className="flex overflow-hidden flex-wrap gap-10 items-center px-16 py-28 w-full bg-background max-md:px-5 max-md:py-24"
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px]">
        <h1
          id="hero-heading"
          className="text-6xl font-bold leading-[67px] max-md:text-4xl max-md:leading-[54px]"
        >
          {title}
        </h1>
        <p className="mt-6 text-lg leading-7">{description}</p>
        <div className="flex gap-4 mt-8">
          <Button size="lg" asChild>
            <Link href={primaryCta.href}>{primaryCta.text}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
          </Button>
        </div>
      </div>
      <div className="flex-1 shrink basis-0 min-w-[240px]">
        <Image
          src={image.src}
          alt={image.alt}
          width={600}
          height={600}
          className="object-fill w-full aspect-[0.96] rounded-3xl"
          priority
        />
      </div>
    </section>
  );
}
