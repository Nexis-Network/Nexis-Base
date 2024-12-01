"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faqs() {
  return (
    <div className="w-full border-t border-[#181F25]">
      <div className="w-full p-0 font-mono text-[#F2F4F3] ">
        <div className="p-2">
          {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
          <span className="text-base">/// FAQS</span>
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full justify-center border-t border-[#181F25] pb-4"
      >
        <AccordionItem value="item-1" className="px-4">
          <AccordionTrigger>What is Nexis Network?</AccordionTrigger>
          <AccordionContent>
            Nexis Network is a Zero-Knowledge Omni-chain L1 infrastructure
            engineered with EVM & SVM equivalence to enable scalable, private
            data networks for AI agents.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="px-4">
          <AccordionTrigger>What are points used for?</AccordionTrigger>
          <AccordionContent>
            Points will be important for securing whitelist access for the Nexis
            Core Node sale, winning exclusive GoldPasses and determining your
            eligibility for the $NZT Airdrop.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="px-4">
          <AccordionTrigger>How can points be earned?</AccordionTrigger>
          <AccordionContent>
            You can get points by running or delegating to the Nexis Nodes,
            building dApps on Nexis Network, integrating Nexis Network into
            existing dApps,social points through social tasks, engaging with
            Nexis Network on X, and by writing high-quality content. Referral
            points can be earned by inviting more users through your referral
            link.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="px-4">
          <AccordionTrigger>
            Why to claim $NZT from the faucet?
          </AccordionTrigger>
          <AccordionContent>
            Claiming $NZT on our testnet allows you to pay gas fees so you can
            start interacting on the Nexis Network testnet.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="px-4">
          <AccordionTrigger>
            What is the utility of Nexis ($NZT)?
          </AccordionTrigger>
          <AccordionContent>
            Nexis ($NZT) is the native utility token of Nexis Network. It is
            used for paying for transaction fees on the network, as well as
            staking to secure the network and participating in governance.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6" className="px-4">
          <AccordionTrigger>
            What consensus model does Nexis Network use?
          </AccordionTrigger>
          <AccordionContent>
            Nexis Network uses a hybrid consensus model that combines
            Delegated-Proof-of-Stake (DPoS), Proof-of-Stake (PoS) and
            Proof-of-History (PoH) to ensure a balance between decentralization
            and security.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7" className="px-4">
          <AccordionTrigger>
            How is Nexis Network different from other L1s?
          </AccordionTrigger>
          <AccordionContent>
            Nexis Network is the first L1 to offer Zero-Knowledge Omni-chain
            Equivalence, which allows for private data networks on top of the
            Nexis Network. This is achieved through the use of the ZK-EVM and
            ZK-SVM.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8" className="px-4">
          <AccordionTrigger>
            What wallets support Nexis Network?
          </AccordionTrigger>
          <AccordionContent>
            Nexis Network is compatible with MetaMask, Coinbase Wallet,
            WalletConnect, BlockWallet, SafePal, Phantom and other wallets that
            support the EIP-1193 standard.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
