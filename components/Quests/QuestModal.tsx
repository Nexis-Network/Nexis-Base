"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/store/store"
import {
  generateTwitterAuthUrl,
  selectUserSlice,
  setIsQuestModalOpen,
  verifyQuest,
} from "@/store/userSlice"
import { Hexagon } from "@geist-ui/icons"
import { AnimatePresence, motion } from "framer-motion"
import Markdown from "react-markdown"
import { useMediaQuery } from "usehooks-ts"

import { screenWidth } from "@/lib/helpers"

import { Close } from "../icons/close"
import Spinner from "../ui/Spinner"

type QuestDescriptions = {
  [key: string]: React.ReactNode
}

const BridgeDescription = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <p>Get 4 points daily for reach $1 bridged to Fuse</p>
      <div className="flex flex-col gap-2.5">
        <p className="font-bold">Quest conditions:</p>
        <ul className="max-w-[378px] list-disc text-left">
          <li>Bridge NZT, USDC, UDST or ETH token</li>
          <li>
            {
              "Points begin accumulating after >24 hours pass from the bridging transaction"
            }
          </li>
          <li>Do not swap or stake bridged assets on Console dApp</li>
        </ul>
      </div>
    </div>
  )
}

const questDescriptions: QuestDescriptions = {
  bridge: <BridgeDescription />,
}

const QuestModal = (): JSX.Element => {
  const { isQuestModalOpen, selectedQuest } = useAppSelector(selectUserSlice)
  const dispatch = useAppDispatch()
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`)

  const handleClick = async (id: string, endpoint?: string) => {
    switch (id) {
      case "followFuseOnTwitter":
        await dispatch(generateTwitterAuthUrl()).catch(console.error)
        break
    }
  }

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "quest-modal-bg") {
        dispatch(setIsQuestModalOpen(false))
      }
    })
  }, [dispatch])

  return (
    <AnimatePresence>
      {isQuestModalOpen && selectedQuest && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
            }}
            className="absolute left-1/2 top-1/2 z-[80] h-fit max-h-[98%] w-[519px] max-w-[95%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-[#07090b] xl:w-[415px]"
          >
            <div className="relative flex min-h-[inherit] flex-col justify-between pt-9 xl:pt-7">
              <div className="absolute right-9 xl:right-7">
                <Close />
              </div>
              <div className="flex flex-col items-center text-center">
                {selectedQuest.image && (
                  <div
                    className={`flex items-center justify-center ${
                      selectedQuest.imageHeight ?? "h-[210px]"
                    } xl:h-auto`}
                  >
                    <Image
                      src={selectedQuest.image}
                      alt={selectedQuest.title}
                      className="pt-2.5"
                    />
                  </div>
                )}
                <p className="mt-8 max-w-md text-2xl font-bold leading-none text-[#F2F4F3] xl:max-w-xs xl:text-xl">
                  {selectedQuest.heading ?? selectedQuest.title}
                </p>
                <div className="text-gray-300 mt-5 max-w-md whitespace-pre-wrap text-lg font-medium leading-6 xl:max-w-xs xl:text-base">
                  {questDescriptions[selectedQuest.id] ?? (
                    <Markdown>{selectedQuest.description ?? ""}</Markdown>
                  )}
                </div>
                <div className="ml-8 mt-12 flex max-w-md items-center gap-2 self-start text-left xl:max-w-xs">
                  <Hexagon />
                  <p className="text-lg font-bold text-green-500 xl:text-base">
                    {selectedQuest.pointModal ?? selectedQuest.point}
                  </p>
                </div>
              </div>
              <div className="mt-10 min-h-[104px] xl:min-h-fit">
                <hr className="border-[#181F25] border-[0.3px]" />
                <div
                  className={`mb-8 mt-7 flex items-center gap-2 px-9 xl:mt-6 xl:mb-6 xl:px-7 ${
                    selectedQuest.buttonTwo ? "justify-between" : "justify-end"
                  }`}
                >
                  {selectedQuest.button && (
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 rounded-full border border-primary bg-[#07090b] px-9 py-4 font-semibold leading-none text-black transition ease-in-out hover:bg-transparent hover:text-primary xl:px-7 xl:py-2.5"
                      onClick={() => {
                        if (selectedQuest.isFunction) {
                          void handleClick(selectedQuest.id)
                        }
                        if (selectedQuest.link) {
                          window.open(selectedQuest.link, "_blank")
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
                      className="flex items-center justify-center gap-2 rounded-full border border-primary bg-[#07090b] px-9 py-4 font-semibold leading-none text-black transition ease-in-out enabled:hover:bg-transparent enabled:hover:text-primary disabled:grayscale xl:px-7 xl:py-2.5"
                      disabled={selectedQuest.isDisabledTwo}
                      onClick={() => {
                        if (selectedQuest.isFunctionTwo) {
                          handleClick(
                            selectedQuest.id,
                            selectedQuest.endpointTwo
                          )
                        }
                        if (selectedQuest.linkTwo) {
                          window.open(selectedQuest.linkTwo, "_blank")
                        }
                      }}
                    >
                      {selectedQuest.buttonTwo}
                      {selectedQuest.isLoadingTwo && <Spinner />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
export default QuestModal
