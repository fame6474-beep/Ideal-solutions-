"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "Architectural Roofing Shingles (CertainTeed)",
    areaSqFt: "2000",
    location: "",
    timeline: "Immediate (Within 1-2 Weeks)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getWhatsAppDirectLink = () => {
    const text = `Hi Ideal Solutions!\n\n*Client Name:* ${formData.name || "Client"}\n*Phone:* ${formData.phone || "N/A"}\n*Project Type:* ${formData.projectType}\n*Estimated Area:* ${formData.areaSqFt} Sq.Ft\n*Location:* ${formData.location || "Kerala"}\n*Timeline:* ${formData.timeline}\n*Requirements:* ${formData.message || "Requesting site inspection and technical consultation."}`;
    return `https://wa.me/919567242157?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Direct Contact Info & Guarantees (5 cols) */}
          <div className="lg:col-span-5 h-full">
            <Reveal>
              <div className="glass-plaque p-6 sm:p-8 md:p-10 rounded-3xl h-full flex flex-col justify-between shadow-2xl">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4 leading-tight">
                    ENGINEERING CONSULTATION.
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Connect directly with our structural engineering team for precise laser site measurements, structural load analysis, and verified material specifications.
                  </p>

                  {/* 24-Hour Inspection Guarantee */}
                  <div className="p-4 rounded-2xl bg-accent/10 border border-accent/25 mb-6">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      24–48h Site Inspection Commitment
                    </span>
                    <p className="text-xs text-foreground/90 leading-relaxed">
                      Our structural engineers will inspect your site anywhere across Kerala for laser measurements and structural roof framing assessment.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 text-foreground border-t border-border/60 pt-6">
                  <div>
                    <span className="block text-[11px] font-mono tracking-widest text-accent font-bold uppercase mb-1">
                      Senior Project Manager
                    </span>
                    <span className="text-base sm:text-lg font-bold">Sanjay · Ideal Solutions</span>
                  </div>

                  <div>
                    <span className="block text-[11px] font-mono tracking-widest text-accent font-bold uppercase mb-1">
                      Direct Hotlines
                    </span>
                    <div className="flex flex-col gap-1.5 font-mono">
                      <a href="tel:9567242157" className="text-base sm:text-lg font-bold hover:text-accent transition-colors flex items-center gap-2">
                        <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        <span>+91 95672 42157</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-accent/15 text-accent font-normal">Primary</span>
                      </a>
                      <a href="tel:9074237480" className="text-sm sm:text-base font-semibold text-muted-foreground hover:text-accent transition-colors flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        <span>+91 90742 37480</span>
                      </a>
                    </div>
                  </div>

                  <div>
                    <span className="block text-[11px] font-mono tracking-widest text-accent font-bold uppercase mb-1">
                      Headquarters & Experience Centre
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-foreground block leading-relaxed mb-2">
                      SRA-09, PTP Nagar, Thirumala-PO, Trivandrum, Kerala – 695006
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground block mb-2">
                      Coordinates: LAT 8.5066° N · LON 76.9856° E
                    </span>
                    <a
                      href="https://maps.google.com/?q=PTP+Nagar+Thirumala+Trivandrum"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline font-mono"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Open Google Maps Directions →
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Consultation & WhatsApp Lead Form (7 cols) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="glass-plaque p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center text-3xl font-bold border border-emerald-500/40">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Consultation Request Received!
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-foreground">{formData.name}</strong>. Our senior engineer (Sanjay) will review your <strong className="text-foreground">{formData.projectType}</strong> project in <strong className="text-foreground">{formData.location}</strong> and contact you at <strong className="text-foreground">{formData.phone}</strong>.
                    </p>
                    <div className="pt-4">
                      <a
                        href={getWhatsAppDirectLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 py-3.5 px-7 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-[#20ba5a] transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        <span>Open in WhatsApp Instant Desk</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                    <div className="border-b border-border/60 pb-3 mb-4">
                      <h3 className="text-xl font-bold text-foreground">
                        Schedule Site Visit & Structural Consultation
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Submit your project details for rapid engineering review and laser site measurement booking.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="name" className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="e.g. Rahul Menon"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-surface dark:bg-zinc-950/80 border border-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-accent text-foreground text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="phone" className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                          Phone Number *
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-surface dark:bg-zinc-950/80 border border-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-accent text-foreground text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="project-type" className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                          Project Solution *
                        </label>
                        <select
                          id="project-type"
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                          className="w-full bg-surface dark:bg-zinc-950/80 border border-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-accent text-foreground text-sm"
                        >
                          <option value="Architectural Roofing Shingles (CertainTeed)">Roofing Shingles (CertainTeed USA)</option>
                          <option value="Stone Coated Metal Roof Tiles (TechnoNicol)">Stone Coated Metal Tiles (TechnoNicol)</option>
                          <option value="Residential Oralium & Trafford Roofing">Residential Oralium / Trafford Sheet Roof</option>
                          <option value="Pre-Engineered Building Complex (PEB)">PEB (Pre-Engineered Commercial Building)</option>
                          <option value="Light & Heavy Structural Steel Truss">Light & Heavy Steel Truss Fabrication</option>
                          <option value="Synthetic Resort Thatch Roofing">Synthetic Thatch Resort Roofing</option>
                          <option value="Polycarbonate Canopy & Car Shed">Polycarbonate Canopies & Car Sheds</option>
                          <option value="Truss-less Self-Supported Arch Roof">Truss-less Arch Roof Technology</option>
                          <option value="Gypsum & Stretch False Ceilings">Gypsum (Saint-Gobain) & Stretch Ceilings</option>
                          <option value="ACP Facade & Spider Glass Glazing">ACP Architectural Facades & Glazing</option>
                          <option value="Turnkey Building Renovation & Waterproofing">Turnkey Renovation & Waterproofing</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="location" className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                          Project Location (District / Town) *
                        </label>
                        <input
                          id="location"
                          type="text"
                          required
                          placeholder="e.g. Kowdiar, Trivandrum / Kakkanad, Kochi"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-surface dark:bg-zinc-950/80 border border-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-accent text-foreground text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="area" className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                          Estimated Area (Sq. Ft)
                        </label>
                        <input
                          id="area"
                          type="text"
                          placeholder="e.g. 2,400 sq.ft"
                          value={formData.areaSqFt}
                          onChange={(e) => setFormData({ ...formData, areaSqFt: e.target.value })}
                          className="w-full bg-surface dark:bg-zinc-950/80 border border-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-accent text-foreground text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="timeline" className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                          Preferred Timeline
                        </label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full bg-surface dark:bg-zinc-950/80 border border-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-accent text-foreground text-sm"
                        >
                          <option value="Immediate (Within 1-2 Weeks)">Immediate (Within 1-2 Weeks)</option>
                          <option value="Next 1 Month">Next 1 Month</option>
                          <option value="Planning Phase (1-3 Months)">Planning Phase (1-3 Months)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="message" className="text-[11px] font-mono font-bold tracking-wider text-accent uppercase">
                        Project Scope / Custom Notes (Optional)
                      </label>
                      <textarea
                        id="message"
                        rows={2}
                        placeholder="e.g. Villa roof structural replacement, CertainTeed Landmark shingles in Moire Black shade..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-surface dark:bg-zinc-950/80 border border-border px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-accent text-foreground text-sm"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 text-center"
                      >
                        SUBMIT INQUIRY →
                      </button>

                      <a
                        href={getWhatsAppDirectLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 text-center"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                        </svg>
                        <span>WhatsApp Quick Submit</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

