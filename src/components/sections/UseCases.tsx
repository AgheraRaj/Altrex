import { useState } from "react";
import {
  Building2,
  Car,
  Factory,
  HeartPulse,
  MapPinned,
  Shield,
  Smartphone,
  Sprout,
} from "lucide-react";
import { Badge } from "../ui/badge";

const useCases = [
  {
    icon: Factory,
    title: "Industrial IoT",
    description:
      "Monitor machines, automate workflows, and process realtime industrial data at scale.",
    metric: "Processes 50K sensor events/sec",
    bullets: ["Machine health monitoring", "Workflow automation pipelines", "Edge data processing"],
  },
  {
    icon: Shield,
    title: "Smart Surveillance",
    description:
      "Power CCTV systems, live monitoring, and secure realtime video infrastructure.",
    metric: "Monitors 10K camera feeds",
    bullets: ["Live stream ingestion", "Secure encrypted transport", "Event-based alerting"],
  },
  {
    icon: Car,
    title: "Fleet Tracking",
    description:
      "Track vehicles, optimize logistics, and stream live telemetry across global fleets.",
    metric: "Tracks 80K+ vehicles globally",
    bullets: ["GPS telemetry streaming", "Route optimization signals", "Driver behavior analytics"],
  },
  {
    icon: Sprout,
    title: "Smart Agriculture",
    description:
      "Connect sensors, monitor crops, and automate farming operations using IoT infrastructure.",
    metric: "Connects 200K field sensors",
    bullets: ["Soil & climate sensors", "Automated irrigation triggers", "Crop health dashboards"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare Monitoring",
    description:
      "Enable secure realtime patient monitoring and connected medical device communication.",
    metric: "Streams vitals for 5K patients",
    bullets: ["HIPAA-compliant transport", "Wearable device connectivity", "Emergency alert routing"],
  },
  {
    icon: Building2,
    title: "Smart Cities",
    description:
      "Build scalable infrastructure for traffic systems, utilities, and connected urban environments.",
    metric: "Manages 1M+ city devices",
    bullets: ["Traffic signal coordination", "Utility grid telemetry", "Public safety networks"],
  },
  {
    icon: Smartphone,
    title: "Realtime Applications",
    description:
      "Create modern messaging apps, live collaboration platforms, and realtime experiences.",
    metric: "Supports 100K concurrent users",
    bullets: ["Low-latency pub/sub channels", "Presence & typing indicators", "Push notification delivery"],
  },
  {
    icon: MapPinned,
    title: "Global Infrastructure",
    description:
      "Deploy distributed systems worldwide with ultra-low latency and high availability.",
    metric: "120+ global edge regions",
    bullets: ["Multi-region failover", "Edge-close data routing", "99.99% SLA guaranteed"],
  },
];

const UseCases = () => {
  const [active, setActive] = useState(0);
  const activeCase = useCases[active];
  const ActiveIcon = activeCase.icon;

  return (
    <section className="relative overflow-hidden bg-gray-50 py-28">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
          >
            Use Cases
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Built for Modern{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Realtime Industries
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From industrial IoT to smart infrastructure, power scalable realtime
            applications across modern connected ecosystems.
          </p>
        </div>

        {/* Mobile: horizontal pill scroller */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  active === i
                    ? "border-violet-600 bg-violet-600 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-violet-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {uc.title}
              </button>
            );
          })}
        </div>

        {/* Desktop: sidebar + panel */}
        <div className="mt-14 flex gap-8">
          {/* Vertical tab list — desktop */}
          <div className="hidden w-64 flex-shrink-0 flex-col gap-1 lg:flex">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${
                    active === i
                      ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg shadow-violet-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${active === i ? "bg-white/20" : "bg-gray-200"}`}>
                    <Icon className={`h-4 w-4 ${active === i ? "text-white" : "text-gray-600"}`} />
                  </div>
                  {uc.title}
                </button>
              );
            })}
          </div>

          {/* Detail Panel */}
          <div className="flex-1">
            <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-10 shadow-lg">
              {/* Background glow */}
              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-100/50 blur-3xl" />

              <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                {/* Icon */}
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-xl shadow-violet-300/40">
                  <ActiveIcon className="h-10 w-10" />
                </div>

                <div className="flex-1">
                  {/* Metric badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {activeCase.metric}
                  </div>

                  <h3 className="mt-4 text-3xl font-bold text-gray-900">{activeCase.title}</h3>
                  <p className="mt-3 text-base leading-8 text-gray-600">{activeCase.description}</p>

                  {/* Bullet points */}
                  <ul className="mt-6 space-y-3">
                    {activeCase.bullets.map((b, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-100">
                          <div className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                        </div>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* CTA buttons */}
                  <div className="mt-8 flex gap-3">
                    <button className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:opacity-90 transition-opacity">
                      Start Building
                    </button>
                    <button className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-violet-300 hover:text-violet-700 transition-colors">
                      Book Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile content panel */}
        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-md lg:hidden">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg">
            <ActiveIcon className="h-8 w-8" />
          </div>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            {activeCase.metric}
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-900">{activeCase.title}</h3>
          <p className="mt-3 text-sm leading-7 text-gray-600">{activeCase.description}</p>
          <ul className="mt-4 space-y-2">
            {activeCase.bullets.map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <div className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UseCases;

// DESIGN NOTE: Tabbed layout with vertical sidebar tabs (desktop) / horizontal pill scroller (mobile), detail panel with metric badge and bullet points, and a center gradient stripe accent.