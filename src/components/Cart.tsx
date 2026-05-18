/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { CartItem } from "../types";

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export function Cart({ items, onUpdateQuantity, onRemove }: CartProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
        <p className="text-muted-foreground">Your basket is currently empty.</p>
        <Button variant="outline" className="rounded-none">Browse Menu</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-6">
        <div className="py-6 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 object-cover rounded-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">${item.price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border rounded-sm">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-xs">{item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-none"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-6 border-t bg-muted/30">
        <div className="space-y-4">
          <div className="flex justify-between font-medium">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Shipping and taxes calculated at checkout.
          </p>
          <Button className="w-full rounded-none py-6 text-lg bg-black text-white hover:bg-black/90">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
