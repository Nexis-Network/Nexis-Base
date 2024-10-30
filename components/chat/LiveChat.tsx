"use client"

import React, { useEffect, useState } from "react"
import { useAccount } from "wagmi"

// Update the Message interface to match the one from types/chat
import { Message } from "@/types/chat"
// You'll need to implement these functions
import { fetchMessages, fetchOnlineUsers, sendMessage } from "@/lib/chat-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const LiveChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const { address, isConnected } = useAccount()
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])

  useEffect(() => {
    if (isConnected) {
      // Fetch initial messages and set up real-time updates
      ;(async () => {
        try {
          const initialMessages = await fetchMessages()
          setMessages(initialMessages)

          const users = await fetchOnlineUsers()
          setOnlineUsers(users)
        } catch (error) {
          console.error("Failed to fetch data:", error)
        }
      })().catch((error) =>
        console.error("Unhandled promise rejection:", error)
      )

      // Set up WebSocket for real-time updates
      const socket = new WebSocket("wss://your-websocket-url")

      socket.onmessage = (event) => {
        const newMessage: Message = JSON.parse(event.data)
        setMessages((prevMessages) => [...prevMessages, newMessage])
      }

      return () => {
        socket.close()
      }
    }
  }, [isConnected])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isConnected) {
      alert("Please connect your wallet to participate in the chat.")
      return
    }
    setInputMessage(e.target.value)
  }

  const handleSendMessage = async () => {
    if (!isConnected) {
      alert("Please connect your wallet to send messages.")
      return
    }
    if (inputMessage.trim() && address) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: address,
        timestamp: new Date().toISOString(),
        address: address,
      }
      await sendMessage(address, newMessage.content)
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setInputMessage("")
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="flex min-h-[520px] w-80 flex-col rounded-lg border border-[#242424] bg-[#0a0a0a] shadow-lg">
      <div className="flex items-center justify-between border-b border-[#242424] bg-[#16171A] p-3">
        <h2 className="text-sm font-semibold text-white">Community Chat</h2>
        <div
          className="flex cursor-help items-center"
          title="Online users"
          style={
            {
              "--tooltip-bg": "#0a0a0a",
              "--tooltip-border": "#242424",
            } as React.CSSProperties
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V18H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V18H23V16.5C23 14.17 18.33 13 16 13Z"
              fill="#acfa19"
            />
          </svg>
          <span className="text-sm text-[#acfa19]">{onlineUsers.length}</span>
        </div>
      </div>
      <div className="grow overflow-y-auto p-4 text-white">
        {messages.map((message) => (
          <div key={message.id} className="mb-2">
            <span className="font-semibold text-[#acfa19]">
              {truncateAddress(message.sender)}:
            </span>{" "}
            {message.content}
          </div>
        ))}
      </div>
      <div className="p-4">
        <Input
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="border-[#242424] bg-[#242424] text-white placeholder:text-gray-400"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!isConnected || !inputMessage.trim()}
          className="mt-2 w-full bg-[#acfa19] text-black hover:bg-[#9de617]"
        >
          Send
        </Button>
      </div>
    </div>
  )
}

export default LiveChat
