import * as React from "react";
import Image from "next/image";
import { Testimonial } from "@/types";

export function TestimonialCard({
  quote,
  author,
  rating,
}: Testimonial): JSX.Element {
  return (
    <div className="flex flex-col p-6 bg-background rounded-lg shadow-sm">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Image
            key={i}
            src={
              i < rating ? "/icons/star-filled.svg" : "/icons/star-empty.svg"
            }
            alt=""
            width={20}
            height={20}
          />
        ))}
      </div>
      <blockquote className="text-xl font-medium mb-6">{quote}</blockquote>
      <div className="flex items-center gap-4 mt-auto">
        <Image
          src={author.image}
          alt=""
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <div className="font-semibold">{author.name}</div>
          <div className="text-sm text-muted-foreground">{author.role}</div>
        </div>
        {author.company.logo && (
          <Image
            src={author.company.logo}
            alt={author.company.name}
            width={30}
            height={30}
            className="ml-auto"
          />
        )}
      </div>
    </div>
  );
}
