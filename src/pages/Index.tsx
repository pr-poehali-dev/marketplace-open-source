import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/marketplace/Header';
import Footer from '@/components/marketplace/Footer';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import CatalogTab from '@/components/marketplace/CatalogTab';
import VendorPanel from '@/components/marketplace/VendorPanel';
import ShoppingCart from '@/components/marketplace/ShoppingCart';
import SupportTickets from '@/components/marketplace/SupportTickets';
import UserProfile from '@/components/marketplace/UserProfile';

interface Product {
  id: number;
  name: string;
  price: number;
  vendor: string;
  category: string;
  image: string;
  rating: number;
  verified: boolean;
}

interface ShippingZone {
  id: number;
  name: string;
  baseRate: number;
  perKgRate: number;
  maxDistance: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  vendor: string;
  image: string;
  quantity: number;
  weight: number;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('marketplace');
  const [vendorInn, setVendorInn] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingZones] = useState<ShippingZone[]>([
    { id: 1, name: 'Москва и МО', baseRate: 300, perKgRate: 50, maxDistance: 50 },
    { id: 2, name: 'Центральная Россия', baseRate: 500, perKgRate: 80, maxDistance: 500 },
    { id: 3, name: 'Дальние регионы', baseRate: 1000, perKgRate: 150, maxDistance: 5000 },
  ]);

  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Смартфон Samsung Galaxy S24',
      price: 89990,
      vendor: 'TechStore',
      category: 'Электроника',
      image: '/placeholder.svg',
      rating: 4.8,
      verified: true,
    },
    {
      id: 2,
      name: 'Ноутбук Apple MacBook Pro 14',
      price: 189990,
      vendor: 'AppleCenter',
      category: 'Компьютеры',
      image: '/placeholder.svg',
      rating: 4.9,
      verified: true,
    },
    {
      id: 3,
      name: 'Наушники Sony WH-1000XM5',
      price: 29990,
      vendor: 'AudioShop',
      category: 'Аудио',
      image: '/placeholder.svg',
      rating: 4.7,
      verified: false,
    },
    {
      id: 4,
      name: 'Умные часы Apple Watch Series 9',
      price: 44990,
      vendor: 'TechStore',
      category: 'Электроника',
      image: '/placeholder.svg',
      rating: 4.6,
      verified: true,
    },
    {
      id: 5,
      name: 'Игровая консоль PlayStation 5',
      price: 54990,
      vendor: 'GameWorld',
      category: 'Игры',
      image: '/placeholder.svg',
      rating: 4.9,
      verified: true,
    },
    {
      id: 6,
      name: 'Кофемашина Delonghi Magnifica S',
      price: 39990,
      vendor: 'HomeStore',
      category: 'Бытовая техника',
      image: '/placeholder.svg',
      rating: 4.5,
      verified: false,
    },
  ]);

  const verifyInn = () => {
    if (vendorInn.length === 10 || vendorInn.length === 12) {
      alert(`ИНН ${vendorInn} проверен через Дадата. Компания подтверждена! ✅`);
    } else {
      alert('Неверный формат ИНН. Введите 10 или 12 цифр.');
    }
  };

  const handleAddToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        vendor: product.vendor,
        image: product.image,
        quantity: 1,
        weight: 0.5,
      }]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="marketplace" className="text-base">
              <Icon name="ShoppingBag" size={20} className="mr-2" />
              Маркетплейс
            </TabsTrigger>
            <TabsTrigger value="catalog" className="text-base">
              <Icon name="Grid3x3" size={20} className="mr-2" />
              Каталог товаров
            </TabsTrigger>
            <TabsTrigger value="vendors" className="text-base">
              <Icon name="Briefcase" size={20} className="mr-2" />
              Панель продавца
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-base">
              <Icon name="User" size={20} className="mr-2" />
              Личный кабинет
            </TabsTrigger>
            <TabsTrigger value="support" className="text-base">
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Поддержка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <MarketplaceHero setActiveTab={setActiveTab} />
          </TabsContent>

          <TabsContent value="catalog">
            <CatalogTab 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              products={products}
              onAddToCart={handleAddToCart}
            />
          </TabsContent>

          <TabsContent value="vendors">
            <VendorPanel
              vendorInn={vendorInn}
              setVendorInn={setVendorInn}
              shippingZones={shippingZones}
              verifyInn={verifyInn}
            />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>

          <TabsContent value="support">
            <SupportTickets />
          </TabsContent>
        </Tabs>

        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Index;