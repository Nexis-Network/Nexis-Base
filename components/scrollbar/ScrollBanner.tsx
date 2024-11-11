/* eslint-disable tailwindcss/no-custom-classname */
"use client"

import React from "react"
import { motion } from "framer-motion"

import styles from "./scrollbar.module.css"

const ScrollBanner: React.FC = () => {
  const bannerItems = [
    {
      title: "/// Nexis",
      description:
        "decentralized data graphs to enable al and ml models to deploy private zk models with ease",
    },
    {
      title: "/// NZT",
      description:
        "Zero-Knowledge evm and svm dapps with omni-chain capabilities",
    },
    {
      title: "/// Nexis Nodes",
      description:
        "Zero-Knowledge evm and svm dapps with omni-chain capabilities",
    },
    {
      title: "/// Nexis Quests",
      description:
        "The fastest growing layer-1 blockchain built for AI and ML in Web3",
    },
    {
      title: "/// Nexis Airdrop",
      description:
        "Earn free rewards in tokens, nfts, and nodes with the Nexis Airdrop",
    },
  ]

  return (
    <div className="scrollbanner scrollbar relative h-[30px] w-full overflow-hidden border-b border-[#242424] bg-black font-mono text-xs">
      <motion.div
        className="absolute inset-y-0 left-0 flex whitespace-nowrap"
        animate={{
          x: [0, -1200], // Adjust this value based on the total width of your content
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 30, // Adjust the duration to control the speed
            ease: "linear",
          },
        }}
      >
        {bannerItems.map((item) => (
          <React.Fragment key={item.title}>
            <div className="flex items-center">
              <p className="scrollbanner uppercase text-[#8AE06C]">
                {item.title}
              </p>
              <p className="scrollbanner mx-2 uppercase text-[#757575]">-</p>
              <p className="scrollbanner uppercase leading-4 text-white">
                {item.description}
              </p>
            </div>
            {bannerItems.indexOf(item) < bannerItems.length - 1 && (
              <div className="mx-8" /> // Add space between items
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}

export default ScrollBanner
