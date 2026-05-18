/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FoodGrid } from "./components/FoodGrid";
import { ChefAssistant } from "./components/ChefAssistant";
import { FoodItem, CartItem } from "./types";
import { motion } from "motion/react";
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: FoodItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar 
        cart={cart} 
        cartCount={cartCount} 
        onUpdateQuantity={updateQuantity} 
        onRemove={removeFromCart} 
      />
      
      <main>
        <Hero />
        
        <FoodGrid onAddToCart={addToCart} />

        <ChefAssistant />

        {/* Features / Story Section */}
        <section className="bg-black text-white py-24">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-5xl font-serif font-bold italic">Our Farm to Table Philosophy</h2>
              <p className="text-xl text-white/70 font-light leading-relaxed">
                We believe that the best meals start with the best ingredients. That's why we partner exclusively with local artisans and sustainable farms to bring you flavors that are as honest as they are extraordinary.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-yellow-500 font-serif text-2xl mb-2">100% Organic</h4>
                  <p className="text-sm text-white/50">Sourced from certified sustainable farms.</p>
                </div>
                <div>
                  <h4 className="text-yellow-500 font-serif text-2xl mb-2">Artisan Made</h4>
                  <p className="text-sm text-white/50">Handcrafted by experts in their trade.</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <img 
                src="https://picsum.photos/seed/chef/1000/1000" 
                alt="Chef at work" 
                className="w-full h-full object-cover rounded-none grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* Newsletter / Contact */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl font-serif font-bold mb-6">Join the Garden Circle</h2>
            <p className="text-muted-foreground mb-10">Subscribe to receive exclusive invitations to our tasting events and seasonal recipes.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-6 py-4 border border-black/20 focus:border-black outline-none transition-colors rounded-none"
              />
              <button className="bg-black text-white px-10 py-4 hover:bg-black/90 transition-colors rounded-none font-medium uppercase tracking-widest text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-muted/30 pt-20 pb-10 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-serif font-bold mb-6">Gourmet Garden</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Redefining the artisan food experience through passion, quality, and timeless culinary traditions.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-yellow-600 transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-yellow-600 transition-colors"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-yellow-600 transition-colors"><Twitter className="h-5 w-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-black transition-colors">Private Dining</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Catering</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Franchise</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3"><MapPin className="h-4 w-4" /> 123 Artisan Way, Foodie City</li>
                <li className="flex items-center gap-3"><Phone className="h-4 w-4" /> +1 (555) 000-0000</li>
                <li className="flex items-center gap-3"><Mail className="h-4 w-4" /> hello@gourmetgarden.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© 2026 Gourmet Garden. All rights reserved.</p>
            <p>Handcrafted with passion in Foodie City.</p>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
