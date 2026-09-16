import type { ProductConfiguration } from "@/types";
import {
  BLIND_COLOR_LABELS,
  FRAME_COLOR_LABELS,
  OPENING_DIRECTION_LABELS,
} from "@/data/customizations";

export function formatCartConfiguration(config: ProductConfiguration): string {
  const unit = config.widthUnit === "cm" ? "cm" : "in";
  const parts = [`${config.width}×${config.height}${unit}`];

  if (config.blindColor) parts.push(BLIND_COLOR_LABELS[config.blindColor] || config.blindColor);
  if (config.frameColor) parts.push(FRAME_COLOR_LABELS[config.frameColor] || config.frameColor);
  if (config.openingDirection) parts.push(OPENING_DIRECTION_LABELS[config.openingDirection] || config.openingDirection);

  return parts.join(" · ");
}
