import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  { id: 1, date: '2023-05-01', amount: 29.99, description: 'Monthly subscription' },
  { id: 2, date: '2023-04-01', amount: 29.99, description: 'Monthly subscription' },
  { id: 3, date: '2023-03-01', amount: 29.99, description: 'Monthly subscription' },
  { id: 4, date: '2023-02-01', amount: 29.99, description: 'Monthly subscription' },
  { id: 5, date: '2023-01-01', amount: 29.99, description: 'Monthly subscription' },
]

export default function TransactionHistory() {
  return (
    <Card className="border-[#019992] border-2">
      <CardHeader className="bg-[#019992] text-white">
        <CardTitle>Transaction History</CardTitle>
        <CardDescription className="text-gray-100">Your recent transactions for TravelAI</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#019992]">Date</TableHead>
              <TableHead className="text-[#019992]">Description</TableHead>
              <TableHead className="text-[#019992] text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

