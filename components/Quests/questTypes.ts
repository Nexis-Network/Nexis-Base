export interface Quest {
  id: number
  title: string
  description: string
  reward: number
  difficulty: "Easy" | "Medium" | "Hard"
  progress: number
  category: "onboarding" | "social" | "on-chain" | "ecosystem" | "developer"
} 