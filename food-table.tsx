"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

// Sample data
const sampleData = [
  { food: "Ice cream", mentions: 12, upvotes: 145 },
  { food: "Fried chicken", mentions: 9, upvotes: 120 },
  { food: "Soda", mentions: 7, upvotes: 98 },
  { food: "Pizza", mentions: 15, upvotes: 210 },
  { food: "Chocolate", mentions: 11, upvotes: 132 },
  { food: "Donuts", mentions: 6, upvotes: 87 },
  { food: "Cake", mentions: 8, upvotes: 105 },
  { food: "Cookies", mentions: 5, upvotes: 76 },
  { food: "Pasta", mentions: 10, upvotes: 118 },
  { food: "Burgers", mentions: 14, upvotes: 189 },
  { food: "French fries", mentions: 13, upvotes: 156 },
  { food: "Milkshakes", mentions: 4, upvotes: 67 },
  { food: "Tacos", mentions: 8, upvotes: 112 },
  { food: "Candy", mentions: 7, upvotes: 94 },
  { food: "Pastries", mentions: 5, upvotes: 82 },
  { food: "Bread", mentions: 6, upvotes: 78 },
  { food: "Pancakes", mentions: 4, upvotes: 65 },
  { food: "Waffles", mentions: 3, upvotes: 59 },
  { food: "Cupcakes", mentions: 5, upvotes: 73 },
  { food: "Brownies", mentions: 6, upvotes: 88 },
  { food: "Cheesecake", mentions: 7, upvotes: 96 },
  { food: "Popcorn", mentions: 4, upvotes: 62 },
  { food: "Nachos", mentions: 5, upvotes: 79 },
  { food: "Pretzels", mentions: 3, upvotes: 54 },
  { food: "Potato chips", mentions: 8, upvotes: 103 },
]

interface FoodItem {
  food: string
  mentions: number
  upvotes: number
}

interface FoodTableProps {
  data?: FoodItem[]
}

export default function FoodTable({ data = sampleData }: FoodTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredData, setFilteredData] = useState<FoodItem[]>(data)
  const rowsPerPage = 10

  // Filter data based on search term
  useEffect(() => {
    const filtered = data.filter((item) => item.food.toLowerCase().includes(searchTerm.toLowerCase()))
    setFilteredData(filtered)
    setCurrentPage(1) // Reset to first page when search changes
  }, [searchTerm, data])

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage)

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 3

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        pages.push(1, 2, 3)
      } else if (currentPage >= totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1)
      }
    }

    return pages
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0f0f0f] text-[#e5e5e5] p-6 rounded-lg">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#1a1a1a] border-[#333] text-[#e5e5e5] placeholder:text-gray-500 focus-visible:ring-[#333] focus-visible:ring-offset-[#0f0f0f]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-[#333] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#1a1a1a]">
              <TableRow className="hover:bg-[#252525] border-b border-[#333]">
                <TableHead className="text-[#e5e5e5] font-medium">Food</TableHead>
                <TableHead className="text-[#e5e5e5] font-medium text-right">Mentions</TableHead>
                <TableHead className="text-[#e5e5e5] font-medium text-right">Upvotes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <TableRow key={index} className="hover:bg-[#252525] border-b border-[#333] transition-colors">
                    <TableCell className="font-medium">{item.food}</TableCell>
                    <TableCell className="text-right">{item.mentions}</TableCell>
                    <TableCell className="text-right">{item.upvotes}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    No matching foods found. Try another search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-end text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">
            Viewing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
          <div className="flex items-center">
            <button
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1)
              }}
              disabled={currentPage === 1}
              className="h-8 w-8 flex items-center justify-center rounded bg-[#1a1a1a] text-[#e5e5e5] disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="h-8 w-8 flex items-center justify-center text-[#e5e5e5] mx-1">{currentPage}</div>
            <button
              onClick={() => {
                if (currentPage < totalPages) setCurrentPage(currentPage + 1)
              }}
              disabled={currentPage === totalPages}
              className="h-8 w-8 flex items-center justify-center rounded bg-[#1a1a1a] text-[#e5e5e5] disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
