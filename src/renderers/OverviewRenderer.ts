import { STATUS_COLOR_HEX } from "@/utils/colorUtils";

export interface OverviewPill {
  id: string;
  name: string;
  critical: number;
  warning: number;
}

export interface OverviewCard {
  id: string;
  name: string;
  type: string;
  critical: number;
  warning: number;
  total: number;
  // true when this card represents a container (e.g. a building) whose children
  // (floors) are the actual clickable scopes — the card itself isn't a target.
  drillable: boolean;
  children: OverviewPill[];
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
}

const CARD_W = 220;
const CARD_GAP = 16;
const PILL_H = 22;
const PILL_GAP = 6;
const HEADER_H = 56;

function statusColor(critical: number, warning: number): string {
  if (critical > 0) return STATUS_COLOR_HEX.critical;
  if (warning > 0) return STATUS_COLOR_HEX.warning;
  return STATUS_COLOR_HEX.normal;
}

export class OverviewRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cardRects: Rect[] = [];
  private pillRects: Rect[] = [];
  private hoverId: string | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
  }

  setHover(id: string | null) {
    this.hoverId = id;
  }

  hitTest(x: number, y: number): { id: string; drillable: boolean } | null {
    for (const r of this.pillRects) {
      if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
        return { id: r.id, drillable: false };
      }
    }
    for (const r of this.cardRects) {
      if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
        return { id: r.id, drillable: this._isDrillable(r.id) };
      }
    }
    return null;
  }

  private _drillableIds = new Set<string>();
  private _isDrillable(id: string) {
    return this._drillableIds.has(id);
  }

  render(cards: OverviewCard[]) {
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;
    const W = this.canvas.width / dpr;
    const H = this.canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "#080c18";
    ctx.fillRect(0, 0, W, H);

    this.cardRects = [];
    this.pillRects = [];
    this._drillableIds = new Set(
      cards.filter((c) => c.drillable).map((c) => c.id),
    );

    const cols = Math.max(1, Math.floor((W - CARD_GAP) / (CARD_W + CARD_GAP)));
    const startX = (W - cols * CARD_W - (cols - 1) * CARD_GAP) / 2;

    let x = startX;
    let y = 32;
    let rowH = 0;

    cards.forEach((card, i) => {
      const col = i % cols;
      if (col === 0 && i !== 0) {
        x = startX;
        y += rowH + CARD_GAP;
        rowH = 0;
      } else if (i !== 0) {
        x += CARD_W + CARD_GAP;
      }

      const h =
        HEADER_H +
        (card.drillable ? card.children.length * (PILL_H + PILL_GAP) + 12 : 12);
      this._drawCard(card, x, y, CARD_W, h);
      rowH = Math.max(rowH, h);
    });
  }

  private _drawCard(
    card: OverviewCard,
    x: number,
    y: number,
    w: number,
    h: number,
  ) {
    const ctx = this.ctx;
    const color = statusColor(card.critical, card.warning);
    const hovered = this.hoverId === card.id && !card.drillable;

    ctx.fillStyle = hovered ? "rgba(30,58,95,0.9)" : "rgba(9,13,24,0.92)";
    ctx.strokeStyle = color;
    ctx.lineWidth = card.critical > 0 || card.warning > 0 ? 1.5 : 1;
    this._roundRect(x, y, w, h, 8);
    ctx.fill();
    ctx.stroke();

    if (!card.drillable) this.cardRects.push({ x, y, w, h, id: card.id });

    ctx.fillStyle = "#e2e8f0";
    ctx.font = '600 13px -apple-system, "Segoe UI", sans-serif';
    ctx.fillText(card.name, x + 12, y + 22);

    ctx.fillStyle = "#64748b";
    ctx.font = "10px monospace";
    ctx.fillText(card.type.toUpperCase(), x + 12, y + 38);

    ctx.textAlign = "right";
    ctx.fillStyle = color;
    ctx.font = "600 11px monospace";
    const label =
      card.critical > 0
        ? `${card.critical} CRIT`
        : card.warning > 0
          ? `${card.warning} WARN`
          : "OK";
    ctx.fillText(label, x + w - 12, y + 22);
    ctx.fillStyle = "#475569";
    ctx.font = "10px monospace";
    ctx.fillText(`${card.total} dev`, x + w - 12, y + 38);
    ctx.textAlign = "left";

    if (card.drillable) {
      let py = y + HEADER_H;
      card.children.forEach((child) => {
        const pillColor = statusColor(child.critical, child.warning);
        const pHovered = this.hoverId === child.id;
        ctx.fillStyle = pHovered
          ? "rgba(30,58,95,0.9)"
          : "rgba(255,255,255,0.04)";
        ctx.strokeStyle = pillColor;
        ctx.lineWidth = 1;
        this._roundRect(x + 12, py, w - 24, PILL_H, 5);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#cbd5e1";
        ctx.font = '11px -apple-system, "Segoe UI", sans-serif';
        ctx.fillText(child.name, x + 20, py + 15);

        ctx.beginPath();
        ctx.arc(x + w - 22, py + PILL_H / 2, 3, 0, Math.PI * 2);
        ctx.fillStyle = pillColor;
        ctx.fill();

        this.pillRects.push({
          x: x + 12,
          y: py,
          w: w - 24,
          h: PILL_H,
          id: child.id,
        });
        py += PILL_H + PILL_GAP;
      });
    }
  }

  private _roundRect(x: number, y: number, w: number, h: number, r: number) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}
