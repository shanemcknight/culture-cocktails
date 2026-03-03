'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const links = [
    { href: '/services', label: 'Services' },
    { href: '/#work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/process', label: 'Process' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-warm/95 backdrop-blur-xl shadow-sm'
          : 'bg-warm/92 backdrop-blur-xl'
      }`}
      style={{ height: '90px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
    >
      <div className="max-w-[1200px] mx-auto h-full px-6 md:px-10 flex items-center justify-between">
        {/* Logo — 50% larger */}
        <Link href="/" className="relative h-[84px] w-[240px]">
          <Image
            src="/images/culture-cocktails-logo.png"
            alt="Culture Cocktails"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[0.85rem] font-medium text-gray-text hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="bg-blue text-white px-6 py-2.5 rounded-md font-semibold text-[0.82rem] hover:bg-blue-dark transition-colors"
            >
              Start a Project
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 relative z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu — full screen overlay with solid background */}
      <div
        className={`md:hidden fixed inset-0 top-[90px] z-40 transition-all duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark overlay behind menu */}
        <div
          className="absolute inset-0 bg-black/20"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu panel — slides down from top */}
        <div
          className={`relative bg-white shadow-2xl rounded-b-2xl mx-4 mt-2 p-8 transition-all duration-300 ${
            menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          style={{ borderTop: '3px solid #025D9F' }}
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-black hover:text-blue transition-colors py-3 px-4 rounded-lg hover:bg-blue-light/50"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #e5e7eb' }}>
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="btn-primary block text-center w-full"
            >
              Start a Project
            </Link>
          </div>

          <p className="text-xs text-gray-light text-center mt-4">
            shane@culturecocktails.co
          </p>
        </div>
      </div>
    </nav>
  );
}
