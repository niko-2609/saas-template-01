// components/Layout.js

"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { SubscriptionProvider, useSubscription } from '@/features/payments/context/subscriptionContext';

// Create a separate component for the navbar to use the hook
function Navbar() {
  const { isSubscribed, isLoading } = useSubscription()

  const NavButton = ({ href, children, isLoading }: { 
    href: string; 
    children?: React.ReactNode; 
    isLoading?: boolean 
  }) => (
    <Link href={href}>
      <Button 
        variant="ghost" 
        className={`text-md text-[#019992] font-semibold min-w-[90px] relative overflow-hidden
          ${isLoading ? 'pointer-events-none' : ''}`}
      >
        {isLoading ? (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
        ) : children}
      </Button>
    </Link>
  )

  // Don't render any text until everything is loaded
  if (isLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-background shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-8 flex justify-between items-center">
          <Link href="/">
              <h1 className="text-3xl text-[#019992] font-bold">Tripsy</h1>
          </Link>
          <div className="flex items-center space-x-6 font-semibold">
            <NavButton href="#" isLoading />
            <NavButton href="#" isLoading />
            <NavButton href="#" isLoading />
            <DropdownMenu>
              <DropdownMenuTrigger style={{outlineWidth: 0}}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer" />
              </DropdownMenuTrigger>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-8 flex justify-between items-center">
        <h1 className="text-3xl text-[#019992] font-bold">Tripsy</h1>
        <div className="flex items-center space-x-6 font-semibold">
          <NavButton href="/dashboard">Dashboard</NavButton>
          <NavButton href="/about">About</NavButton>
          <NavButton href={isSubscribed ? "/subscription" : "/pricing"}>
            {isSubscribed ? "Manage Subscription" : "Pricing"}
          </NavButton>
          <DropdownMenu>
            <DropdownMenuTrigger style={{outlineWidth: 0}}>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/profile-pic.jpg" alt="Profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => signOut()}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default function Layout({ children }: {children: React.ReactNode}) {
  return (
    <SubscriptionProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <section className="max-w-7xl mx-auto p-6">{children}</section>
        </main>
        <footer className="bg-background border-t">
          <div className="max-w-7xl mx-auto p-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Tripsy. All rights reserved.
          </div>
        </footer>
      </div>
    </SubscriptionProvider>
  );
}
