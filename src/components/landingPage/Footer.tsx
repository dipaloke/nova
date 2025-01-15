import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { FooterLink, SocialLink } from "@/types";

const footerLinks: FooterLink[] = [
  {
    title: "Company",
    links: ["About Us", "Contact", "Careers", "Blog"]
  },
  {
    title: "Resources",
    links: ["Documentation", "Support", "API", "Community"]
  }
];

const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    icon: "/social/twitter.svg",
    url: "https://twitter.com/nova"
  },
  {
    name: "LinkedIn",
    icon: "/social/linkedin.svg",
    url: "https://linkedin.com/company/nova"
  }
];

export function Footer(): JSX.Element {
  return (
    <footer className="bg-background border-t" role="contentinfo">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" aria-label="Nova home">
              <Image
                src="/logo.svg"
                alt=""
                width={84}
                height={36}
                className="h-9"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Transform your video communication with Nova powerful creation and collaboration tools.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nova. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
