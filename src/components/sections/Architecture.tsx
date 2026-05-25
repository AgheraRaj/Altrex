import { useEffect, memo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Position,
  Handle,
  BaseEdge,
  getSmoothStepPath,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import {
  Building2,
  BriefcaseBusiness,
  Car,
  Cloud,
  Cpu,
  Database,
  Factory,
  FlaskConical,
  Globe,
  HeartPulse,
  Layers3,
  Monitor,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Users,
  Wifi,
  Zap,
} from "lucide-react";

import { Badge } from "../ui/badge";

/* ─── Color Tokens ───────────────────────────────────────────────────────── */

const C = {
  violet:  "#8b5cf6",
  fuchsia: "#d946ef",
  cyan:    "#06b6d4",
  orange:  "#f97316",
} as const;

// Pre-defined edge animation durations (avoids Math.random() in render)
const EDGE_DURATIONS: Record<string, number> = {
  "ind-dev-0":   4.2,
  "ind-dev-1":   5.0,
  "ind-dev-2":   4.6,
  "ind-dev-3":   5.4,
  "ind-dev-4":   4.8,
  "ind-dev-5":   5.2,
  "ind-dev-6":   4.4,
  "dev-con":     4.5,
  "con-plat":    5.1,
  "plat-host-1": 4.7,
  "plat-host-2": 5.3,
  "plat-sap":    4.9,
  "plat-erp":    5.5,
  "plat-crm":    4.3,
};

/* ─── Data ───────────────────────────────────────────────────────────────── */

const industries = [
  { icon: Factory,          label: "Oil & Gas" },
  { icon: Building2,        label: "Power & Energy" },
  { icon: Zap,              label: "Renewables" },
  { icon: FlaskConical,     label: "Manufacturing" },
  { icon: Car,              label: "Transportation" },
  { icon: HeartPulse,       label: "Healthcare" },
  { icon: Globe,            label: "Smart Cities" },
];

const devices = [
  { icon: Cpu,     label: "PLCs / RTUs" },
  { icon: Wifi,    label: "Sensors / Rectifiers" },
  { icon: Monitor, label: "HMIs" },
  { icon: Layers3, label: "SCADA / DCS" },
];

const connectivity = [
  "MODBUS",
  "OPC UA / DA",
  "Ethernet",
  "ProfiNet",
  "Ethernet/IP",
  "MQTT",
  "REST API",
  "SQL / NoSQL DB",
];

const platform = [
  { icon: Globe,        label: "Web-based SCADA" },
  { icon: Database,     label: "Data Visualization" },
  { icon: ShieldCheck,  label: "Alert & Notification" },
  { icon: Layers3,      label: "Asset Management" },
  { icon: Network,      label: "Reporting" },
  { icon: ShieldCheck,  label: "Data Security" },
  { icon: Radio,        label: "Data Analytics" },
  { icon: Cpu,          label: "AI & ML" },
];

const hosting = [
  { icon: Server, label: "On-Premise Server" },
  { icon: Cloud,  label: "Private / Public Cloud" },
];

/* ─── Global Flow Styles ─────────────────────────────────────────────────── */

function useFlowStyles() {
  useEffect(() => {
    const STYLE_ID = "arch-flow-styles-light";
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      .arch-flow .react-flow__node         { cursor: grab; }
      .arch-flow .react-flow__node:active  { cursor: grabbing; }
      .arch-flow .react-flow__attribution  { display: none !important; }
      .arch-flow .react-flow__renderer     { background: transparent !important; }

      @keyframes beam-flow {
        from { stroke-dashoffset: 120; }
        to   { stroke-dashoffset: 0;   }
      }
    `;
    document.head.appendChild(style);
  }, []);
}

/* ─── Animated Edge ──────────────────────────────────────────────────────── */

const AnimatedEdge = memo(function AnimatedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const color    = (data?.color as string) ?? C.violet;
  const duration = EDGE_DURATIONS[id] ?? 5;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 30,
  });

  return (
    <>
      {/* Dim static track */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: color, strokeWidth: 1.5, strokeOpacity: 0.12 }}
      />

      {/* Travelling animated beam */}
      <path
        d={edgePath}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{
          strokeDasharray:  "5 8",
          strokeDashoffset: 120,
          animation: `beam-flow ${duration}s linear infinite`,
          filter: `drop-shadow(0 0 4px ${color}80)`,
        }}
      />
    </>
  );
});

/* ─── Item Node ──────────────────────────────────────────────────────────── */

function ItemNode({ data }: NodeProps<any>) {
  const Icon  = data.icon;
  const color = (data.color as string) ?? C.violet;

  return (
    <div
      style={{
        background:   "#ffffff",
        border:       `1px solid ${color}30`,
        borderRadius: 16,
        padding:      "10px 14px",
        minWidth:     180,
        display:      "flex",
        alignItems:   "center",
        gap:          10,
        boxShadow:    `0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px ${color}08`,
        transition:   "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${color}70`;
        el.style.boxShadow   = `0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px ${color}20`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = `${color}30`;
        el.style.boxShadow   = `0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px ${color}08`;
      }}
    >
      {/* Tinted icon badge */}
      <div
        style={{
          width:          34,
          height:         34,
          borderRadius:   10,
          background:     `${color}12`,
          border:         `1px solid ${color}20`,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
        }}
      >
        {Icon && <Icon size={15} color={color} strokeWidth={1.8} />}
      </div>

      <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
        {data.label}
      </span>

      <Handle type="target" position={Position.Left}  style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      {/* Top handle — used by enterprise nodes (SAP/ERP/CRM) as edge target */}
      <Handle type="target" position={Position.Top}   style={{ opacity: 0 }} id="top" />
    </div>
  );
}

/* ─── Block Node ─────────────────────────────────────────────────────────── */

function BlockNode({ data }: NodeProps<any>) {
  const color = (data.color as string) ?? C.violet;

  return (
    <div
      style={{
        width:      data.width ?? 240,
        background: "#ffffff",
        border:     `1px solid ${color}20`,
        borderTop:  `3px solid ${color}`,
        borderRadius: 20,
        padding:    18,
        boxShadow:  `0 4px 20px rgba(0,0,0,0.06), 0 0 0 1px ${color}08`,
      }}
    >
      {/* Block title */}
      <p
        style={{
          textAlign:     "center",
          fontSize:      10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontWeight:    700,
          marginBottom:  14,
          color:         color,
        }}
      >
        {data.title}
      </p>

      {/* Connectivity variant: vertical pill list */}
      {data.variant === "connectivity" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {(data.items as string[]).map((item, i) => (
            <div
              key={i}
              style={{
                padding:      "7px 12px",
                borderRadius: 10,
                textAlign:    "center",
                fontSize:     11,
                fontWeight:   600,
                color:        color,
                background:   `${color}08`,
                border:       `1px solid ${color}18`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Platform / Devices variant: 2-column icon grid */}
      {data.variant === "platform" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
          {(data.items as { icon: any; label: string }[]).map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{
                  borderRadius:  13,
                  background:    "#faf5ff",
                  border:        "1px solid #ede9fe",
                  padding:       "11px 8px",
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                  gap:           7,
                }}
              >
                <div
                  style={{
                    width:          30,
                    height:         30,
                    borderRadius:   8,
                    background:     `${color}12`,
                    border:         `1px solid ${color}22`,
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={13} color={color} strokeWidth={1.8} />
                </div>

                <span
                  style={{
                    fontSize:   9.5,
                    textAlign:  "center",
                    lineHeight: 1.35,
                    fontWeight: 600,
                    color:      "#4b5563",
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <Handle type="target" position={Position.Left}   style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right}  style={{ opacity: 0 }} />
      {/* Bottom handle — used for platform → SAP/ERP/CRM edges */}
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} id="bottom" />
    </div>
  );
}

/* ─── Node + Edge Type Registry ──────────────────────────────────────────── */

const nodeTypes = { item: ItemNode, block: BlockNode };
const edgeTypes = { animated: AnimatedEdge };

/* ─── Node Positions ─────────────────────────────────────────────────────── */
//
//  Canvas is 820px tall, 1650px wide (wrapper max-width minus padding).
//  Column x ranges:
//    Industries:   x=20,   node width ~190  → right edge ~210
//    Devices:      x=310,  node width  230  → right edge  540
//    Connectivity: x=620,  node width  220  → right edge  840
//    Platform:     x=940,  node width  310  → right edge 1250
//    Hosting:      x=1290, node width ~190  → right edge 1480  ✓ fits
//    Enterprise:   y=590 (below platform, centred under it)
//
const NODES: Node[] = [
  // Industries — left column
  ...industries.map((item, i) => ({
    id:       `industry-${i}`,
    type:     "item" as const,
    position: { x: 20, y: 90 + i * 88 },
    data:     { ...item, color: C.violet },
  })),

  // Devices block
  {
    id:       "devices",
    type:     "block" as const,
    position: { x: 310, y: 140 },
    data:     { title: "Devices", color: C.violet, items: devices, width: 230, variant: "platform" },
  },

  // Connectivity block
  {
    id:       "connectivity",
    type:     "block" as const,
    position: { x: 620, y: 110 },
    data:     { title: "Connectivity", color: C.fuchsia, items: connectivity, width: 220, variant: "connectivity" },
  },

  // Platform block — shifted left so hosting fits inside canvas
  {
    id:       "platform",
    type:     "block" as const,
    position: { x: 940, y: 60 },
    data:     { title: "WV Platform", color: C.violet, items: platform, width: 310, variant: "platform" },
  },

  // Hosting — right column, x adjusted so right edge ≤ 1480 (fits 1650px canvas)
  ...hosting.map((item, i) => ({
    id:       `hosting-${i}`,
    type:     "item" as const,
    position: { x: 1370, y: 160 + i * 150 },
    data:     { ...item, color: C.cyan },
  })),

  // Enterprise integrations — below platform, connected via bottom handle
  // Icons added: SAP → BriefcaseBusiness, ERP → Database, CRM → Users
  {
    id:       "sap",
    type:     "item" as const,
    position: { x: 850,  y: 590 },
    data:     { icon: BriefcaseBusiness, label: "SAP", color: C.cyan },
  },
  {
    id:       "erp",
    type:     "item" as const,
    position: { x: 1050, y: 590 },
    data:     { icon: Database, label: "ERP", color: C.orange },
  },
  {
    id:       "crm",
    type:     "item" as const,
    position: { x: 1250, y: 590 },
    data:     { icon: Users, label: "CRM", color: C.fuchsia },
  },
];

/* ─── Edge Definitions ───────────────────────────────────────────────────── */

const EDGES: Edge[] = [
  // Industries → Devices
  ...industries.map((_, i) => ({
    id:     `ind-dev-${i}`,
    source: `industry-${i}`,
    target: "devices",
    type:   "animated" as const,
    data:   { color: C.violet },
  })),

  // Devices → Connectivity
  { id: "dev-con",  source: "devices",      target: "connectivity", type: "animated", data: { color: C.violet  } },

  // Connectivity → Platform
  { id: "con-plat", source: "connectivity", target: "platform",     type: "animated", data: { color: C.fuchsia } },

  // Platform → Hosting (right handle → left handle, horizontal flow)
  { id: "plat-host-1", source: "platform", target: "hosting-0", type: "animated", data: { color: C.cyan } },
  { id: "plat-host-2", source: "platform", target: "hosting-1", type: "animated", data: { color: C.cyan } },

  // Platform bottom handle → SAP/ERP/CRM top handle (vertical drop)
  {
    id:           "plat-sap",
    source:       "platform",
    sourceHandle: "bottom",
    target:       "sap",
    targetHandle: "top",
    type:         "animated",
    data:         { color: C.cyan },
  },
  {
    id:           "plat-erp",
    source:       "platform",
    sourceHandle: "bottom",
    target:       "erp",
    targetHandle: "top",
    type:         "animated",
    data:         { color: C.orange },
  },
  {
    id:           "plat-crm",
    source:       "platform",
    sourceHandle: "bottom",
    target:       "crm",
    targetHandle: "top",
    type:         "animated",
    data:         { color: C.fuchsia },
  },
];

/* ─── Layer Label Overlay ────────────────────────────────────────────────── */

const LAYER_LABELS = [
  { label: "Industries",   left: "1.5%",  color: C.violet  },
  { label: "Devices",      left: "19.5%", color: C.violet  },
  { label: "Connectivity", left: "38.5%", color: C.fuchsia },
  { label: "Platform",     left: "57%",   color: C.violet  },
  { label: "Deployment",   left: "78%",   color: C.cyan    },
];

function LayerLabels() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-5">
      {LAYER_LABELS.map(({ label, left, color }) => (
        <div
          key={label}
          style={{ position: "absolute", left, display: "flex", alignItems: "center", gap: 6 }}
        >
          <span
            style={{
              width:        6,
              height:       6,
              borderRadius: "50%",
              background:   color,
              flexShrink:   0,
              display:      "inline-block",
            }}
          />
          <span
            style={{
              fontSize:      9,
              fontWeight:    700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         color,
              opacity:       0.75,
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── Architecture Section ───────────────────────────────────────────────── */

const Architecture = () => {
  useFlowStyles();

  const [flowNodes, , onNodesChange] = useNodesState(NODES);
  const [flowEdges, , onEdgesChange] = useEdgesState(EDGES);

  return (
    <section className="relative overflow-hidden bg-white py-28">

      {/* Soft background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-fuchsia-100/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1650px] px-6">

        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="border border-violet-200 bg-violet-50 p-4 text-sm font-medium text-violet-700"
          >
            Realtime Architecture
          </Badge>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Built for Distributed{" "}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Global Infrastructure
            </span>
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-500">
            From industrial devices to cloud — every layer connected, secured, and orchestrated in realtime.
          </p>
        </div>

        {/* Flow canvas */}
        <div
          className="relative mt-20 overflow-hidden rounded-xl border border-violet-100"
          style={{
            height:     820,
            boxShadow:  "0 0 80px rgba(139,92,246,0.07), 0 4px 40px rgba(0,0,0,0.05)",
          }}
        >
          {/* Top decorative line */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(217,70,239,0.3), transparent)" }}
          />

          <LayerLabels />

          <ReactFlow
            className="arch-flow"
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            panOnDrag={false}
            panOnScroll={false}
            preventScrolling={true}
            minZoom={1}
            maxZoom={1}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            nodesDraggable
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={28}
              size={1.2}
              color="rgba(139,92,246,0.10)"
            />
          </ReactFlow>

          {/* Bottom decorative line */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)" }}
          />
        </div>

      </div>
    </section>
  );
};

export default Architecture;