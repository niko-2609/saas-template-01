// components/Layout.js
// 

"use client"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

export default function Layout({ children }: {children: React.ReactNode}) {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background shadow-sm">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Company Name</h1>
          <div className="flex items-center space-x-6">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
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
                <DropdownMenuItem onSelect={() => console.log('Sign out')}>
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
          &copy; {new Date().getFullYear()} Company Name. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
