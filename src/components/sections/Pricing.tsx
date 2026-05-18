import { Check } from "lucide-react";
import { Badge } from "../ui/badge";

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for startups and small realtime applications.",
    features: [
      "100K Messages / month",
      "Realtime APIs",
      "MQTT Support",
      "Basic Analytics",
      "Email Support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    popular: true,
    description: "Advanced infrastructure for growing realtime platforms.",
    features: [
      "10M Messages / month",
      "Distributed Clustering",
      "Advanced Analytics",
      "WebSocket APIs",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Enterprise-grade infrastructure designed for scale.",
    features: [
      "Unlimited Throughput",
      "Global Infrastructure",
      "Dedicated Clusters",
      "Advanced Security",
      "24/7 Dedicated Support",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-28">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-badge {
          background: linear-gradient(90deg,
            rgba(109,40,217,0.08) 0%,
            rgba(109,40,217,0.18) 40%,
            rgba(109,40,217,0.08) 80%
          );
          background-size: 200% auto;
          animation: shimmer 2.4s linear infinite;
        }
        .pro-glow-light {
          box-shadow:
            0 0 0 1.5px rgba(109,40,217,0.4),
            0 8px 40px rgba(109,40,217,0.12);
        }
      `}</style>

      {/* Ambient glows */}
      <div className="absolute left-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-violet-100/60 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-[350px] w-[350px] rounded-full bg-fuchsia-100/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
          >
            Pricing
          </Badge>
          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Flexible Pricing for{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Modern Infrastructure
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Start free, scale as you grow. No hidden fees.
          </p>

          {/* Monthly / Annual toggle (visual only) */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm">
            <button className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white">
              Monthly
            </button>
            <button className="rounded-full px-5 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
              Annual
              <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-600">
                –20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-violet-300 pro-glow-light"
                  : "border-gray-200 hover:border-violet-200 hover:shadow-lg"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute right-5 top-5">
                  <div className="shimmer-badge rounded-full border border-violet-200 px-4 py-1.5 text-xs font-semibold text-violet-600">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan name */}
              <p className="text-xs font-bold uppercase tracking-widest text-violet-500">
                {plan.name}
              </p>

              {/* Price */}
              <div className="mt-5 flex items-end gap-2">
                <span className="text-6xl font-bold text-gray-900">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="mb-2 text-sm text-gray-400">/ month</span>
                )}
              </div>

              {/* Description */}
              <p className="mt-4 text-sm leading-7 text-gray-500">{plan.description}</p>

              {/* Divider */}
              <div className="my-6 h-px bg-gray-100" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-700">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full ${
                        plan.popular ? "bg-violet-100" : "bg-gray-100"
                      }`}
                    >
                      <Check
                        className={`h-3 w-3 ${plan.popular ? "text-violet-600" : "text-gray-500"}`}
                      />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`mt-8 w-full rounded-2xl px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md hover:opacity-90"
                    : plan.name === "Starter"
                    ? "border border-gray-200 bg-white text-gray-900 hover:border-violet-300 hover:text-violet-700"
                    : "border border-gray-200 bg-white text-gray-900 hover:border-violet-300 hover:text-violet-700"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-center text-sm text-gray-400">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default Pricing;

// DESIGN NOTE: Light gray-50 section with white cards, violet border + glow on Pro card, shimmer "Most Popular" badge adapted for light theme, gradient CTA button on Pro tier.