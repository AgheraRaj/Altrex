import {
  Activity,
  ArrowUpRight,
  Bell,
  Cpu,
  Globe,
  LayoutDashboard,
  Radio,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { Badge } from "../ui/badge";

const barHeights = [38, 52, 70, 48, 82, 60, 110, 88, 130, 100, 150, 120];
const linePoints = [38, 52, 70, 48, 82, 60, 110, 88, 130, 100, 150, 120];
const maxH = Math.max(...linePoints);

const toSvgPolyline = (heights: number[], max: number, h: number) =>
  heights
    .map((v, i) => `${(i / (heights.length - 1)) * 100},${h - (v / max) * h}`)
    .join(" ");

const svgPoints = toSvgPolyline(linePoints, maxH, 120);

const ProductShowcase = () => {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-fuchsia-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
          >
            Product Showcase
          </Badge>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Monitor Everything
            <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              In Realtime
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Gain complete visibility into messaging infrastructure, connected
            devices, and realtime performance through a modern analytics
            dashboard.
          </p>
        </div>

        {/* Dashboard */}
        <div className="relative mt-20">
          {/* Ambient glow */}
          <div className="absolute -inset-4 rounded-[44px] bg-gradient-to-br from-violet-200/40 via-fuchsia-100/30 to-cyan-100/30 blur-3xl" />

          {/* Browser Chrome */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)]">
            {/* Browser Topbar */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-4 flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-1 text-xs text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-gray-300" />
                  dashboard.altrex.dev
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-medium text-green-700">
                  All Systems Operational
                </span>
              </div>
            </div>

            {/* Dashboard Layout: Sidebar + Main */}
            <div className="flex h-[600px] overflow-hidden">
              {/* ── Sidebar ── */}
              <div className="flex w-16 flex-shrink-0 flex-col items-center gap-6 border-r border-gray-100 bg-gray-50 py-5">
                {/* Logo */}
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-md shadow-violet-300">
                  <Zap className="h-4 w-4 text-white" />
                </div>

                {/* Nav */}
                <div className="mt-2 flex flex-col gap-4">
                  {[
                    { icon: LayoutDashboard, active: true },
                    { icon: Activity, active: false },
                    { icon: Wifi, active: false },
                    { icon: Users, active: false },
                    { icon: ShieldCheck, active: false },
                    { icon: Settings, active: false },
                  ].map(({ icon: Icon, active }, i) => (
                    <div
                      key={i}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
                        active
                          ? "bg-violet-100 text-violet-600 shadow-sm"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Main Content ── */}
              <div className="flex flex-1 flex-col overflow-hidden bg-gray-50/50">
                {/* Inner Topbar */}
                <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
                  <div>
                    <p className="text-[11px] text-gray-400">Welcome back</p>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Altrex Dashboard
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500">
                      <Bell className="h-4 w-4" />
                      <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-500" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs font-bold text-white">
                      A
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 gap-5 overflow-hidden p-5">
                  {/* ── Left Column ── */}
                  <div className="flex min-w-0 flex-1 flex-col gap-5">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        {
                          icon: Radio,
                          label: "Messages / sec",
                          value: "1.2M",
                          change: "+12%",
                          iconBg: "from-violet-600 to-violet-500",
                          iconShadow: "shadow-violet-200",
                          cardBg: "bg-violet-50",
                          border: "border-violet-100",
                          blob: "bg-violet-400",
                        },
                        {
                          icon: Wifi,
                          label: "Active Devices",
                          value: "24.8K",
                          change: "+8%",
                          iconBg: "from-fuchsia-600 to-fuchsia-500",
                          iconShadow: "shadow-fuchsia-200",
                          cardBg: "bg-fuchsia-50",
                          border: "border-fuchsia-100",
                          blob: "bg-fuchsia-400",
                        },
                        {
                          icon: Globe,
                          label: "Global Regions",
                          value: "120+",
                          change: "+24%",
                          iconBg: "from-cyan-600 to-cyan-500",
                          iconShadow: "shadow-cyan-200",
                          cardBg: "bg-cyan-50",
                          border: "border-cyan-100",
                          blob: "bg-cyan-400",
                        },
                      ].map(
                        (
                          {
                            icon: Icon,
                            label,
                            value,
                            change,
                            iconBg,
                            iconShadow,
                            cardBg,
                            border,
                            blob,
                          },
                          i,
                        ) => (
                          <div
                            key={i}
                            className={`relative overflow-hidden rounded-xl border ${border} ${cardBg} p-4`}
                          >
                            <div className="flex items-start justify-between">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${iconBg} text-white shadow-md ${iconShadow}`}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-white text-green-700 font-semibold"
                              >
                                {change}
                                <ArrowUpRight className="h-3 w-3" />
                              </Badge>
                            </div>
                            <p className="mt-4 text-2xl font-bold text-gray-900">
                              {value}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              {label}
                            </p>
                            <div
                              className={`pointer-events-none absolute -bottom-5 -right-5 h-20 w-20 rounded-full ${blob} opacity-10 blur-2xl`}
                            />
                          </div>
                        ),
                      )}
                    </div>

                    {/* Chart Panel */}
                    <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">
                            Message Throughput
                          </h4>
                          <p className="mt-0.5 text-xs text-gray-500">
                            Live infrastructure analytics
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 text-xs font-medium text-violet-600">
                            <TrendingUp className="h-3 w-3" />
                            <span>+18% this week</span>
                          </div>
                          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                            24h
                          </div>
                        </div>
                      </div>

                      {/* Chart area */}
                      <div
                        className="relative mt-4 flex-1"
                        style={{ minHeight: 120 }}
                      >
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between pb-5">
                          {[0, 1, 2, 3].map((_, i) => (
                            <div
                              key={i}
                              className="w-full border-t border-gray-100"
                            />
                          ))}
                        </div>

                        {/* SVG: gradient fill + smooth line */}
                        <svg
                          className="absolute inset-0 h-[calc(100%-20px)] w-full"
                          preserveAspectRatio="none"
                          viewBox="0 0 100 120"
                        >
                          <polygon
                            points={`0,120 ${svgPoints} 100,120`}
                            fill="url(#fillGrad)"
                          />
                          <polyline
                            points={svgPoints}
                            fill="none"
                            stroke="url(#strokeGrad)"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        {/* Bar chart layer */}
                        <div className="absolute bottom-5 left-0 right-0 flex items-end gap-1.5">
                          {barHeights.map((h, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t bg-gradient-to-t from-violet-400 to-fuchsia-300"
                              style={{ height: `${(h / maxH) * 110}px` }}
                            />
                          ))}
                        </div>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 flex w-full justify-between text-[9px] text-gray-400">
                          {[
                            "00",
                            "02",
                            "04",
                            "06",
                            "08",
                            "10",
                            "12",
                            "14",
                            "16",
                            "18",
                            "20",
                            "22",
                          ].map((t) => (
                            <span key={t}>{t}:00</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── Right Column ── */}
                  <div className="flex w-52 flex-shrink-0 flex-col gap-5">
                    {/* System Status */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <h4 className="text-sm font-semibold text-gray-900">
                        System Status
                      </h4>
                      <div className="mt-4 space-y-3">
                        {[
                          {
                            icon: ShieldCheck,
                            label: "API Gateway",
                            uptime: 99.9,
                            barColor: "bg-green-500",
                          },
                          {
                            icon: Cpu,
                            label: "MQTT Broker",
                            uptime: 98.4,
                            barColor: "bg-green-500",
                          },
                          {
                            icon: Activity,
                            label: "Realtime Engine",
                            uptime: 99.7,
                            barColor: "bg-green-500",
                          },
                          {
                            icon: Wifi,
                            label: "WebSocket Hub",
                            uptime: 97.1,
                            barColor: "bg-yellow-400",
                          },
                        ].map(({ icon: Icon, label, uptime, barColor }, i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100">
                                  <Icon className="h-3 w-3 text-gray-600" />
                                </div>
                                <span className="text-xs text-gray-700">
                                  {label}
                                </span>
                              </div>
                              <span className="text-[10px] font-semibold text-gray-500">
                                {uptime}%
                              </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className={`h-full rounded-full ${barColor}`}
                                style={{ width: `${uptime}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Live Events */}
                    <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-gray-900">
                          Live Events
                        </h4>
                        <div className="flex items-center gap-1 text-[10px] font-medium text-violet-600">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
                          Live
                        </div>
                      </div>

                      <div className="mt-3 flex-1 space-y-3 overflow-hidden">
                        {[
                          {
                            msg: "MQTT client connected",
                            time: "0s ago",
                            dot: "bg-violet-500",
                          },
                          {
                            msg: "Node sync complete",
                            time: "2s ago",
                            dot: "bg-green-500",
                          },
                          {
                            msg: "Stream updated",
                            time: "5s ago",
                            dot: "bg-cyan-500",
                          },
                          {
                            msg: "Auth verified",
                            time: "8s ago",
                            dot: "bg-fuchsia-500",
                          },
                          {
                            msg: "Cluster scaled up",
                            time: "12s ago",
                            dot: "bg-yellow-500",
                          },
                          {
                            msg: "Snapshot persisted",
                            time: "18s ago",
                            dot: "bg-blue-500",
                          },
                        ].map(({ msg, time, dot }, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div
                              className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dot}`}
                            />
                            <div className="min-w-0">
                              <p className="truncate text-xs text-gray-700">
                                {msg}
                              </p>
                              <span className="text-[10px] text-gray-400">
                                {time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
