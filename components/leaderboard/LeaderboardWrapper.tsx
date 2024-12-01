"use client"

import { domAnimation, LazyMotion, m } from "framer-motion"

import Leaderboard from "./Leaderboard"

const LeaderboardWrapper = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="mb-48 mt-16 flex w-11/12 max-w-7xl flex-col xl:mb-36 xl:mt-14 xl:w-10/12"
        key="dashboard"
        initial={{
          y: -300,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: 300,
          opacity: 0,
        }}
        transition={{
          staggerChildren: 0.3,
        }}
      >
        <div className="flex flex-col">
          <div className="mb-8 flex flex-row items-end justify-between gap-2 md:flex-col md:items-start xl:mb-6">
            <p className="text-3xl font-semibold text-[#F2F4F3] xl:text-2xl">
              Leaderboard
            </p>
          </div>
          <Leaderboard />
        </div>
      </m.div>
    </LazyMotion>
  )
}

export default LeaderboardWrapper
