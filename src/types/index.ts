export interface Author {
    image: string;
    name: string;
    role: string;
    company: {
      logo: string;
      name: string;
    };
  }

  export interface Testimonial {
    rating: number;
    quote: string;
    author: Author;
  }

  export interface Feature {
    icon: string;
    title: string;
    description: string;
  }

  export interface FooterLink {
    title: string;
    links: string[];
  }

  export interface SocialLink {
    name: string;
    icon: string;
    url: string;
  }

  export interface NavigationItem {
    title: string;
    href: string;
    description: string;
  }

  export interface HeroProps {
    title: string;
    description: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
    image: {
      src: string;
      alt: string;
    };
  }

  export interface StatProps {
    value: string;
    label: string;
  }

  export interface CallToActionProps {
    title: string;
    description: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
  }
