import type * as React from "react"

import { CopyLinkButton } from "./CopyLinkButton"
import { ReferralStats } from "./ReferralStats"

export const ReferralCard: React.FC = () => {
  return (
    <article className="flex w-full flex-col rounded-xl border border-solid border-[#181F25] bg-lime-300/30 p-4 pb-2 text-lime-300 lg:max-w-[300px] lg:p-5">
      <ReferralStats points={0} invitedCount={0} rewardPercentage={15} />
      <CopyLinkButton />
    </article>
  )
}
