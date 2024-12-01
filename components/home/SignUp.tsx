import { useAppSelector } from "@/store/store"
import { selectUserSlice } from "@/store/userSlice"
import { motion } from "framer-motion"

import { season2TwitterLaunchDate, signUpSteps } from "@/lib/helpers"

import SignUpSkip from "./SignUpSkip"
import SignUpWallet from "./SignUpWallet"

const SignUp = () => {
  const { signupStepCompleted, user } = useAppSelector(selectUserSlice)
  return (
    <motion.div
      className="w-8/9 md:w-9/10 mb-[187px] mt-[86px] flex max-w-7xl flex-col items-center md:mb-8 md:mt-0"
      key="signup"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <h1 className="mb-16 mt-[52px] max-w-[604px] text-center text-[2.125rem] font-medium leading-none text-[#F2F4F3] md:mt-0">
        You&apos;re almost there. Connect your wallet and social media
      </h1>
      <div className="mb-11 flex flex-col gap-5">
        <SignUpWallet />
      </div>
      {signupStepCompleted[signUpSteps.MANDATORY] &&
        new Date(user.createdAt) < season2TwitterLaunchDate && <SignUpSkip />}
    </motion.div>
  )
}

export default SignUp
