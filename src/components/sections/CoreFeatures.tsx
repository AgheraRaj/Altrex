import {
  Activity,
  ShieldCheck,
  Radio,
  Cpu,
  BarChart3,
  Globe,
  Layers3,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

const features = [
  {
    icon: Radio,
    title: "Realtime Messaging",
    description:
      "Deliver ultra-low latency communication across distributed systems and connected devices.",
  },

  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description:
      "Built-in authentication, encrypted communication, and secure infrastructure at scale.",
  },

  {
    icon: Cpu,
    title: "IoT Connectivity",
    description:
      "Connect millions of devices using scalable MQTT and WebSocket infrastructure.",
  },

  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "Deploy worldwide with distributed edge-ready realtime architecture.",
  },

  {
    icon: Activity,
    title: "Live Monitoring",
    description:
      "Track metrics, system health, throughput, and realtime performance instantly.",
  },

  {
    icon: Layers3,
    title: "Horizontal Scaling",
    description:
      "Scale seamlessly with high-performance clustering and fault-tolerant systems.",
  },

  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Gain insights with realtime dashboards, event streams, and intelligent metrics.",
  },

  {
    icon: Zap,
    title: "High Performance",
    description:
      "Optimized for speed, reliability, and millions of concurrent realtime operations.",
  },
];

const CoreFeatures = () => {
  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-100/50 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700">
            Core Features
          </Badge>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything You Need to Build
            <span className="block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Modern Realtime Systems
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Powerful infrastructure designed for scalable messaging, IoT
            communication, distributed systems, and realtime applications.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Card
                key={index}
                className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_20px_40px_-15px_rgba(124,58,237,0.1)]"
              >
                {/* Soft gradient blob in corner on hover */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="p-0">
                  {/* Icon */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <CardTitle className="mt-6 text-xl font-semibold text-slate-900 group-hover:text-violet-700 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 mt-3">
                  <CardDescription className="text-sm leading-6 text-slate-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Subtle indicator line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
