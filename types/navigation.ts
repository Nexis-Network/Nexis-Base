export interface NavigationItem {
  label: string
  href?: string
  items?: NavigationItem[]
}

export interface NavigationProps {
  items: NavigationItem[]
} 