import { ArrowRight, Globe, ShieldCheck, Timer, Zap } from "lucide-react";
import { Badge } from "../ui/badge";

const trustItems = [
  { icon: Timer,       label: "99.99% Uptime" },
  { icon: ShieldCheck, label: "SOC2 Compliant" },
  { icon: Globe,       label: "GDPR Ready" },
  { icon: Zap,         label: "24/7 Support" },
];

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      <style>{`
        @keyframes cta-bg {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .cta-gradient {
          background: linear-gradient(135deg,
            #4c1d95 0%,
            #7c3aed 25%,
            #c026d3 50%,
            #7c3aed 75%,
            #3b0764 100%
          );
          background-size: 300% 300%;
          animation: cta-bg 8s ease infinite;
        }
        .headline-glow {
          text-shadow: 0 0 60px rgba(196,181,253,0.4), 0 0 120px rgba(196,181,253,0.15);
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Narrower centered container with gradient */}
        <div className="cta-gradient relative overflow-hidden rounded-3xl px-10 py-20 text-center shadow-2xl shadow-violet-900/30 lg:px-20">

          {/* Noise texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Ambient glow inside card */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="border border-white/20 bg-white/10 p-4 text-sm font-medium text-white"
            >
              Start Building Today
            </Badge>

            {/* Headline */}
            <h2 className="headline-glow mt-10 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Build Realtime Systems
              <span className="mt-2 block text-white/90">Without Complexity</span>
            </h2>

            {/* Subtext */}
            <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-violet-200/80">
              Deploy scalable messaging infrastructure, connect millions of devices,
              and power modern realtime applications globally.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-xl transition-all hover:scale-[1.02] hover:bg-gray-50 active:scale-[0.98]">
                Start Building
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                Book Demo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {trustItems.map(({ icon: Icon, label }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

// DESIGN NOTE: White section background with a narrower rounded-3xl gradient container — same animated gradient, noise texture, and trust chips, but contained rather than full-bleed.