import type { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { CheckCircle } from "@geist-ui/icons"
import { useAccount } from "wagmi"

interface WalletButtonProps {
  onClick?: () => void
  text: string
  icon: string | StaticImport
  id: string
  connectingWalletId: string
  className?: string
}

const WalletButton = ({
  onClick,
  text,
  icon,
  id,
  connectingWalletId,
  className,
}: WalletButtonProps) => {
  const { connector, isConnected, isConnecting } = useAccount()
  return (
    <button
      type="button"
      className="relative flex h-[75px] cursor-pointer flex-col items-center justify-between rounded-md border border-[#CDD9E5] p-2 transition-all duration-500 hover:bg-[#F2F2F2] disabled:cursor-default disabled:opacity-75"
      onClick={onClick}
      disabled={isConnected && connector?.id === id}
    >
      {isConnecting && connectingWalletId === id && (
        <span className="border-light-gray absolute left-2 top-2 size-4 animate-spin rounded-full border-2 border-t-[#555555]" />
      )}
      {isConnected && connector?.id === id && <CheckCircle />}
      <div className="h-2/3 justify-center items-center flex">
        <Image src={icon} alt="icon" className={className} />
      </div>
      <span className="text-xs font-medium">{text}</span>
    </button>
  )
}

export default WalletButton
