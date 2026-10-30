// Hand-laid system diagrams. Each diagram has a desktop and a mobile layout, drawn as
// plain SVG so there is no client JS. Geometry is explicit: no auto-layout, no surprises.

export interface DNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string[];
  accent?: boolean;
  dashed?: boolean;
}

/** Straight arrow between two facing node edges. `at` pins the cross-axis coordinate. */
export interface DEdge {
  from: string;
  to: string;
  at?: number;
  dashed?: boolean;
}

/** One-to-many: a line out of `from`, a bus, then an arrow into each target. */
export interface DFan {
  from: string;
  to: string[];
  dashed?: string[];
}

export interface Layout {
  width: number;
  height: number;
  nodes: DNode[];
  edges: DEdge[];
  fans: DFan[];
}

export interface DiagramDef {
  label: string;
  desktop: Layout;
  mobile: Layout;
}

export type DiagramKey = "dloudos" | "prompt-router" | "secretfix";

export interface DrawnPath {
  d: string;
  arrow: boolean;
  dashed: boolean;
}

export interface DrawnNode extends DNode {
  lines: { text: string; y: number; kind: "title" | "sub" }[];
}

export interface Drawn {
  width: number;
  height: number;
  nodes: DrawnNode[];
  paths: DrawnPath[];
}

const TITLE_LH = 20;
const SUB_LH = 17;
const PAD_X = 16;
const GAP = 1; // arrow tips stop 1px short of the target edge

function node(layout: Layout, id: string): DNode {
  const found = layout.nodes.find((n) => n.id === id);
  if (!found) throw new Error(`diagram: unknown node "${id}"`);
  return found;
}

function straight(layout: Layout, edge: DEdge): DrawnPath {
  const a = node(layout, edge.from);
  const b = node(layout, edge.to);
  const acx = a.x + a.w / 2;
  const acy = a.y + a.h / 2;
  const bcx = b.x + b.w / 2;
  const bcy = b.y + b.h / 2;
  const horizontal = Math.abs(acy - bcy) < Math.abs(acx - bcx);
  let d: string;
  if (horizontal) {
    const y = edge.at ?? acy;
    d = bcx >= acx
      ? `M${a.x + a.w} ${y} H${b.x - GAP}`
      : `M${a.x} ${y} H${b.x + b.w + GAP}`;
  } else {
    const x = edge.at ?? acx;
    d = bcy >= acy
      ? `M${x} ${a.y + a.h} V${b.y - GAP}`
      : `M${x} ${a.y} V${b.y + b.h + GAP}`;
  }
  return { d, arrow: true, dashed: edge.dashed ?? false };
}

function fan(layout: Layout, f: DFan): DrawnPath[] {
  const a = node(layout, f.from);
  const targets = f.to.map((id) => node(layout, id));
  const x1 = a.x + a.w;
  const y1 = a.y + a.h / 2;
  const minLeft = Math.min(...targets.map((t) => t.x));
  const busX = x1 + (minLeft - x1) / 2;
  const ys = targets.map((t) => t.y + t.h / 2);
  const top = Math.min(...ys, y1);
  const bottom = Math.max(...ys, y1);
  const out: DrawnPath[] = [
    { d: `M${x1} ${y1} H${busX}`, arrow: false, dashed: false },
    { d: `M${busX} ${top} V${bottom}`, arrow: false, dashed: false },
  ];
  targets.forEach((t, i) => {
    const y = ys[i] ?? y1;
    out.push({ d: `M${busX} ${y} H${t.x - GAP}`, arrow: true, dashed: f.dashed?.includes(t.id) ?? false });
  });
  return out;
}

export function draw(layout: Layout): Drawn {
  const nodes: DrawnNode[] = layout.nodes.map((n) => {
    const total = TITLE_LH + SUB_LH * n.sub.length;
    const top = n.y + (n.h - total) / 2;
    const lines: DrawnNode["lines"] = [{ text: n.title, y: top + 15, kind: "title" }];
    n.sub.forEach((text, i) => lines.push({ text, y: top + TITLE_LH + SUB_LH * i + 13, kind: "sub" }));
    return { ...n, lines };
  });
  const paths = [
    ...layout.edges.map((e) => straight(layout, e)),
    ...layout.fans.flatMap((f) => fan(layout, f)),
  ];
  return { width: layout.width, height: layout.height, nodes, paths };
}

export const TEXT_X = PAD_X;

// ---------------------------------------------------------------------------------------------

const dloudos: DiagramDef = {
  label:
    "Simplified system diagram: customers reach a website, which calls a Pterodactyl-fork panel that manages isolated nodes. Nodes send encrypted offsite backups. Admin access goes through Cloudflare Zero Trust to the nodes.",
  desktop: {
    width: 600,
    height: 328,
    nodes: [
      { id: "cust", x: 0, y: 0, w: 168, h: 80, title: "Customers", sub: ["Game-server owners"] },
      { id: "web", x: 216, y: 0, w: 168, h: 80, title: "Website", sub: ["Storefront and", "accounts"] },
      { id: "panel", x: 432, y: 0, w: 168, h: 80, title: "Panel", sub: ["Pterodactyl fork"] },
      { id: "admin", x: 0, y: 128, w: 168, h: 80, title: "Admin", sub: ["Operator only"] },
      { id: "zt", x: 216, y: 128, w: 168, h: 80, title: "Zero Trust", sub: ["Cloudflare Access"], accent: true },
      { id: "nodes", x: 432, y: 128, w: 168, h: 80, title: "Nodes", sub: ["Isolated per node"] },
      { id: "bak", x: 216, y: 256, w: 384, h: 72, title: "Offsite backups", sub: ["Encrypted, restore rehearsed"] },
    ],
    edges: [
      { from: "cust", to: "web" },
      { from: "web", to: "panel" },
      { from: "panel", to: "nodes" },
      { from: "admin", to: "zt" },
      { from: "zt", to: "nodes" },
      { from: "nodes", to: "bak", at: 516 },
    ],
    fans: [],
  },
  mobile: {
    width: 340,
    height: 480,
    nodes: [
      { id: "cust", x: 0, y: 0, w: 150, h: 64, title: "Customers", sub: ["Game-server", "owners"] },
      { id: "web", x: 0, y: 104, w: 150, h: 64, title: "Website", sub: ["Storefront and", "accounts"] },
      { id: "panel", x: 0, y: 208, w: 150, h: 64, title: "Panel", sub: ["Pterodactyl fork"] },
      { id: "nodes", x: 0, y: 312, w: 150, h: 64, title: "Nodes", sub: ["Isolated per node"] },
      { id: "zt", x: 190, y: 312, w: 150, h: 64, title: "Zero Trust", sub: ["Cloudflare", "Access"], accent: true },
      { id: "bak", x: 0, y: 416, w: 150, h: 64, title: "Offsite backups", sub: ["Encrypted,", "restore rehearsed"] },
      { id: "admin", x: 190, y: 416, w: 150, h: 64, title: "Admin", sub: ["Operator only"] },
    ],
    edges: [
      { from: "cust", to: "web" },
      { from: "web", to: "panel" },
      { from: "panel", to: "nodes" },
      { from: "nodes", to: "bak" },
      { from: "zt", to: "nodes" },
      { from: "admin", to: "zt" },
    ],
    fans: [],
  },
};

const promptRouter: DiagramDef = {
  label:
    "Simplified system diagram: a prompt goes to a router that picks a backend by task type. Two hosted models are the normal targets. A dashed path leads to a local fallback model used when no API key is available.",
  desktop: {
    width: 600,
    height: 208,
    nodes: [
      { id: "prompt", x: 0, y: 68, w: 128, h: 72, title: "Prompt", sub: ["Any task"] },
      { id: "router", x: 184, y: 68, w: 168, h: 72, title: "Router", sub: ["Picks by task type"] },
      { id: "a", x: 432, y: 0, w: 168, h: 56, title: "Backend A", sub: ["Hosted model"] },
      { id: "b", x: 432, y: 76, w: 168, h: 56, title: "Backend B", sub: ["Hosted model"] },
      { id: "local", x: 432, y: 152, w: 168, h: 56, title: "Local fallback", sub: ["Used with no API key"], dashed: true },
    ],
    edges: [{ from: "prompt", to: "router" }],
    fans: [{ from: "router", to: ["a", "b", "local"], dashed: ["local"] }],
  },
  mobile: {
    width: 340,
    height: 256,
    nodes: [
      { id: "prompt", x: 0, y: 24, w: 150, h: 56, title: "Prompt", sub: ["Any task"] },
      { id: "router", x: 0, y: 120, w: 150, h: 56, title: "Router", sub: ["Picks by", "task type"] },
      { id: "a", x: 190, y: 40, w: 150, h: 56, title: "Backend A", sub: ["Hosted model"] },
      { id: "b", x: 190, y: 120, w: 150, h: 56, title: "Backend B", sub: ["Hosted model"] },
      { id: "local", x: 190, y: 200, w: 150, h: 56, title: "Local fallback", sub: ["Used with", "no API key"], dashed: true },
    ],
    edges: [{ from: "prompt", to: "router" }],
    fans: [{ from: "router", to: ["a", "b", "local"], dashed: ["local"] }],
  },
};

const secretfix: DiagramDef = {
  label:
    "Simplified flow: source code goes to a detector, which produces a report. The detector can also feed a fix step that moves the key to an environment variable. A final check confirms that the fixed file still parses.",
  desktop: {
    width: 600,
    height: 208,
    nodes: [
      { id: "src", x: 0, y: 0, w: 168, h: 80, title: "Source", sub: ["Code in a repository"] },
      { id: "det", x: 216, y: 0, w: 168, h: 80, title: "Detect", sub: ["Rules for leaked keys"] },
      { id: "rep", x: 432, y: 0, w: 168, h: 80, title: "Report", sub: ["Findings by", "file and line"] },
      { id: "fix", x: 216, y: 128, w: 168, h: 80, title: "Fix", sub: ["Move the key to", "an env var"] },
      { id: "chk", x: 432, y: 128, w: 168, h: 80, title: "Check", sub: ["Fixed file must", "still parse"], accent: true },
    ],
    edges: [
      { from: "src", to: "det" },
      { from: "det", to: "rep" },
      { from: "det", to: "fix" },
      { from: "fix", to: "chk" },
    ],
    fans: [],
  },
  mobile: {
    width: 340,
    height: 384,
    nodes: [
      { id: "src", x: 0, y: 0, w: 150, h: 72, title: "Source", sub: ["Code in a", "repository"] },
      { id: "det", x: 0, y: 104, w: 150, h: 72, title: "Detect", sub: ["Rules for", "leaked keys"] },
      { id: "rep", x: 190, y: 104, w: 150, h: 72, title: "Report", sub: ["Findings by", "file and line"] },
      { id: "fix", x: 0, y: 208, w: 150, h: 72, title: "Fix", sub: ["Move the key to", "an env var"] },
      { id: "chk", x: 0, y: 312, w: 150, h: 72, title: "Check", sub: ["Fixed file must", "still parse"], accent: true },
    ],
    edges: [
      { from: "src", to: "det" },
      { from: "det", to: "rep" },
      { from: "det", to: "fix" },
      { from: "fix", to: "chk" },
    ],
    fans: [],
  },
};

export const diagrams: Record<DiagramKey, DiagramDef> = {
  dloudos,
  "prompt-router": promptRouter,
  secretfix,
};
