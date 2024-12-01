import type { NavigationItem } from "@/types/navigation"

export const navigationItems: NavigationItem[] = [
  { label: "<A/> OVERVIEW", href: "/" },
  {
    label: "<A/> APPS",
    items: [
      { label: "Swap", href: "/swap" },
      { label: "Bridge", href: "/bridge" },
      { label: "Chart", href: "/chart" },
      { label: "Vesting", href: "/vesting" },
    ],
  },
  {
    label: " <A/> NODES",
    items: [
      { label: "Node Sale", href: "/node-sale" },
      { label: "Node Delegating", href: "/nodes" },
    ],
  },
  { label: "<A/> QUESTS", href: "/quests" },
  { label: "<A/> LEADERBOARD", href: "/leaderboard" },
] 