import type { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { CheckCircle } from "@geist-ui/icons"
import { useAccount } from "wagmi"

interface SocialButtonProps {
  onClick?: () => void
  icon: string | StaticImport
  id: string
  connectingWalletId: string
  className?: string
}

const SocialButton = ({
  onClick,
  icon,
  id,
  connectingWalletId,
  className,
}: SocialButtonProps) => {
  const { connector, isConnected, isConnecting } = useAccount()

  return (
    <button
      type="button"
      className={`relative flex cursor-pointer items-center justify-center rounded-md disabled:cursor-default disabled:opacity-75 ${className}`}
      onClick={onClick}
      disabled={isConnected && connector?.id === id}
    >
      {isConnecting && connectingWalletId === id && (
        <span className="absolute left-2 top-2 size-4 animate-spin rounded-full border-2 border-t-[#555555]" />
      )}
      {isConnected && connector?.id === id && <CheckCircle />}
      <Image src={icon} alt="icon" className="max-h-[35px] max-w-[35px]" />
    </button>
  )
}

export default SocialButton
