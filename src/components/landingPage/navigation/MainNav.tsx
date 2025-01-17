import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { NavigationItem } from "@/types";
import { Menu } from "lucide-react";

const navigationItems: NavigationItem[] = [
  {
    title: "Features",
    href: "/features",
    description: "Explore our powerful video creation tools",
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Find the perfect plan for your needs",
  },
  {
    title: "Resources",
    href: "/resources",
    description: "Guides, tutorials, and documentation",
  },
];

export function MainNav(): JSX.Element {
  return (
    <div
      className="flex items-center justify-between px-2 md:px-16 py-4 bg-background"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-4">
        <Menu className="w-6 h-6 md:hidden" />
        <Link href="/" aria-label="Nova home" className="flex items-center text-xl">
          <Image
            src="/logo.svg"
            alt=""
            width={84}
            height={36}
            className="h-9"
          />
          Nova
        </Link>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="block p-4 hover:bg-accent"
                    >
                      <div className="text-sm font-medium">{item.title}</div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/auth/sign-in">Join</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Start</Link>
        </Button>
      </div>
    </div>
  );
}
