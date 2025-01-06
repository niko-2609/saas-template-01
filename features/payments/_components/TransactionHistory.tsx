'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSubscription } from '../context/subscriptionContext'
import { getInvoices } from '../server/getInvoices'
import { format } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'

interface Invoice {
  id: string
  subscription_id: string
  payment_id: string
  status: string
  amount: number
  amount_paid: number
  issued_at: number
  paid_at: number
  currency: string
  billing_start: number
  billing_end: number
}

export default function TransactionHistory() {
  const { subscriptionId, status } = useSubscription()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchInvoices() {
      if (!subscriptionId || !status) {
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const result = await getInvoices(subscriptionId)
        if (result.error) {
          setError(result.error)
        } else if (result.success) {
          setInvoices(result.invoices)
        }
      } catch (err) {
        setError(`Failed to fetch transaction history: ${err}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [subscriptionId, status])

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'MMM dd, yyyy')
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>View your payment history and invoices</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !status ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : invoices.length === 0 ? (
          <p className="text-muted-foreground">No transactions found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Billing Period</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{formatDate(invoice.issued_at)}</TableCell>
                  <TableCell>
                    <span className={`capitalize ${
                      invoice.status === 'paid' 
                        ? 'text-green-600' 
                        : 'text-yellow-600'
                    }`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDate(invoice.billing_start)} - {formatDate(invoice.billing_end)}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(invoice.amount, invoice.currency)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

