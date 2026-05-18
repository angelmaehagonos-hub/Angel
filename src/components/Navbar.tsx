/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, Menu as MenuIcon, User as UserIcon, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Cart } from "./Cart";
import { CartItem } from "../types";
import { signInWithGoogle, logout } from "../lib/firebase";
import { useAuth } from "./AuthContext";

import { SettingsModal } from "./SettingsModal";

interface NavbarProps {
  cart: CartItem[];
  cartCount: number;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export function Navbar({ cart, cartCount, onUpdateQuantity, onRemove }: NavbarProps) {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MenuIcon className="h-6 w-6 md:hidden" />
          <h1 className="text-2xl font-serif font-bold tracking-tight">Gourmet Garden</h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Button variant="link" className="text-foreground/60 hover:text-foreground">Menu</Button>
          <Button variant="link" className="text-foreground/60 hover:text-foreground">About</Button>
          <Button variant="link" className="text-foreground/60 hover:text-foreground">Visit Us</Button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <SettingsModal />

          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex flex-col items-end mr-1">
                <span className="text-xs font-medium line-clamp-1">{user.displayName}</span>
                <span className="text-[10px] text-muted-foreground line-clamp-1">{user.email}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full overflow-hidden border p-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <UserIcon className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={logout} title="Sign Out" className="h-9 w-9">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" className="hidden sm:flex h-9 rounded-none px-4" onClick={signInWithGoogle}>
              Sign In
            </Button>
          )}

          <Sheet>
            <SheetTrigger render={<Button variant="outline" size="icon" className="relative h-9 w-9" />}>
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px] rounded-full"
                  >
                    {cartCount}
                  </Badge>
                )}
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="font-serif">Your Garden Basket</SheetTitle>
              </SheetHeader>
              <Cart 
                items={cart} 
                onUpdateQuantity={onUpdateQuantity} 
                onRemove={onRemove} 
              />
            </SheetContent>
          </Sheet>
          
          {!user && (
             <Button variant="outline" size="icon" className="sm:hidden h-9 w-9" onClick={signInWithGoogle}>
                <UserIcon className="h-4 w-4" />
             </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
