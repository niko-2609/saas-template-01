// components/Layout.js
// 

"use client"
import Link from 'next/link';
import { SessionProvider } from "next-auth/react"
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
export default function Layout({ children }: {children: React.ReactNode}) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <SessionProvider>
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background shadow-sm">
        <div className="max-w-7xl mx-auto py-4  px-8 flex justify-between items-center">
          <h1 className="text-3xl text-[#019992] font-bold">Tripsy</h1>
          <div className="flex items-center space-x-6 font-semibold">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-md text-[#019992]">Dashboard</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="text-md text-[#019992]">About</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="text-md text-[#019992]">Pricing</Button>
            </Link>
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

      {/* Main content area */}
      <main className="flex-grow">
        <section className="max-w-7xl mx-auto p-6">{children}</section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto p-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tripsy. All rights reserved.
        </div>
      </footer>
    </div>
    </SessionProvider>
  );
}
