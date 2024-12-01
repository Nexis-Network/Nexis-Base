import { Suspense } from "react"
import {
  authorNetworks,
  authorProtocols,
  authorWallets,
} from "@/data/static/author-profile"
// static data
import { collections } from "@/data/static/collections"
import cn from "@/utils/cn"

import { LAYOUT_OPTIONS } from "@/lib/constants"
import { useLayout } from "@/lib/hooks/use-layout"
import CollectionCard from "@/components/ui/collection-card"
import ListCard from "@/components/ui/list-card"
import Loader from "@/components/ui/loader"
import ParamTab, { TabPanel } from "@/components/ui/param-tab"
import TransactionHistory from "@/components/author/transaction-history"
import TransactionSearchForm from "@/components/author/transaction-search-form"

const tabMenu = [
  {
    title: "Collection",
    path: "collection",
  },
  {
    title: "Portfolio",
    path: "portfolio",
  },
  {
    title: "History",
    path: "history",
  },
]

export default function ProfileTab() {
  const { layout } = useLayout()
  return (
    <Suspense fallback={<Loader variant="blink" />}>
      <ParamTab tabMenu={tabMenu}>
        <TabPanel className="focus:outline-none">
          <div
            className={cn(
              "grid gap-4 xs:grid-cols-2 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4",
              layout === LAYOUT_OPTIONS.RETRO
                ? "md:grid-cols-2"
                : "md:grid-cols-1"
            )}
          >
            {collections?.map((collection) => (
              <CollectionCard
                item={collection}
                key={`collection-key-${collection?.id}`}
              />
            ))}
          </div>
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <div className="space-y-8 md:space-y-10 xl:space-y-12">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
              {authorWallets?.map((wallet) => (
                <ListCard
                  item={wallet}
                  key={`wallet-key-${wallet?.id}`}
                  variant="medium"
                />
              ))}
            </div>
            <div className="block">
              <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-[#F2F4F3]">
                Protocols
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {authorProtocols?.map((protocol) => (
                  <ListCard
                    item={protocol}
                    key={`protocol-key-${protocol?.id}`}
                    variant="large"
                  />
                ))}
              </div>
            </div>
            <div className="block">
              <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-[#F2F4F3]">
                Networks
              </h3>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
                {authorNetworks?.map((network) => (
                  <ListCard
                    item={network}
                    key={`network-key-${network?.id}`}
                    variant="medium"
                  />
                ))}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel className="focus:outline-none">
          <div className="space-y-8 xl:space-y-9">
            <TransactionSearchForm />
            <TransactionHistory />
          </div>
        </TabPanel>
      </ParamTab>
    </Suspense>
  )
}
