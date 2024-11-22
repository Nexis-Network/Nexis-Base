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
}

const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Persona Generator",
    excerpt:
      "Create detailed user personas for your product research and development",
    author: {
      name: "Nexis Foundatiion",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-01-15",
    image: blog1Image.src,
  },
  {
    id: 2,
    title: "Facebook Replies",
    excerpt: "Automate and optimize your social media engagement strategy",
    author: {
      name: "Nexis Foundatiion",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-01-20",
    image: "/images/blog2.webp",
  },
  {
    id: 3,
    title: "Amazon Product Headlines",
    excerpt: "Generate compelling product titles that drive conversions",
    author: {
      name: "Nexis Foundatiion",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-01-25",
    image: "/images/blog3.webp",
  },
  {
    id: 4,
    title: "Unlock the Future of Crypto with Nexis Network",
    excerpt:
      "The blockchain universe is vast and ever-evolving, brimming with endless possibilities and a myriad of networks...",
    author: {
      name: "Nexis Foundatiion",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    date: "2024-02-01",
    image: "/images/blog4.webp",
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
                      <p className="text-sm font-medium">{post.author.name}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
