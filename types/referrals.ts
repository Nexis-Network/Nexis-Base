export interface ReferralStatsProps {
  points: number;
  invitedCount: number;
  rewardPercentage: number;
}

export interface ResourceCardProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  points?: number;
  totalPoints?: number;
  epoch?: string;
}