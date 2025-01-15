import * as React from "react";
import { Testimonial } from "@/types";
import { TestimonialCard } from "./TestimonialCard";

const testimonials: Testimonial[] = [
  {
    rating: 5,
    quote: "Nova has streamlined our video production process. It's a game changer for our team!",
    author: {
      name: "Jane Doe",
      role: "Marketing Manager",
      image: "/testimonials/smartphone.jpg",
      company: {
        name: "XYZ Corp",
        logo: "/companies/xyz-corp.svg"
      }
    }
  },
  {
    rating: 5,
    quote: "The AI features are incredibly helpful. They save us so much time!",
    author: {
      name: "John Smith",
      role: "Content Creator",
      image: "/testimonials/smartphone.jpg",
      company: {
        name: "ABC Inc",
        logo: "/companies/abc-inc.svg"
      }
    }
  }
];

export function TestimonialSection(): JSX.Element {
  return (
    <section
      className="py-16 px-8 bg-accent/10"
      aria-labelledby="testimonials-heading"
    >
      <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-12">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}
