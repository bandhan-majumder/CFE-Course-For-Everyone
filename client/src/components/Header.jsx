import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="mx-100 bg-yellow-500 px-20 sticky">
      <header className="flex justify-between items-center p-4">
        <div className="flex-1 mx-5">
          <NavLink to="/">
            <h1 className="text-3xl font-bold">CFE</h1>
          </NavLink>
        </div>

        <nav className="flex-1 flex justify-around">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `transition-colors hover:text-foreground/80 ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="flex-1 flex justify-end">
          <NavLink to="/learner/signup">
            <Button className="mx-8">Join now</Button>
          </NavLink>
        </div>
      </header>
    </div>
  );
}

function MobileNav({ navItems, setIsOpen }) {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `text-foreground/70 transition-colors hover:text-foreground ${
                isActive ? "text-foreground" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </NavLink>
        ))}
        <Button onClick={() => setIsOpen(false)}>Join now</Button>
      </SheetContent>
    </Sheet>
  );
}
