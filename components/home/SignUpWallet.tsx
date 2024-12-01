import { useEffect } from "react"
import Image, { type StaticImageData } from "next/image"
import arbitrumIcon from "@/assets/arbitrum-icon.svg"
import bscLogo from "@/assets/bnb-icon.svg"
import check from "@/assets/check.svg"
import ethLogo from "@/assets/ethereum-icon.svg"
import optimismIcon from "@/assets/optimism-icon.svg"
import polygonIcon from "@/assets/polygon-icon.svg"
import { selectNavbarSlice, setIsWalletModalOpen } from "@/store/navbarSlice"
import { useAppDispatch, useAppSelector } from "@/store/store"
import {
  authenticate,
  selectUserSlice,
  setSignupStepCompleted,
  setTotalSignupStepCompleted,
} from "@/store/userSlice"
import { Spinner } from "@geist-ui/core"
import { useAccount, useNetwork } from "wagmi"
import { arbitrum, bsc, mainnet, optimism, polygon } from "wagmi/chains"

import {
  eclipseAddress,
  season2TwitterLaunchDate,
  signUpSteps,
} from "@/lib/helpers"

import NexisIcon from "../NexisIcon"

type Icons = {
  [key: string]: string | StaticImageData
}

const icons: Icons = {
  [polygon.id]: polygonIcon,
  [optimism.id]: optimismIcon,
  [arbitrum.id]: arbitrumIcon,
  [mainnet.id]: ethLogo,
  [bsc.id]: bscLogo,
}

const SignUpWallet = () => {
  const dispatch = useAppDispatch()
  const {
    signupStepCompleted,
    isCreating,
    isRetrieving,
    isAuthenticating,
    isAuthenticated,
    user,
  } = useAppSelector(selectUserSlice)
  const { isWalletModalOpen } = useAppSelector(selectNavbarSlice)
  const { address, isConnected, isConnecting } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    const authenticateUser = async () => {
      if (!signupStepCompleted[signUpSteps.WALLET] && address) {
        try {
          await dispatch(authenticate({ eoaAddress: address }))
        } catch (error) {
          console.error("Authentication failed:", error)
        }
      }
    }

    authenticateUser()
  }, [address, dispatch, signupStepCompleted])

  useEffect(() => {
    if (
      !signupStepCompleted[signUpSteps.WALLET] &&
      isConnected &&
      isAuthenticated
    ) {
      dispatch(setSignupStepCompleted({ key: signUpSteps.WALLET, value: true }))
      dispatch(setTotalSignupStepCompleted())
    }
  }, [signupStepCompleted, isConnected, dispatch, isAuthenticated])

  return (
    <div className="md:max-w-9/10 flex h-[113px] w-[849px] flex-row items-center justify-between rounded-[20px] bg-oslo-gray/[.22] px-10 md:m-auto md:h-auto md:w-screen md:flex-col md:gap-4 md:px-4 md:py-6 md:text-center">
      <div className="flex flex-row items-center gap-6 md:flex-col md:gap-2">
        <div
          className={`relative flex size-[45px] items-center justify-center overflow-hidden rounded-full border border-dashed text-2xl font-bold leading-none text-[#F2F4F3] transition-all duration-300 ease-in-out ${
            signupStepCompleted[signUpSteps.WALLET]
              ? "border-primary"
              : "border-[#181F25]"
          }`}
        >
          <p
            className={`absolute left-1/2 transition-all duration-300 ease-in-out ${
              signupStepCompleted[signUpSteps.WALLET]
                ? "translate-x-12"
                : "-translate-x-1/2"
            }`}
          >
            {signUpSteps.WALLET}
          </p>
          <Image
            src={check}
            alt="check"
            width={21}
            height={15}
            className={`absolute left-1/2 transition-all duration-300 ease-in-out ${
              signupStepCompleted[signUpSteps.WALLET]
                ? "-translate-x-1/2"
                : "-translate-x-12"
            }`}
          />
        </div>
        <p className="text-2xl font-bold text-[#F2F4F3]">Connect Wallet</p>
      </div>
      {!signupStepCompleted[signUpSteps.WALLET] && (
        <button
          type="button"
          className={`flex w-[163px] items-center justify-center gap-2 rounded-full bg-primary py-[15px] text-xl font-semibold leading-none transition ease-in-out ${
            signupStepCompleted[signUpSteps.WALLET] ? "" : "hover:bg-[#F2F4F3]"
          }`}
          disabled={signupStepCompleted[signUpSteps.WALLET]}
          onClick={() => dispatch(setIsWalletModalOpen(true))}
        >
          Connect
          {(isWalletModalOpen || isConnecting || isAuthenticating) && (
            <Spinner />
          )}
        </button>
      )}
      {signupStepCompleted[signUpSteps.WALLET] && address && (
        <div className="border-smokey-gray flex min-w-[163px] items-center justify-center gap-2 rounded-full border p-2.5">
          <Image
            src={icons[chain?.id ?? 122]}
            alt={chain?.name ?? "Fuse"}
            width={25}
            height={25}
          />
          <p className="text-[#F2F4F3] opacity-70">
            {eclipseAddress(String(address))}
          </p>
          {new Date(user.createdAt) >= season2TwitterLaunchDate &&
            !signupStepCompleted[signUpSteps.WALLET + 1] &&
            (isCreating || isRetrieving || isAuthenticating) && <Spinner />}
        </div>
      )}
      {signupStepCompleted[signUpSteps.WALLET] && !address && (
        <button
          type="button"
          className="flex w-[163px] items-center justify-center gap-2 rounded-full bg-primary py-[15px] text-xl font-semibold leading-none transition ease-in-out hover:bg-[#F2F4F3]"
          onClick={() => dispatch(setIsWalletModalOpen(true))}
        >
          Reconnect
          {(isWalletModalOpen || isConnecting || isAuthenticating) && (
            <Spinner />
          )}
        </button>
      )}
    </div>
  )
}

export default SignUpWallet
