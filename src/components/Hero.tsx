/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      <img
        src="https://picsum.photos/seed/foodhero/1920/1080"
        alt="Gourmet Spread"
        className="absolute inset-0 h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="text-6xl md:text-8xl font-serif font-bold leading-none mb-6">
            Pure. Artisan. <br />
            <span className="text-yellow-400">Extraordinary.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light tracking-wide">
            Experience the finest seasonal ingredients, handcrafted by master chefs for your ultimate culinary delight.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="rounded-none px-8 py-6 text-lg bg-yellow-500 hover:bg-yellow-600 text-black border-none">
              Explore Menu
            </Button>
            <Button size="lg" variant="outline" className="rounded-none px-8 py-6 text-lg bg-transparent border-white text-white hover:bg-white hover:text-black">
              Reserve a Table
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
