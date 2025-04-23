import FoodTable from "@/food-table"

export default function Home() {
  // You can pass custom data here if needed
  const data = [
    { food: "Ice cream", mentions: 12, upvotes: 145 },
    { food: "Fried chicken", mentions: 9, upvotes: 120 },
    { food: "Soda", mentions: 7, upvotes: 98 },
    // Add more data as needed
  ]

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#0f0f0f]">
      <FoodTable />
    </main>
  )
}
