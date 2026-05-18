import { useEffect, useRef, useState, useCallback } from "react";
import {
  Cpu,
  Wifi,
  Monitor,
  Server,
  Globe,
  BarChart3,
  ShieldCheck,
  BrainCircuit,
  Bell,
  FileText,
  TrendingUp,
  Database,
  Cloud,
  Building2,
  Layers,
  FlaskConical,
  Zap,
  Factory,
  Leaf,
  Radio,
  Wind,
  Sun,
  ChevronRight,
} from "lucide-react";

// ─── Cubic Bezier ─────────────────────────────────────────────────────────────
function cbz(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
): [number, number] {
  const m = 1 - t;
  return [
    m * m * m * p0[0] +
      3 * m * m * t * p1[0] +
      3 * m * t * t * p2[0] +
      t * t * t * p3[0],
    m * m * m * p0[1] +
      3 * m * m * t * p1[1] +
      3 * m * t * t * p2[1] +
      t * t * t * p3[1],
  ];
}

interface Beam {
  id: number;
  pi: number;
  t: number;
  speed: number;
  color: string;
  r: number;
}

// SVG viewBox: 1400 × 640
// Layout zones (x centers):
//   Industries col:   x≈70   (left border)
//   Devices col:      x≈210
//   Connectivity:     x≈400
//   Platform cloud:   x≈800  (wide zone 560–1040)
//   Hosting:          x≈1000
//   Enterprise row:   y≈580  (below cloud)

// Key anchor points
const IND_R = 145; // right edge of Industries col
const DEV_L = 180; // left edge of Devices col
const DEV_R = 310; // right edge of Devices col
const CON_L = 345; // left edge of Connectivity box
const CON_R = 495; // right edge of Connectivity box
const CLOUD_L = 555; // left edge of cloud zone
const FEAT_CX = 790; // center of features grid
const HOST_CX = 990; // center of hosting
const ENT_Y = 585; // y of enterprise row

// Connector paths: [from, to, color]
const RAW_PATHS: Array<{
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
  color: string;
}> = [
  // Industries → Devices (3 horizontal arrows)
  {
    p0: [IND_R, 185],
    p1: [IND_R + 25, 185],
    p2: [DEV_L - 25, 185],
    p3: [DEV_L, 185],
    color: "#f97316",
  },
  {
    p0: [IND_R, 295],
    p1: [IND_R + 25, 295],
    p2: [DEV_L - 25, 295],
    p3: [DEV_L, 295],
    color: "#f97316",
  },
  {
    p0: [IND_R, 405],
    p1: [IND_R + 25, 405],
    p2: [DEV_L - 25, 405],
    p3: [DEV_L, 405],
    color: "#f97316",
  },
  // Devices → Connectivity (3 horizontal arrows)
  {
    p0: [DEV_R, 185],
    p1: [DEV_R + 20, 185],
    p2: [CON_L - 20, 200],
    p3: [CON_L, 200],
    color: "#f97316",
  },
  {
    p0: [DEV_R, 295],
    p1: [DEV_R + 20, 295],
    p2: [CON_L - 20, 295],
    p3: [CON_L, 295],
    color: "#f97316",
  },
  {
    p0: [DEV_R, 405],
    p1: [DEV_R + 20, 405],
    p2: [CON_L - 20, 390],
    p3: [CON_L, 390],
    color: "#f97316",
  },
  // Connectivity → Platform cloud (into features)
  {
    p0: [CON_R, 240],
    p1: [CON_R + 40, 240],
    p2: [CLOUD_L - 30, 220],
    p3: [CLOUD_L, 220],
    color: "#6366f1",
  },
  {
    p0: [CON_R, 295],
    p1: [CON_R + 40, 295],
    p2: [CLOUD_L - 30, 295],
    p3: [CLOUD_L, 295],
    color: "#8b5cf6",
  },
  {
    p0: [CON_R, 350],
    p1: [CON_R + 40, 350],
    p2: [CLOUD_L - 30, 370],
    p3: [CLOUD_L, 370],
    color: "#a855f7",
  },
  // Platform → Enterprise (3 arrows going down)
  {
    p0: [680, 490],
    p1: [680, 530],
    p2: [660, 555],
    p3: [660, 575],
    color: "#f97316",
  },
  {
    p0: [790, 490],
    p1: [790, 535],
    p2: [790, 555],
    p3: [790, 575],
    color: "#f97316",
  },
  {
    p0: [900, 490],
    p1: [900, 530],
    p2: [920, 555],
    p3: [920, 575],
    color: "#f97316",
  },
];

// Beam Overlay Component
const BeamOverlay = () => {
  const [beams, setBeams] = useState<Beam[]>([]);
  const idRef = useRef(0);
  const livRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);

  const spawn = useCallback(() => {
    const pi = Math.floor(Math.random() * RAW_PATHS.length);
    const b: Beam = {
      id: idRef.current++,
      pi,
      t: 0,
      speed: 0.003 + Math.random() * 0.004,
      color: RAW_PATHS[pi].color,
      r: 2.5 + Math.random() * 2,
    };
    livRef.current = [...livRef.current, b];
  }, []);

  useEffect(() => {
    RAW_PATHS.forEach((_, i) => setTimeout(spawn, i * 220));
    const iv = setInterval(spawn, 480);
    const tick = () => {
      livRef.current = livRef.current
        .map((b) => ({ ...b, t: b.t + b.speed }))
        .filter((b) => b.t <= 1.03);
      setBeams([...livRef.current]);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(iv);
    };
  }, [spawn]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full"
      viewBox="0 0 1400 640"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      {/* Static gray tracks */}
      {RAW_PATHS.map((p, i) => (
        <path
          key={`tk${i}`}
          d={`M${p.p0[0]} ${p.p0[1]} C${p.p1[0]} ${p.p1[1]},${p.p2[0]} ${p.p2[1]},${p.p3[0]} ${p.p3[1]}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
      ))}

      {/* Arrowheads at endpoints */}
      {RAW_PATHS.map((p, i) => {
        const [x, y] = p.p3;
        return (
          <polygon
            key={`ah${i}`}
            points={`${x},${y} ${x - 8},${y - 4} ${x - 8},${y + 4}`}
            fill="#e2e8f0"
          />
        );
      })}

      {/* Animated beams */}
      {beams.map((beam) => {
        const p = RAW_PATHS[beam.pi];
        const t = Math.min(beam.t, 1);
        const [cx, cy] = cbz(t, p.p0, p.p1, p.p2, p.p3);
        const t0 = Math.max(0, t - 0.09);
        const [tx, ty] = cbz(t0, p.p0, p.p1, p.p2, p.p3);
        return (
          <g key={beam.id}>
            <circle
              cx={cx}
              cy={cy}
              r={beam.r * 3.2}
              fill={beam.color}
              opacity={0.12}
            />
            <circle
              cx={cx}
              cy={cy}
              r={beam.r * 1.8}
              fill={beam.color}
              opacity={0.35}
            />
            <circle cx={cx} cy={cy} r={beam.r} fill={beam.color} />
            <circle
              cx={cx}
              cy={cy}
              r={beam.r * 0.4}
              fill="white"
              opacity={0.9}
            />
            <line
              x1={tx}
              y1={ty}
              x2={cx}
              y2={cy}
              stroke={beam.color}
              strokeWidth={beam.r * 0.65}
              strokeLinecap="round"
              opacity={0.4}
            />
          </g>
        );
      })}
    </svg>
  );
};

// ─── Main Architecture Section ────────────────────────────────────────────────
const Architecture = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .arch-section { font-family:'DM Sans',system-ui,sans-serif; }

        @keyframes shimmer-heading {
          0%   { background-position:-200% center }
          100% { background-position: 200% center }
        }
        .shimmer-heading {
          background: linear-gradient(90deg,#1e40af 20%,#7c3aed 45%,#db2777 55%,#1e40af 80%);
          background-size:200% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation: shimmer-heading 4s linear infinite;
        }

        @keyframes pulse-cloud {
          0%,100% { opacity:0.06 }
          50%      { opacity:0.12 }
        }
        .cloud-pulse { animation: pulse-cloud 4s ease-in-out infinite; }

        .ind-card, .dev-card, .con-card, .feat-card, .host-card, .ent-card {
          background:#ffffff;
          border:1px solid #e2e8f0;
          transition: all 0.22s ease;
        }
        .ind-card:hover, .dev-card:hover, .feat-card:hover, .host-card:hover, .ent-card:hover {
          border-color:#c7d2fe;
          box-shadow: 0 0 0 1px #c7d2fe50, 0 4px 20px #6366f112;
          transform: translateY(-2px);
        }
        .con-card {
          background: linear-gradient(135deg,#fdf4ff,#f5f3ff);
          border: 1px solid #e9d5ff;
        }
        .platform-cloud {
          background: linear-gradient(140deg,#f0f4ff 0%,#faf5ff 40%,#fff0fb 100%);
          border: 1.5px solid #e0e7ff;
          box-shadow: 0 8px 48px #6366f10c, 0 2px 8px #00000008;
        }

        @keyframes chip-glow {
          0%,100% { box-shadow: 0 0 0 0 #6366f120, 0 4px 24px #6366f10f }
          50%      { box-shadow: 0 0 0 6px #6366f108, 0 4px 32px #6366f120 }
        }
        .chip-node { animation: chip-glow 3s ease-in-out infinite; }

        .section-label {
          font-size:11px; font-weight:600; letter-spacing:0.1em;
          text-transform:uppercase; color:#94a3b8;
        }

        @keyframes float-col {
          0%,100% { transform:translateY(0) }
          50%      { transform:translateY(-5px) }
        }
        .float-a { animation: float-col 5s ease-in-out infinite }
        .float-b { animation: float-col 5s ease-in-out infinite; animation-delay:1s }
        .float-c { animation: float-col 5s ease-in-out infinite; animation-delay:2s }
        .float-d { animation: float-col 5s ease-in-out infinite; animation-delay:0.5s }
      `}</style>

      {/* bg tints */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          style={{
            position: "absolute",
            left: "35%",
            top: "-80px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle,#e0e7ff 0%,transparent 70%)",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "5%",
            bottom: "0",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle,#fce7f3 0%,transparent 70%)",
            opacity: 0.6,
          }}
        />
      </div>

      <div className="mx-auto max-w-[1400px] px-4 lg:px-8 arch-section">
        {/* ── Header ── */}
        <div className="mb-14 text-center">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#f1f5ff",
              border: "1px solid #c7d2fe",
              borderRadius: "999px",
              padding: "6px 16px",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#6366f1",
                display: "inline-block",
                boxShadow: "0 0 8px #6366f180",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#4f46e5",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Platform Architecture
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(28px,3vw,42px)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#0f172a",
              margin: "0 0 16px",
            }}
          >
            Built for{" "}
            <span className="shimmer-heading">
              Industrial IoT Infrastructure
            </span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "#64748b",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            End-to-end connectivity from field devices to enterprise systems —
            with realtime SCADA, analytics, and cloud hosting.
          </p>
        </div>

        {/* ── Main Diagram ── */}
        <div className="relative hidden lg:block" style={{ minHeight: 660 }}>
          <BeamOverlay />

          {/* ════ 5-COLUMN LAYOUT ════ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "130px 160px 175px 1fr 165px",
              gap: "18px",
              alignItems: "center",
              minHeight: 520,
              position: "relative",
              zIndex: 10,
            }}
          >
            {/* ── COL 1: Industries ── */}
            <div
              className="float-a"
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              <div
                className="section-label"
                style={{ textAlign: "center", marginBottom: 6 }}
              >
                Industries
              </div>
              {[
                { icon: FlaskConical, label: "Oil & Gas", color: "#f97316" },
                { icon: Factory, label: "Manufacturing", color: "#f97316" },
                { icon: Wind, label: "Energy", color: "#f97316" },
                { icon: Sun, label: "Renewables", color: "#f97316" },
                { icon: Building2, label: "Utilities", color: "#f97316" },
                { icon: Leaf, label: "Water", color: "#f97316" },
                { icon: Zap, label: "Power Grid", color: "#f97316" },
              ].map(({ icon: Icon, label, color }, i) => (
                <div
                  key={i}
                  className="ind-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    borderRadius: 10,
                    padding: "7px 10px",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      flexShrink: 0,
                      background: `${color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={14} color={color} />
                  </div>
                  <span
                    style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── COL 2: Devices ── */}
            <div
              className="float-b"
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div
                className="section-label"
                style={{ textAlign: "center", marginBottom: 6 }}
              >
                Devices
              </div>
              {[
                { icon: Cpu, label: "PLCs / RTUs", sub: "Field Controllers" },
                { icon: Radio, label: "Sensors", sub: "Rectifiers" },
                {
                  icon: Monitor,
                  label: "HMIs",
                  sub: "Human-Machine Interface",
                },
                { icon: Layers, label: "SCADA / DCS", sub: "Control Systems" },
                { icon: Globe, label: "Others", sub: "3rd-party Devices" },
              ].map(({ icon: Icon, label, sub }, i) => (
                <div
                  key={i}
                  className="dev-card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 12,
                    padding: "10px 12px",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      flexShrink: 0,
                      background: "linear-gradient(135deg,#fff7ed,#ffedd5)",
                      border: "1px solid #fed7aa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={15} color="#ea580c" />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#1e293b",
                        margin: 0,
                      }}
                    >
                      {label}
                    </p>
                    <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── COL 3: Connectivity ── */}
            <div
              className="float-c"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div
                className="section-label"
                style={{ textAlign: "center", marginBottom: 8 }}
              >
                Connectivity
              </div>
              <div
                className="con-card chip-node"
                style={{
                  borderRadius: 16,
                  padding: "20px 16px",
                  textAlign: "center",
                }}
              >
                {/* Mini chip icon */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    margin: "0 auto 14px",
                    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px #7c3aed30",
                  }}
                >
                  <Wifi size={18} color="white" />
                </div>
                {/* Circuit grid texture */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    pointerEvents: "none",
                    opacity: 0.04,
                    backgroundImage:
                      "repeating-linear-gradient(0deg,#7c3aed 0,transparent 1px,transparent 14px),repeating-linear-gradient(90deg,#7c3aed 0,transparent 1px,transparent 14px)",
                  }}
                />
                <div style={{ position: "relative" }}>
                  {[
                    "MODBUS",
                    "OPC UA/DA",
                    "Ethernet",
                    "ProfiNet",
                    "Ethernet/IP",
                    "MQTT",
                    "REST API",
                    "SQL/no-SQL DBs",
                  ].map((p, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#4f46e5",
                        padding: "4px 0",
                        borderBottom: i < 7 ? "1px solid #ede9fe" : "none",
                      }}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── COL 4: Platform Cloud (wide) ── */}
            <div className="float-d" style={{ position: "relative" }}>
              <div
                className="section-label"
                style={{ textAlign: "center", marginBottom: 8 }}
              >
                Platform
              </div>
              <div
                className="platform-cloud"
                style={{
                  borderRadius: 24,
                  padding: "22px 20px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Cloud decoration */}
                <div
                  className="cloud-pulse"
                  style={{
                    position: "absolute",
                    top: -40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 500,
                    height: 260,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,#c7d2fe,#e9d5ff,#fce7f3)",
                    filter: "blur(40px)",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Features grid 3×3 */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    {[
                      {
                        icon: Globe,
                        label: "Web-based SCADA",
                        color: "#2563eb",
                      },
                      {
                        icon: BarChart3,
                        label: "Data Visualization",
                        color: "#7c3aed",
                      },
                      {
                        icon: Bell,
                        label: "Alert & Notification",
                        color: "#dc2626",
                      },
                      {
                        icon: Database,
                        label: "Asset Management",
                        color: "#059669",
                      },
                      {
                        icon: TrendingUp,
                        label: "Data Analytics",
                        color: "#d97706",
                      },
                      { icon: FileText, label: "Reporting", color: "#0891b2" },
                      {
                        icon: ShieldCheck,
                        label: "Data Security",
                        color: "#7c3aed",
                      },
                      {
                        icon: BrainCircuit,
                        label: "AI & ML",
                        color: "#db2777",
                      },
                    ].map(({ icon: Icon, label, color }, i) => (
                      <div
                        key={i}
                        className="feat-card"
                        style={{
                          borderRadius: 12,
                          padding: "12px 10px",
                          textAlign: "center",
                          border: `1px solid ${color}20`,
                          background: `linear-gradient(135deg,${color}06,${color}02)`,
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 8,
                            background: `${color}15`,
                            margin: "0 auto 8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon size={16} color={color} />
                        </div>
                        <p
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#1e293b",
                            lineHeight: 1.3,
                            margin: 0,
                          }}
                        >
                          {label}
                        </p>
                      </div>
                    ))}
                    {/* filler for 3×3 = 9 cells, 8 features → add empty */}
                    <div
                      style={{ borderRadius: 12, background: "transparent" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── COL 5: Hosting ── */}
            <div
              className="float-b"
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div
                className="section-label"
                style={{ textAlign: "center", marginBottom: 6 }}
              >
                Hosting
              </div>
              {[
                {
                  icon: Server,
                  label: "On-Premise Server",
                  desc: "Local infrastructure",
                  grad: "from-slate-600 to-slate-500",
                  gbg: "#f8fafc",
                  gc: "#475569",
                },
                {
                  icon: Cloud,
                  label: "Private / Public Cloud",
                  desc: "AWS · Azure · GCP",
                  grad: "from-blue-600 to-indigo-500",
                  gbg: "#eff6ff",
                  gc: "#2563eb",
                },
              ].map(({ icon: Icon, label, desc, gbg, gc }, i) => (
                <div
                  key={i}
                  className="host-card"
                  style={{
                    borderRadius: 14,
                    padding: "16px 14px",
                    textAlign: "center",
                    background: gbg,
                    border: `1px solid ${gc}22`,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${gc}18`,
                      margin: "0 auto 10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} color={gc} />
                  </div>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#1e293b",
                      margin: "0 0 4px",
                      lineHeight: 1.3,
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise row (SAP ERP CRM) INSIDE cloud at bottom */}
        <div style={{ display: "flex", gap: 20, justifyContent: "center" }} className="relative bottom-20 left-20">
          {[
            { label: "SAP", color: "#0ea5e9", bg: "#f0f9ff" },
            { label: "ERP", color: "#f97316", bg: "#fff7ed" },
            { label: "CRM", color: "#ec4899", bg: "#fdf2f8" },
          ].map(({ label, color, bg }, i) => (
            <div
              key={i}
              className="ent-card"
              style={{
                borderRadius: 12,
                padding: "14px 24px",
                textAlign: "center",
                border: `1.5px solid ${color}30`,
                background: `linear-gradient(135deg,${bg},white)`,
                minWidth: 80,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: `2px solid ${color}`,
                  margin: "0 auto 6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color,
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  {label}
                </span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#475569" }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Mobile Fallback ── */}
        <div className="block lg:hidden space-y-4 mt-6">
          {[
            {
              icon: Factory,
              title: "Industries",
              desc: "Oil & Gas, Energy, Manufacturing, Utilities",
            },
            {
              icon: Cpu,
              title: "Field Devices",
              desc: "PLCs, RTUs, Sensors, HMIs, SCADA/DCS",
            },
            {
              icon: Wifi,
              title: "Connectivity",
              desc: "MODBUS, MQTT, OPC UA, REST API, Ethernet",
            },
            {
              icon: Globe,
              title: "W·Platform",
              desc: "SCADA, Analytics, AI/ML, Alerts, Reporting",
            },
            {
              icon: Cloud,
              title: "Hosting",
              desc: "On-Premise Server · Private/Public Cloud",
            },
            {
              icon: Database,
              title: "Enterprise",
              desc: "SAP · ERP · CRM Integration",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  flexShrink: 0,
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={18} color="white" />
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    color: "#1e293b",
                    margin: "0 0 2px",
                    fontSize: 14,
                  }}
                >
                  {title}
                </p>
                <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom stat bar ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 16,
            marginTop: 48,
          }}
          className="hidden lg:grid"
        >
          {[
            { val: "500+", label: "Industrial Protocols", color: "#6366f1" },
            { val: "99.9%", label: "Platform Uptime", color: "#059669" },
            { val: "<50ms", label: "Realtime Latency", color: "#f97316" },
            { val: "120+", label: "Global Edge Regions", color: "#0891b2" },
          ].map(({ val, label, color }, i) => (
            <div
              key={i}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "18px",
                textAlign: "center",
                transition: "all .2s",
              }}
            >
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color,
                  margin: "0 0 4px",
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                {val}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Architecture;
