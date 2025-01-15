import { CallToAction } from "@/components/landingPage/CallToAction";
import { FeatureSection } from "@/components/landingPage/features/FeatureSection";
import { Hero } from "@/components/landingPage/Hero";
import { Layout } from "@/components/landingPage/Layout";
import { Stats } from "@/components/landingPage/Stats";
import { TestimonialSection } from "@/components/landingPage/testimonial/TestimonialSection";
import * as React from "react";


export default function Home(): JSX.Element {
  return (
    <Layout>
      <Hero
        title="Transform Your Video Communication with Nova"
        description="Nova empowers teams to create, share, and analyze video content effortlessly. With features like real-time streaming, AI-driven transcriptions, and collaborative workspaces, elevate your video communication to new heights."
        primaryCta={{ text: "Get Started", href: "/signup" }}
        secondaryCta={{ text: "Learn More", href: "/about" }}
        image={{ src: "/hero.svg", alt: "Nova platform interface showcase" }}
      />
      <FeatureSection />
      <Stats
        stats={[
          { value: "75%", label: "Increase in user engagement over the past year" },
          { value: "1000+", label: "Videos shared by our users every month" }
        ]}
      />
      <TestimonialSection />
      <CallToAction
        title="Transform Your Video Experience"
        description="Join Nova today and elevate your video creation with our free trial or demo."
        primaryCta={{ text: "Sign Up", href: "/signup" }}
        secondaryCta={{ text: "Learn More", href: "/about" }}
      />
    </Layout>
  );
}
