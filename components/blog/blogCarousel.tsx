/* eslint-disable react/jsx-no-comment-textnodes */
import * as React from "react"
import Image from "next/image"
import blog1Image from "@/public/images/blog1.webp"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import NexisIcon from "../NexisIcon"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  date: string
  image: string
  url: string
}

const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title:
      "Nexis Network and BluWhale Forge a Revolutionary Partnership for AI and Web3 Innovation",
    excerpt:
      "In a move set to redefine the landscape of decentralized technologies, Nexis Network and BluWhale have announced a groundbreaking partnership. This collaboration aims to accelerate the adoption of Web3 solutions and bring unprecedented innovation to the blockchain industry.",
    author: {
      name: "Nexis Foundation",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-11-15",
    image: "/images/blog1.png",
    url: "https://blog.nexis.network/nexis-network-and-bluwhale-forge-a-revolutionary-partnership-for-ai-and-web3-innovation-3ed6988c9e80",
  },
  {
    id: 2,
    title:
      "A Novel PrivacyPreserving and EnergyEfficient AI/ML System Using ZeroKnowledge EVM Implementations",
    excerpt:
      "We propose an innovative method for developing an artificial intelligence (AI) and machine learning (ML) system that optimizes energy and storage consumption while enhancing user privacy.",
    author: {
      name: "Nexis Foundation",
      avatar: "/images/nexis-icon.webp",
    },
    date: "2024-11-05",
    image: "/images/blog3.png",
    url: "https://blog.nexis.network/a-novel-privacypreserving-and-energyefficient-ai-ml-system-using-zeroknowledge-evm-implementations-3f723834a2e1",
  },
  {
    id: 3,
    title:
      "Nexis Network Joins CIRCLE Alliance: Boosting Prestige and Adoption in the Web3 Ecosystem",
    excerpt:
      "In an exciting development for our community, Nexis Network is proud to announce our membership in the prestigious CIRCLE Alliance Program. This strategic move not only elevates our standing in the blockchain industry but also paves the way for enhanced adoption and innovation within our ecosystem. ",
    author: {
      name: "Nexis Foundation",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-10-29",
    image: "/images/blog2.png",
    url: "https://blog.nexis.network/nexis-network-joins-circle-alliance-boosting-prestige-and-adoption-in-the-web3-ecosystem-b688af0b9ac4",
  },
  {
    id: 4,
    title:
      "The Great Migration: Exzo Network Transforms into Nexis Network — A New Era in Blockchain",
    excerpt:
      "Today, we witness one such groundbreaking transformation: Exzo Network and its token Exzo (XZO) are metamorphosing into the revolutionary Nexis Network.",
    author: {
      name: "Nexis Foundation",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-10-15",
    image: "/images/blog4.webp",
    url: "https://blog.nexis.network/the-great-migration-exzo-network-transforms-into-nexis-network-a-new-era-in-blockchain-93d957179840",
  },
]

export default function BlogCardCarousel() {
  return (
    <div className="relative w-full">
      <div className="w-full">
        <div className="border-b border-[#242424]">
          <div className="w-1/2 p-0 font-mono text-white">
            <div className="p-4">
              {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
              <span className="text-base">/// LATEST NEWS</span>
            </div>
          </div>
          <div className="h-full w-1/2 p-0">
            {/* Placeholder for BlockchainActions component */}
          </div>
        </div>
      </div>
      <Carousel className="w-full border-collapse py-4 pl-2">
        <CarouselContent>
          {sampleBlogPosts.map((post) => (
            <CarouselItem
              key={post.id}
              className="border-collapse rounded-lg pl-4 md:basis-1/2 lg:basis-1/4"
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Card className="flex h-full flex-col">
                  <AspectRatio ratio={16 / 9} className="bg-[#0a0a0a]">
                    <Image
                      src={post.image}
                      alt={`Cover image for ${post.title}`}
                      fill
                      className="rounded-t-lg object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </AspectRatio>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grow">
                    <div className="text-sm text-muted-foreground">
                      Published on {new Date(post.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={post.author.avatar}
                          alt={post.author.name}
                        />
                        <AvatarFallback>
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {post.author.name}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
