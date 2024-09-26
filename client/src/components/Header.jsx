import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="flex justify-between items-center p-4">
      <div className="flex-1">
        <NavLink to='/'>
          <h1 className="text-3xl font-bold">CFE</h1>
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex flex-1 justify-around">
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

      {/* Mobile Navigation Trigger */}
      <div className="md:hidden flex-1 flex justify-end">
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
            <NavLink to='/learner/signup'>
              <Button onClick={() => setIsOpen(false)}>Join now</Button>
            </NavLink>
          </SheetContent>
        </Sheet>
      </div>

      {/* Join Now Button for Desktop */}
      <div className="hidden md:flex flex-1 justify-end">
        <NavLink to='/learner/signup'>
          <Button>Join now</Button>
        </NavLink>
      </div>
    </header>
  );
}