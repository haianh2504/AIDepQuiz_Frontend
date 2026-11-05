"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.classList.add("drawer-open");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("drawer-open");
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
      >
        <div className="drawer-topline">
          <button
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

