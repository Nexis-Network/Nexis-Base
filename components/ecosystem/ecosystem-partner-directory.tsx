import { useState, type SetStateAction } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dummy data for partners
const partners = Array(50)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Partner ${i + 1}`,
    category: ["Technology", "Finance", "Healthcare", "Education", "Retail"][
      Math.floor(Math.random() * 5)
    ],
    description: `Description for Partner ${
      i + 1
    }. This is a brief overview of what the partner does and how they contribute to the ecosystem.`,
    logo: `/placeholder.svg?height=100&width=100&text=P${i + 1}`,
  }))

// Categories derived from partner data
const categories = Array.from(new Set(partners.map((p) => p.category)))

export default function EcosystemPartnerDirectory() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPartners = selectedCategory
    ? partners.filter((p) => p.category === selectedCategory)
    : partners

  const totalPages = Math.ceil(filteredPartners.length / 12)
  const currentPartners = filteredPartners.slice(
    (currentPage - 1) * 12,
    currentPage * 12
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Ecosystem Partner Directory</h1>

      <div className="mb-6">
        <Select
          onValueChange={(value: SetStateAction<string | null>) => {
            setSelectedCategory(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPartners.map((partner) => (
          <Card key={partner.id} className="flex flex-col">
            <CardContent className="grow p-6">
              <div className="mb-4 flex items-center justify-between">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <span className="text-sm text-muted-foreground">
                  {partner.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2">{partner.name}</h2>
              <p className="text-muted-foreground">{partner.description}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
