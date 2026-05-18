/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { FoodItem } from "../types";
import { FOOD_ITEMS } from "../constants";

interface FoodGridProps {
  onAddToCart: (item: FoodItem) => void;
}

export function FoodGrid({ onAddToCart }: FoodGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Starters", "Main Course", "Salads", "Desserts", "Beverages"];
  
  const filteredItems = activeCategory === "All" 
    ? FOOD_ITEMS 
    : FOOD_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-serif font-bold mb-4">Discover Our Menu</h2>
        <div className="h-1 w-20 bg-yellow-500 mb-8" />
        
        <Tabs defaultValue="All" onValueChange={setActiveCategory} className="w-full">
          <TabsList className="flex flex-wrap justify-center h-auto bg-transparent gap-2">
            {categories.map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat}
                className="rounded-none border px-6 py-2 data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:border-black"
              >
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border-none shadow-none group overflow-hidden bg-transparent">
                <CardHeader className="p-0 overflow-hidden relative">
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.tags?.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-white/90 text-black text-[10px] py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="px-0 py-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif font-bold">{item.name}</h3>
                    <span className="font-medium text-lg">${item.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="px-0 pt-0">
                  <Button 
                    className="w-full rounded-none border-black hover:bg-black hover:text-white" 
                    variant="outline"
                    onClick={() => onAddToCart(item)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add to Basket
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
