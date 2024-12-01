import { useAppDispatch, useAppSelector } from "@/store/store"
import { selectUserSlice, setCurrentComponent } from "@/store/userSlice"
import { Spinner } from "@geist-ui/core"

import { season2TwitterLaunchDate } from "@/lib/helpers"

const SignUpSkip = () => {
  const dispatch = useAppDispatch()
  const { isCreating, isRetrieving, user } = useAppSelector(selectUserSlice)

  if (new Date(user.createdAt) >= season2TwitterLaunchDate) {
    return
  }
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-2 rounded-full bg-neutral-700/30 px-9 py-4 font-bold leading-none text-[#F2F4F3] transition ease-in-out ${
        isCreating || isRetrieving ? "" : "hover:bg-green-500 hover:text-black"
      }`}
      onClick={() => dispatch(setCurrentComponent("dashboard"))}
      disabled={isCreating || isRetrieving}
    >
      {isCreating && "Creating"}
      {isRetrieving && "Retrieving"}
      {!isCreating && !isRetrieving && "Skip for now"}
      {(isCreating || isRetrieving) && <Spinner />}
    </button>
  )
}

export default SignUpSkip
