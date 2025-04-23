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
  const rowHeight = 50 // Define a fixed row height as a number for consistent calculations

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

  // Calculate how many placeholder rows we need
  const placeholderCount = Math.max(0, rowsPerPage - paginatedData.length)

  // Check if we have an exact match for a food name and get that food
  const exactMatchFood = searchTerm.trim() !== "" ? 
    data.find(item => item.food.toLowerCase() === searchTerm.toLowerCase()) : null
  
  // Show collision alert for exact matches
  const showCollisionAlert = exactMatchFood !== null

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

      {/* Fixed height container to ensure consistent table height */}
      <div className="relative">
        {/* Table with fixed height */}
        <div className="rounded-md border border-[#333] overflow-hidden" style={{ height: `${rowHeight * (rowsPerPage + 1)}px` }}>
          <div className="overflow-x-auto h-full">
            <Table>
              <TableHeader className="bg-[#1a1a1a]">
                <TableRow style={{ height: `${rowHeight}px` }}>
                  <TableHead className="text-[#e5e5e5] font-medium py-0">Food</TableHead>
                  <TableHead className="text-[#e5e5e5] font-medium text-right py-0">Mentions</TableHead>
                  <TableHead className="text-[#e5e5e5] font-medium text-right py-0">Upvotes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  <>
                    {/* Actual data rows */}
                    {paginatedData.map((item, index) => (
                      <TableRow 
                        key={index} 
                        className="hover:bg-[#252525] transition-colors border-b border-[#333]"
                        style={{ height: `${rowHeight}px` }}
                      >
                        <TableCell className="font-medium py-0">{item.food}</TableCell>
                        <TableCell className="text-right py-0">{item.mentions}</TableCell>
                        <TableCell className="text-right py-0">{item.upvotes}</TableCell>
                      </TableRow>
                    ))}
                    
                    {/* Placeholder rows to maintain fixed height */}
                    {placeholderCount > 0 && Array(placeholderCount).fill(0).map((_, index) => (
                      <TableRow 
                        key={`placeholder-${index}`} 
                        className={`border-b border-[#333] border-dashed ${index === 0 && showCollisionAlert ? "opacity-100" : "opacity-30"}`}
                        style={{ height: `${rowHeight}px` }}
                      >
                        {index === 0 && showCollisionAlert && exactMatchFood ? (
                          <TableCell colSpan={3} className="text-center py-0">
                            <div className="flex items-center justify-center space-x-2 text-gray-400 animate-pulse font-satoshi">
                              <span>🚨</span>
                              <span>Collision Alert: {exactMatchFood.food} inbound. Initiate avoidance manoeuvre...</span>
                            </div>
                          </TableCell>
                        ) : (
                          <>
                            <TableCell className="py-0"></TableCell>
                            <TableCell className="text-right py-0"></TableCell>
                            <TableCell className="text-right py-0"></TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <>
                    <TableRow style={{ height: `${rowHeight}px` }}>
                      <TableCell colSpan={3} className="text-center py-0">
                        No matching foods found. Try another search.
                      </TableCell>
                    </TableRow>
                    {/* Add placeholder rows even for empty results */}
                    {Array(rowsPerPage - 1).fill(0).map((_, index) => (
                      <TableRow 
                        key={`empty-placeholder-${index}`} 
                        className="border-b border-[#333] border-dashed opacity-30"
                        style={{ height: `${rowHeight}px` }}
                      >
                        <TableCell className="py-0"></TableCell>
                        <TableCell className="text-right py-0"></TableCell>
                        <TableCell className="text-right py-0"></TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination - fixed height to ensure consistency */}
      <div className="mt-8 flex items-center justify-end text-sm h-8">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 inline-block min-w-[150px] text-right">
            Viewing {filteredData.length > 0 ? `${startIndex + 1}-${Math.min(startIndex + rowsPerPage, filteredData.length)} of ${filteredData.length}` : '0-0 of 0'}
          </span>
          <div className="flex items-center">
            <button
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1)
              }}
              disabled={currentPage === 1 || filteredData.length <= rowsPerPage}
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
              disabled={currentPage === totalPages || filteredData.length <= rowsPerPage}
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
