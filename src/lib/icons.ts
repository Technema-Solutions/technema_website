import * as LucideIcons from "lucide-react";

/**
 * Dynamically resolve a Lucide icon component by name.
 * Supports all 400+ Lucide icons without a static map.
 * Falls back to Star if the icon name is not found.
 */
export function getLucideIcon(name: string): React.ComponentType<{ className?: string; strokeWidth?: number }> {
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>>;
  return icons[name] || LucideIcons.Star;
}
