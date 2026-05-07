export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Tandoori' | 'Main Course' | 'Breads' | 'Beverages';
  image: string;
  isVegetarian: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
