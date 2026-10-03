"use client";

import { siteConfig } from '@/data/site';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-surface">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight">Let's Talk About Your Roof.</h2>
            <div className="space-y-6 text-muted-foreground">
              <p><strong className="text-foreground block mb-1">Address</strong> {siteConfig.address}</p>
              <p><strong className="text-foreground block mb-1">Phone</strong> {siteConfig.phone}</p>
              <p><strong className="text-foreground block mb-1">Email</strong> {siteConfig.email}</p>
            </div>
          </div>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="bg-surface border border-border px-4 py-3 text-foreground focus:outline-none focus:border-copper rounded-sm" />
              <input type="tel" placeholder="Phone" className="bg-surface border border-border px-4 py-3 text-foreground focus:outline-none focus:border-copper rounded-sm" />
            </div>
            <input type="email" placeholder="Email" className="w-full bg-surface border border-border px-4 py-3 text-foreground focus:outline-none focus:border-copper rounded-sm" />
            <select className="w-full bg-surface border border-border px-4 py-3 text-foreground focus:outline-none focus:border-copper rounded-sm appearance-none">
              <option value="" className="text-black">Service Required</option>
              <option value="residential" className="text-black">Residential Roofing</option>
              <option value="commercial" className="text-black">Commercial Roofing</option>
            </select>
            <textarea placeholder="Message" rows={4} className="w-full bg-surface border border-border px-4 py-3 text-foreground focus:outline-none focus:border-copper rounded-sm"></textarea>
            <button className="w-full bg-copper hover:bg-copper-light text-foreground px-8 py-4 rounded-sm font-medium transition-colors">REQUEST A QUOTE →</button>
          </form>
        </div>
      </div>
    </section>
  );
}
