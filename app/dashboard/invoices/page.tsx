'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CreditCard,
  Search,
  Download,
  MoreHorizontal,
  DollarSign,
  Clock,
  CheckCircle,
} from 'lucide-react';

const invoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: 2500, status: 'paid', date: '2024-01-15', items: 3 },
  { id: 'INV-002', client: 'TechStart', amount: 4500, status: 'pending', date: '2024-01-18', items: 5 },
  { id: 'INV-003', client: 'FreshFoods', amount: 1200, status: 'paid', date: '2024-01-10', items: 2 },
  { id: 'INV-004', client: 'ShopNow', amount: 8900, status: 'overdue', date: '2024-01-05', items: 8 },
  { id: 'INV-005', client: 'GreenEnergy', amount: 3200, status: 'pending', date: '2024-01-20', items: 4 },
  { id: 'INV-006', client: 'FinCorp', amount: 5600, status: 'paid', date: '2024-01-12', items: 6 },
];

const statusColors: Record<string, string> = {
  paid: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  overdue: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export default function InvoicesPage() {
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = invoices.filter(i => i.status === 'overdue').reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Invoices</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage billing and payments
          </p>
        </div>
        <Button size="sm">
          <CreditCard className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Revenue</CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <DollarSign className="w-5 h-5 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">From paid invoices</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</CardTitle>
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">${pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Overdue</CardTitle>
            <div className="p-2 rounded-lg bg-rose-500/10">
              <CheckCircle className="w-5 h-5 text-rose-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">${overdueAmount.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">Needs follow-up</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Invoices</CardTitle>
              <CardDescription>View and manage all invoices</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-slate-500 font-medium">Invoice</TableHead>
                <TableHead className="text-slate-500 font-medium">Client</TableHead>
                <TableHead className="text-slate-500 font-medium">Amount</TableHead>
                <TableHead className="text-slate-500 font-medium">Status</TableHead>
                <TableHead className="text-slate-500 font-medium">Date</TableHead>
                <TableHead className="text-slate-500 font-medium">Items</TableHead>
                <TableHead className="text-slate-500 font-medium"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    {invoice.id}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">{invoice.client}</TableCell>
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    ${invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[invoice.status]} variant="outline">
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400">{invoice.date}</TableCell>
                  <TableCell className="text-slate-500 dark:text-slate-400">{invoice.items}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}