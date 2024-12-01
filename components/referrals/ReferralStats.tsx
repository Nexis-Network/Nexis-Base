import type * as React from "react"

import type { ReferralStatsProps } from "../../types/referrals"

export const ReferralStats: React.FC<ReferralStatsProps> = ({
  points,
  invitedCount,
  rewardPercentage,
}) => {
  return (
    <section className="flex w-full flex-col text-sm leading-loose">
      <header className="flex w-full justify-between gap-4">
        <h2 className="text-xs font-normal lg:text-sm">REFERRAL POINTS</h2>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/d3a09a2fda7941e0a2c87f17f318ba21/692c10d70caea5da3096def3515ab3db90fc32ee09658312a3246c97160b3818?apiKey=d3a09a2fda7941e0a2c87f17f318ba21&"
          alt=""
          className="aspect-[1.06] w-[17px] shrink-0 object-contain"
        />
      </header>
      <p className="mt-2 text-2xl font-black leading-none tracking-wider text-gray-100 lg:text-3xl">
        {points}
      </p>
      <p className="mt-2 text-sm text-gray-100/60">
        {invitedCount} People invited
      </p>
      <p className="mt-2 text-xs font-medium leading-none">
        You earn {rewardPercentage}% of referrals points.
      </p>
    </section>
  )
}
