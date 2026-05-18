import {
  Activity,
  ArrowUpRight,
  Globe,
  MessagesSquare,
  ShieldCheck,
  Timer,
  Wifi,
  Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";

const stats = [
  {
    icon: MessagesSquare,
    value: "10M+",
    label: "Messages Processed Daily",
    description: "Realtime events and messaging traffic handled globally.",
  },
  {
    icon: Wifi,
    value: "24.8K",
    label: "Active Connections",
    description: "Connected devices and live realtime infrastructure.",
  },
  {
    icon: Timer,
    value: "50ms",
    label: "Average Latency",
    description: "Ultra-fast communication optimized for realtime systems.",
  },
  {
    icon: Globe,
    value: "120+",
    label: "Global Regions",
    description: "Distributed infrastructure deployed worldwide.",
  },
  {
    icon: ShieldCheck,
    value: "99.99%",
    label: "Infrastructure Uptime",
    description: "Enterprise-grade reliability for mission-critical systems.",
  },
  {
    icon: Activity,
    value: "1.2M/s",
    label: "Message Throughput",
    description: "High-performance event streaming at massive scale.",
  },
];

const StatisticsSection = () => {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-28">
      <style>{`
        @keyframes gradient-sweep {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .bg-sweep {
          background: linear-gradient(135deg, #1e1333 0%, #0f0618 30%, #0c1a2e 60%, #0f0618 100%);
          background-size: 300% 300%;
          animation: gradient-sweep 10s ease infinite;
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.6s ease both; }
      `}</style>

      {/* Animated gradient background */}
      <div className="bg-sweep absolute inset-0 -z-10" />

      {/* Ambient glows */}
      <div className="absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-900/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-fuchsia-900/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header: left-aligned + live indicator on right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge
            variant="secondary"
            className="border border-violet-500/30 bg-violet-500/10 p-4 text-sm font-medium text-violet-400"
          >
            Statistics &amp; Metrics
          </Badge>
            <h2 className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Realtime Infrastructure{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                at Global Scale
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-lg text-gray-400">
              High-performance infrastructure optimized for modern realtime
              messaging, IoT communication, and distributed systems.
            </p>
          </div>

          {/* Live badge */}
          <div className="flex flex-shrink-0 items-center gap-3 rounded-2xl border border-violet-700/40 bg-violet-900/30 px-6 py-4">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
            </span>
            <div>
              <p className="text-2xl font-bold text-white">1.2M/s</p>
              <p className="text-xs text-gray-400">Live throughput</p>
            </div>
          </div>
        </div>

        {/* Top row: 3 massive stats with dividers */}
        <div className="mt-16 flex flex-col divide-y divide-white/5 sm:flex-row sm:divide-x sm:divide-y-0">
          {stats.slice(0, 3).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="fade-up flex-1 px-4 py-8 sm:px-10 sm:py-4" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-6 text-7xl font-bold tracking-tight text-white">{item.value}</p>
                <p className="mt-3 text-lg font-semibold text-gray-300">{item.label}</p>
                <p className="mt-2 text-sm text-gray-500">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Thin divider */}
        <div className="my-6 h-px bg-white/5" />

        {/* Bottom row: 3 smaller secondary stats */}
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.slice(3).map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/5 p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 text-gray-400">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-white">{item.value}</p>
                    <div className="flex items-center gap-0.5 text-xs font-medium text-green-400">
                      <ArrowUpRight className="h-3 w-3" />
                      +12%
                    </div>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-400">{item.label}</p>
                  <p className="mt-1 text-xs text-gray-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom visual bar: Throughput Growth Dashboard */}
        <div className="mt-16 grid gap-8 overflow-hidden rounded-3xl border border-white/5 bg-violet-950/50 p-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400">
              Live Realtime Analytics
            </div>
            <h3 className="mt-6 text-3xl font-bold text-white">
              Monitor Infrastructure Performance in Realtime
            </h3>
            <p className="mt-4 text-base leading-8 text-gray-400">
              Gain complete visibility into messaging traffic, connected devices,
              and distributed infrastructure through powerful realtime analytics.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Data Streamed Monthly", value: "4.8PB" },
                { label: "Concurrent Sessions",  value: "850K+" },
              ].map((m, i) => (
                <div key={i} className="rounded-2xl border border-white/5 bg-white/5 p-5">
                  <p className="text-3xl font-bold text-white">{m.value}</p>
                  <p className="mt-1 text-sm text-gray-400">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fake chart panel */}
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/30 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-400">Throughput Growth</p>
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <Zap className="h-3 w-3" />
                +128% this year
              </div>
            </div>
            <div className="mt-6 flex h-40 items-end gap-2">
              {[60, 80, 100, 75, 120, 90, 140, 110, 170, 130, 190, 150].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-fuchsia-500"
                  style={{ height: `${(h / 190) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">Jan — Dec 2024</p>
              <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

// DESIGN NOTE: Full dark section with animated gradient sweep background, left-aligned header, massive 3-column stat row with vertical dividers, and no card borders — only spacing and type hierarchy.