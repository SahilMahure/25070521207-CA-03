const menuItems = [
  // COFFEE
  {
    id: "c1",
    name: "Velvet Signature Latte",
    category: "Coffee",
    price: 5.25,
    rating: 4.9,
    reviewsCount: 230,
    description: "Double ristretto espresso, velvety micro-foam steamed milk, subtle Madagascar vanilla.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "c2",
    name: "Golden Caramel Macchiato",
    category: "Coffee",
    price: 5.75,
    rating: 4.8,
    reviewsCount: 185,
    description: "Freshly brewed espresso poured over vanilla steamed milk with buttery homemade caramel drizzle.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "c3",
    name: "Smoked Spanish Cortado",
    category: "Coffee",
    price: 4.50,
    rating: 4.7,
    reviewsCount: 94,
    description: "Equal parts intense dark roast espresso and warm textured milk served in a faceted glass.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "c4",
    name: "Cold Brew Reserve",
    category: "Coffee",
    price: 4.95,
    rating: 4.9,
    reviewsCount: 160,
    description: "Steeped slowly for 20 hours in cold filtered water; notes of chocolate and sweet stone fruit.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=700&q=80"
  },

  // TEA
  {
    id: "t1",
    name: "Kyoto Ceremonial Matcha",
    category: "Tea",
    price: 5.50,
    rating: 4.8,
    reviewsCount: 140,
    description: "Stone-ground Japanese matcha whisked with creamy oat milk and a touch of wild honey.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "t2",
    name: "Artisan Masala Chai",
    category: "Tea",
    price: 4.25,
    rating: 4.9,
    reviewsCount: 210,
    description: "Slow-simmered Assam black tea with crushed cardamom, cinnamon bark, ginger, and full cream milk.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "t3",
    name: "Hibiscus Peach Iced Brew",
    category: "Tea",
    price: 4.75,
    rating: 4.6,
    reviewsCount: 78,
    description: "Tart Egyptian hibiscus flower petals steeped with white peach nectar and garden mint.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "t4",
    name: "Earl Grey Lavender Fog",
    category: "Tea",
    price: 4.95,
    rating: 4.7,
    reviewsCount: 92,
    description: "Bergamot-infused organic Earl Grey with fragrant lavender blossom syrup and silky warm froth.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=700&q=80"
  },

  // SHAKES
  {
    id: "s1",
    name: "Belgian Dark Chocolate Shake",
    category: "Shakes",
    price: 6.95,
    rating: 4.9,
    reviewsCount: 195,
    description: "Rich 70% Callebaut chocolate gelato blended with fudge swirl and cacao nib toppings.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "s2",
    name: "Roasted Hazelnut Mocha Shake",
    category: "Shakes",
    price: 7.25,
    rating: 4.8,
    reviewsCount: 130,
    description: "Espresso shot blended with roasted hazelnut spread, milk gelato, and dark chocolate flakes.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "s3",
    name: "Wild Berry Bliss Shake",
    category: "Shakes",
    price: 6.50,
    rating: 4.7,
    reviewsCount: 88,
    description: "Blueberries, strawberries, raspberries, Greek yogurt, and almond milk with chia seed crunch.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "s4",
    name: "Salted Caramel Pretzel Frappe",
    category: "Shakes",
    price: 7.00,
    rating: 4.9,
    reviewsCount: 145,
    description: "Creamy vanilla frappe with hand-swirled sea salt caramel, topped with pretzel crumb crunch.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80"
  },

  // BREAKFAST
  {
    id: "b1",
    name: "Truffle Avocado Sourdough Toast",
    category: "Breakfast",
    price: 9.50,
    rating: 4.9,
    reviewsCount: 220,
    description: "Rustic artisan sourdough topped with smashed Hass avocado, cherry tomatoes, feta, and truffle glaze.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b2",
    name: "Classic Eggs Benedict & Smoked Salmon",
    category: "Breakfast",
    price: 11.75,
    rating: 4.8,
    reviewsCount: 180,
    description: "Poached farm eggs, Atlantic smoked salmon, velvety citrus hollandaise on toasted English muffins.",
    isVeg: false,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b3",
    name: "Fluffy Buttermilk Pancakes",
    category: "Breakfast",
    price: 8.95,
    rating: 4.8,
    reviewsCount: 165,
    description: "Triple stack golden buttermilk pancakes with churned maple butter, fresh berries, and warm syrup.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "b4",
    name: "Mediterranean Shakshuka",
    category: "Breakfast",
    price: 10.25,
    rating: 4.7,
    reviewsCount: 112,
    description: "Cast-iron skillet simmered vine tomatoes, bell peppers, poached eggs, and goat cheese with pita bread.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=700&q=80"
  },

  // SNACKS
  {
    id: "sn1",
    name: "Sundried Tomato & Pesto Panini",
    category: "Snacks",
    price: 8.50,
    rating: 4.8,
    reviewsCount: 150,
    description: "Crispy grilled ciabatta with buffalo mozzarella, basil pine nut pesto, and sweet sundried tomatoes.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "sn2",
    name: "Smoked Chicken Bacon Club",
    category: "Snacks",
    price: 9.75,
    rating: 4.9,
    reviewsCount: 205,
    description: "Triple decker toasted brioche with herb-roasted chicken breast, crispy bacon, aged cheddar, and garlic aioli.",
    isVeg: false,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "sn3",
    name: "Parmesan Truffle Fries",
    category: "Snacks",
    price: 6.25,
    rating: 4.9,
    reviewsCount: 260,
    description: "Crisp hand-cut potato fries tossed in Italian white truffle oil, rosemary sea salt, and grated aged Parmigiano.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "sn4",
    name: "Falafel Mezze Platter",
    category: "Snacks",
    price: 8.75,
    rating: 4.7,
    reviewsCount: 95,
    description: "Golden herb falafels served with velvety garlic hummus, pickled cucumbers, kalamata olives, and warm pita.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80"
  },

  // DESSERTS
  {
    id: "d1",
    name: "Artisanal Tiramisu Classico",
    category: "Desserts",
    price: 7.50,
    rating: 5.0,
    reviewsCount: 310,
    description: "Espresso-dipped savoiardi ladyfingers layered with whipped mascarpone cream and raw cacao powder dusting.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "d2",
    name: "Warm Molten Lava Cake",
    category: "Desserts",
    price: 8.25,
    rating: 4.9,
    reviewsCount: 240,
    description: "Rich bittersweet chocolate cake with an oozing molten core, served with Madagascar vanilla bean gelato.",
    isVeg: true,
    isBestseller: true,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "d3",
    name: "New York Berry Cheesecake",
    category: "Desserts",
    price: 7.25,
    rating: 4.8,
    reviewsCount: 190,
    description: "Velvety baked cream cheese on a buttery graham cracker crust, topped with house raspberry coulis.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "d4",
    name: "Almond Butter Croissant",
    category: "Desserts",
    price: 4.95,
    rating: 4.8,
    reviewsCount: 175,
    description: "Flaky French butter pastry double-baked with frangipane almond cream and toasted sliced almonds.",
    isVeg: true,
    isBestseller: false,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80"
  }
];

module.exports = menuItems;
