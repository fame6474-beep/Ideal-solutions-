export function TrustBar() {
  const trusts = [
    { title: "QUALITY MATERIALS", desc: "Premium roofing systems" },
    { title: "SKILLED WORKMANSHIP", desc: "Professional workmanship" },
    { title: "BUILT TO LAST", desc: "Long-term protection" },
    { title: "CUSTOMER FIRST", desc: "Reliable service" }
  ];
  return (
    <section className="bg-surface border-y border-border py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {trusts.map((t, i) => (
            <div key={i} className="pt-4 md:pt-0 md:px-8 first:pl-0 last:pr-0 text-center md:text-left">
              <h3 className="text-foreground font-semibold tracking-wider text-sm mb-1">{t.title}</h3>
              <p className="text-muted-foreground text-sm">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
