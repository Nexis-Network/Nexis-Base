"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/store"
import {
  initQuest,
  selectUserSlice,
  setIsEcosystemAppModalOpen,
  setSelectedQuest,
  verifyQuest,
} from "@/store/userSlice"
import { Hexagon, Minus, Plus } from "@geist-ui/icons"
import { AnimatePresence, motion } from "framer-motion"
import Markdown from "react-markdown"
import { useMediaQuery } from "usehooks-ts"

import { screenWidth } from "@/lib/helpers"

import { Close } from "./icons/close"
import Spinner from "./ui/Spinner"

const EcosystemAppModal = (): JSX.Element => {
  const { isEcosystemAppModalOpen, selectedEcosystemApp, selectedQuest } =
    useAppSelector(selectUserSlice)
  const dispatch = useAppDispatch()
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`)
  const [purchaseSliderValue, setPurchaseSliderValue] = useState(0)
  const pricePerLicense = 10
  const [totalPrice, setTotalPrice] = useState(10)

  function handleClick(id: string, endpoint?: string) {
    if (endpoint) {
      return dispatch(verifyQuest({ endpoint }))
    }
  }

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "ecosystem-app-modal-bg") {
        dispatch(setIsEcosystemAppModalOpen(false))
      }
    })
  }, [dispatch])

  console.log("selectedEcosystemApp==", selectedEcosystemApp)
  return (
    <AnimatePresence>
      {isEcosystemAppModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed left-0 top-0 z-[80] flex size-full bg-black bg-opacity-70 backdrop-blur"
          id="ecosystem-app-modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className={`bg-tertiary absolute left-1/2 top-1/2 z-[80] max-h-[90%] w-full max-w-[880px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl before:absolute before:-z-[1] before:size-full before:rotate-180 before:bg-cover before:bg-left-top before:bg-no-repeat before:content-[''] md:max-w-[95%] ${selectedEcosystemApp.beforeBackground}`}
          >
            <div className="flex flex-col p-12 xl:p-10">
              <div className="flex items-start justify-between">
                <Image
                  src={selectedEcosystemApp.image}
                  alt={selectedEcosystemApp.name}
                />
                <Close />
              </div>
              <p className="mt-[29px] text-lg font-medium text-[#F2F4F3]/70 xl:mt-5 xl:text-base">
                {selectedEcosystemApp.description}
              </p>
              <div className="mt-[54px] flex flex-col gap-[22px] xl:mt-11">
                {selectedEcosystemApp.quests[0].id === "shardSaleNexis" ? (
                  <></>
                ) : (
                  <p className="text-2xl font-bold text-[#F2F4F3] xl:text-xl">
                    {selectedEcosystemApp.quests.length} quests
                  </p>
                )}

                <div className="flex flex-col gap-5">
                  {selectedEcosystemApp.quests.map((ecosystemAppQuest) => {
                    if (ecosystemAppQuest.isHidden) {
                      return
                    }
                    if (ecosystemAppQuest.id === "shardSaleNexis") {
                      return (
                        <div className="rounded-[20px] bg-oslo-gray/[0.22]">
                          <div className="flex flex-col items-start gap-5 p-4 text-start">
                            <p className="pt-4 text-lg font-semibold text-[#F2F4F3] xl:text-base">
                              Buy Shards
                            </p>
                            <input
                              type="text"
                              placeholder="referral code"
                              className="flex w-full gap-2 rounded-md bg-oslo-gray/30 px-[20px] py-3.5 text-md leading-none text-[#F2F4F3] placeholder:text-gray-200 focus:outline-none"
                            />
                            <div className="text-[#F2F4F3]">
                              Purchase {purchaseSliderValue} Shard Licenses
                            </div>
                            <input
                              type="range"
                              className="w-full"
                              min="0"
                              max="100"
                              step="1"
                              value={purchaseSliderValue}
                              onChange={(e) => {
                                setPurchaseSliderValue(
                                  Number.parseInt(e.target.value)
                                )
                                setTotalPrice(
                                  Number.parseInt(e.target.value) *
                                    pricePerLicense
                                )
                              }}
                            />
                            <div>Price per License: ${pricePerLicense}</div>
                            <div>Total Price: ${totalPrice}</div>
                            <button
                              type="button"
                              className="flex w-[163px] items-center justify-center gap-2 rounded-full bg-primary py-[15px] text-xl font-semibold leading-none transition ease-in-out hover:bg-[#F2F4F3]"
                            >
                              Purchase
                            </button>
                          </div>
                        </div>
                      )
                    }
                    return (
                      <AnimatePresence key={ecosystemAppQuest.id}>
                        <div className="rounded-[20px] bg-oslo-gray/[0.22]">
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-8 pb-6 pt-8 hover:opacity-90 xl:p-6"
                            onClick={() =>
                              dispatch(
                                setSelectedQuest(
                                  selectedQuest.id === ecosystemAppQuest.id
                                    ? initQuest
                                    : ecosystemAppQuest
                                )
                              )
                            }
                          >
                            <div className="flex flex-col items-start gap-5 text-start">
                              <p className="text-lg font-semibold text-[#F2F4F3] xl:text-base">
                                {selectedQuest.id === ecosystemAppQuest.id
                                  ? selectedQuest.heading ?? selectedQuest.title
                                  : ecosystemAppQuest.title}
                              </p>
                              <div className="flex items-center gap-2">
                                <Hexagon />
                                <p className="text-success text-lg font-bold xl:text-base">
                                  {selectedQuest.id === ecosystemAppQuest.id
                                    ? ecosystemAppQuest.pointModal ??
                                      ecosystemAppQuest.point
                                    : ecosystemAppQuest.point}
                                </p>
                              </div>
                            </div>
                            {selectedQuest.id === ecosystemAppQuest.id ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center"
                              >
                                <Minus />
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center"
                              >
                                <Plus />
                              </motion.div>
                            )}
                          </button>
                          {selectedQuest.id === ecosystemAppQuest.id && (
                            <motion.div
                              key={selectedQuest.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-col items-start gap-10 px-8 pb-8 pt-6 xl:p-6"
                            >
                              <div className="text-pale-slate whitespace-pre-wrap text-lg font-medium leading-6 xl:text-base">
                                <Markdown>
                                  {selectedQuest.description ?? ""}
                                </Markdown>
                              </div>
                              <div className="flex items-center gap-[26px] md:flex-col md:items-start md:gap-4">
                                {selectedQuest.button && (
                                  <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-9 py-4 font-semibold leading-none text-black transition ease-in-out hover:bg-transparent hover:text-primary xl:px-7 xl:py-2.5"
                                    onClick={() => {
                                      if (selectedQuest.isFunction) {
                                        handleClick(selectedQuest.id)
                                      }
                                      if (selectedQuest.link) {
                                        window.open(
                                          selectedQuest.link,
                                          "_blank"
                                        )
                                      }
                                    }}
                                  >
                                    {selectedQuest.button}
                                    {selectedQuest.isLoading && <Spinner />}
                                  </button>
                                )}
                                {selectedQuest.buttonTwo && (
                                  <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-9 py-4 font-semibold leading-none text-black transition ease-in-out hover:bg-transparent hover:text-primary xl:px-7 xl:py-2.5"
                                    disabled={selectedQuest.isDisabledTwo}
                                    onClick={() => {
                                      if (selectedQuest.isFunctionTwo) {
                                        void handleClick(
                                          selectedQuest.id,
                                          selectedQuest.endpointTwo
                                        )
                                      }
                                      if (selectedQuest.linkTwo) {
                                        window.open(
                                          selectedQuest.linkTwo,
                                          "_blank"
                                        )
                                      }
                                    }}
                                  >
                                    {selectedQuest.buttonTwo}
                                    {selectedQuest.isLoadingTwo && <Spinner />}
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </AnimatePresence>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default EcosystemAppModal
