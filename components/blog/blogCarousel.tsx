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
        <div className="border-b border-[#181F25]/70">
          <div className="w-1/2 p-0 font-mono text-[#F2F4F3]">
            <div className="p-4">
              {/* biome-ignore lint/suspicious/noCommentText: <explanation> */}
              <span className="text-base">/// LATEST NEWS</span>
            </div>
          </div>
        </div>
      </div>
      <Carousel className="w-full border-collapse py-4 pl-4">
        <CarouselContent>
          {sampleBlogPosts.map((post) => (
            <CarouselItem
              key={post.id}
              className="border-collapse rounded-lg pl-6 md:basis-1/2 lg:basis-1/4"
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <Card className="flex h-full flex-col">
                  <AspectRatio ratio={16 / 9} className="bg-[#07090b]">
                    <Image
                      src={post.image}
                      alt={`Cover image for ${post.title}`}
                      fill
                      className="rounded-t-lg object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </AspectRatio>
                  <CardHeader>
                    <CardTitle className="line-clamp-2 leading-6">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 pt-2">
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
                      <Avatar size-18>
                        <svg
                          width="163"
                          height="163"
                          viewBox="0 0 163 163"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>Nexis Foundation blog posts</title>
                          <path
                            opacity="0.2"
                            d="M81.5 163C126.511 163 163 126.511 163 81.5C163 36.4888 126.511 0 81.5 0C36.4888 0 0 36.4888 0 81.5C0 126.511 36.4888 163 81.5 163Z"
                            fill="#C2FF75"
                          />
                          <path
                            d="M51.7726 113.606C51.7757 113.606 51.7787 113.607 51.7809 113.609C51.7999 113.628 51.8194 113.647 51.8392 113.666C51.9326 113.756 52.0863 113.741 52.1606 113.635L54.9589 109.638C55.0265 109.541 55.0875 109.439 55.1402 109.334C57.6035 104.412 58.5651 99.9187 58.5936 96.0886C58.555 94.0179 58.2662 91.9662 57.7464 89.9726C57.3805 88.7726 57.111 87.5337 56.9377 86.2853C56.9377 86.2756 56.9377 86.2563 56.9377 86.2369C56.8221 85.4046 56.7451 84.553 56.7067 83.7013C56.178 70.0001 66.7524 58.2574 80.3339 57.4493C80.3581 57.4478 80.3689 57.418 80.351 57.4018V57.4018C80.3331 57.3856 80.3428 57.356 80.3669 57.3546C83.6092 57.1644 88.3003 57.8645 92.2408 56.8262C96.3519 55.6551 100.087 53.3808 103.052 50.2451C103.091 50.2037 103.131 50.1637 103.172 50.125C103.395 49.9164 103.623 49.7107 103.798 49.4611L104.894 47.9001C105.684 46.775 105.413 45.2159 104.242 44.4954C92.8423 37.479 78.3892 35.8163 65.0631 41.2932C42.8434 50.4098 32.1956 75.9204 41.2741 98.2566C43.5462 103.841 46.829 108.699 50.834 112.696C51.141 113.005 51.448 113.303 51.7644 113.603C51.7666 113.605 51.7695 113.606 51.7726 113.606V113.606Z"
                            fill="#C2FF75"
                          />
                          <path
                            d="M108.574 53.119C108.434 53.3183 108.332 53.54 108.236 53.764C108.198 53.8545 108.154 53.9437 108.103 54.0292C105.475 58.9745 104.358 66.4459 104.599 69.3976C104.987 74.2241 106.438 77.3839 106.045 81.0598C106.032 81.1817 106.025 81.3056 106.028 81.4281C106.275 94.9547 95.7347 106.412 82.3023 107.169C82.2832 107.17 82.2638 107.17 82.2446 107.17V107.17C79.2697 107.363 78.9232 107.073 76.1987 107.199C70.6323 107.448 64.698 109.765 60.5443 114.094C60.461 114.181 60.385 114.275 60.316 114.373L59.0938 116.121C58.2949 117.263 58.5946 118.835 59.7807 119.567C59.8748 119.625 59.9691 119.683 60.0635 119.742C60.4388 119.955 60.8143 120.158 61.1898 120.361C72.1745 126.187 85.5467 127.261 97.9368 122.171C120.157 113.044 130.804 87.5337 121.726 65.1973C119.623 60.0269 116.643 55.4739 113.032 51.6499C111.999 50.555 110.24 50.7438 109.375 51.9766L108.574 53.119Z"
                            fill="#C2FF75"
                          />
                        </svg>

                        <AvatarFallback>
                          <svg
                            width="163"
                            height="163"
                            viewBox="0 0 163 163"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <title>Nexis Foundation blog posts</title>
                            <path
                              opacity="0.2"
                              d="M81.5 163C126.511 163 163 126.511 163 81.5C163 36.4888 126.511 0 81.5 0C36.4888 0 0 36.4888 0 81.5C0 126.511 36.4888 163 81.5 163Z"
                              fill="#C2FF75"
                            />
                            <path
                              d="M51.7726 113.606C51.7757 113.606 51.7787 113.607 51.7809 113.609C51.7999 113.628 51.8194 113.647 51.8392 113.666C51.9326 113.756 52.0863 113.741 52.1606 113.635L54.9589 109.638C55.0265 109.541 55.0875 109.439 55.1402 109.334C57.6035 104.412 58.5651 99.9187 58.5936 96.0886C58.555 94.0179 58.2662 91.9662 57.7464 89.9726C57.3805 88.7726 57.111 87.5337 56.9377 86.2853C56.9377 86.2756 56.9377 86.2563 56.9377 86.2369C56.8221 85.4046 56.7451 84.553 56.7067 83.7013C56.178 70.0001 66.7524 58.2574 80.3339 57.4493C80.3581 57.4478 80.3689 57.418 80.351 57.4018V57.4018C80.3331 57.3856 80.3428 57.356 80.3669 57.3546C83.6092 57.1644 88.3003 57.8645 92.2408 56.8262C96.3519 55.6551 100.087 53.3808 103.052 50.2451C103.091 50.2037 103.131 50.1637 103.172 50.125C103.395 49.9164 103.623 49.7107 103.798 49.4611L104.894 47.9001C105.684 46.775 105.413 45.2159 104.242 44.4954C92.8423 37.479 78.3892 35.8163 65.0631 41.2932C42.8434 50.4098 32.1956 75.9204 41.2741 98.2566C43.5462 103.841 46.829 108.699 50.834 112.696C51.141 113.005 51.448 113.303 51.7644 113.603C51.7666 113.605 51.7695 113.606 51.7726 113.606V113.606Z"
                              fill="#C2FF75"
                            />
                            <path
                              d="M108.574 53.119C108.434 53.3183 108.332 53.54 108.236 53.764C108.198 53.8545 108.154 53.9437 108.103 54.0292C105.475 58.9745 104.358 66.4459 104.599 69.3976C104.987 74.2241 106.438 77.3839 106.045 81.0598C106.032 81.1817 106.025 81.3056 106.028 81.4281C106.275 94.9547 95.7347 106.412 82.3023 107.169C82.2832 107.17 82.2638 107.17 82.2446 107.17V107.17C79.2697 107.363 78.9232 107.073 76.1987 107.199C70.6323 107.448 64.698 109.765 60.5443 114.094C60.461 114.181 60.385 114.275 60.316 114.373L59.0938 116.121C58.2949 117.263 58.5946 118.835 59.7807 119.567C59.8748 119.625 59.9691 119.683 60.0635 119.742C60.4388 119.955 60.8143 120.158 61.1898 120.361C72.1745 126.187 85.5467 127.261 97.9368 122.171C120.157 113.044 130.804 87.5337 121.726 65.1973C119.623 60.0269 116.643 55.4739 113.032 51.6499C111.999 50.555 110.24 50.7438 109.375 51.9766L108.574 53.119Z"
                              fill="#C2FF75"
                            />
                          </svg>
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
