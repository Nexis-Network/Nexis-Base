import { Home, Lock, Mail, User, X, type LucideProps } from "lucide-react"

export const Icons = {
  home: Home,
  user: User,
  mail: Mail,
  lock: Lock,
  close: X,
  // Custom icon
  logo: (props: LucideProps) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" {...props}>
      {/* SVG path data for the logo */}
      <path d="M12 2L2 7v15l10 5 10-5V7L12 2z" fill="currentColor" />
    </svg>
  ),
}

export type Icon = keyof typeof Icons
