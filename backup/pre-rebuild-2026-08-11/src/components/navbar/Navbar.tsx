"use client";
import { useRef, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    gsap.fromTo(navRef.current, {
      y: -100,
    }, {
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.5
    });
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navRef.current?.classList.add('py-4', 'bg-background/95', 'shadow-lg', 'border-b', 'border-border/50');
        navRef.current?.classList.remove('py-6');
      } else {
        navRef.current?.classList.add('py-6');
        navRef.current?.classList.remove('py-4', 'bg-background/95', 'shadow-lg', 'border-b', 'border-border/50');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, { scope: navRef });

  return (
    <nav ref={navRef} className="fixed w-full z-50 transition-all duration-300 py-6 border-b border-transparent backdrop-blur-sm">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
          {siteConfig.name}
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="#services" className="hover:text-foreground transition-colors">Services</Link>
          <Link href="#projects" className="hover:text-foreground transition-colors">Projects</Link>
          <Link href="#process" className="hover:text-foreground transition-colors">Process</Link>
          <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-sm font-medium transition-all hover:scale-105 active:scale-95">
            GET A FREE QUOTE
          </Link>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-t border-border/20 py-4 shadow-xl">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <Link href="#about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="#services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="#projects" onClick={() => setIsOpen(false)}>Projects</Link>
            <Link href="#process" onClick={() => setIsOpen(false)}>Process</Link>
            <Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <div className="pt-4 flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
