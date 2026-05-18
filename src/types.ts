/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Starters" | "Main Course" | "Salads" | "Desserts" | "Beverages";
  image: string;
  tags?: string[];
}

export interface CartItem extends FoodItem {
  quantity: number;
}
