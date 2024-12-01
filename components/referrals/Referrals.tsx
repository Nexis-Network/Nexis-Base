import type * as React from "react"

import { ReferralCard } from "./ReferralCard"
import { ReferralStats } from "./ReferralStats"
import { ResourceCardList } from "./ResourceCardList"

export const Referrals: React.FC = () => {
  return (
    <div className="grid border-collapse grid-cols-1 gap-4 border-t border-[#181F25]/70">
      <div className="pb-2 flex min-w-full flex-col gap-4 lg:flex-row">
        <div className="w-full lg:flex-[3]">
          <ResourceCardList />
        </div>
        <div className="flex w-full justify-center px-2 pt-4 align-middle lg:flex-1 lg:px-4">
          <ReferralCard />
        </div>
      </div>
    </div>
  )
}
