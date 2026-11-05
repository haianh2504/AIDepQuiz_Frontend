"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigationItems = [
  { label: "Trang chủ", href: "/#top" },
  { label: "Về bài test", href: "/#quiz-info" },
  { label: "Cơ sở học thuật", href: "/#academic-basis" },
  {
    label: "Giới hạn của bài test & Quyền riêng tư",
    href: "/#test-result-security",
  },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const menuToggle = menuToggleRef.current;
    const drawer = document.getElementById("mobile-navigation");
    const focusableItems = drawer?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href]:not([tabindex="-1"])',
    );

    drawerCloseRef.current?.focus();

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusableItems?.length) {
        return;
      }

      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", handleKeyboard);
    document.body.classList.add("drawer-open");

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
      document.body.classList.remove("drawer-open");
      menuToggle?.focus();
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/#top" aria-label="AIDepQuiz - Trang chủ">
          AIDepQuiz
        </Link>

        <nav className="desktop-navigation" aria-label="Điều hướng chính">
          {navigationItems.map((item) => (
            <Link key={item.href} className="nav-link" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          ref={menuToggleRef}
          className={`menu-toggle${isMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`drawer-backdrop${isMenuOpen ? " is-visible" : ""}`}
        aria-hidden="true"
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id="mobile-navigation"
        className={`mobile-drawer${isMenuOpen ? " is-open" : ""}`}
        aria-label="Điều hướng di động"
        aria-hidden={!isMenuOpen}
        aria-modal={isMenuOpen}
        role="dialog"
      >
        <div className="drawer-topline">
          <button
            ref={drawerCloseRef}
            className="drawer-close"
            type="button"
            aria-label="Đóng menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <span />
            <span />
          </button>
        </div>
        <nav className="drawer-navigation" aria-label="Điều hướng di động">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              className="drawer-link"
              href={item.href}
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </header>
  );
}

