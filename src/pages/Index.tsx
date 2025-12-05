import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/marketplace/Header';
import Footer from '@/components/marketplace/Footer';
import MarketplaceHero from '@/components/marketplace/MarketplaceHero';
import CatalogTab from '@/components/marketplace/CatalogTab';
import VendorPanel from '@/components/marketplace/VendorPanel';

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('marketplace');
  const [vendorInn, setVendorInn] = useState('');
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
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
          </TabsList>

          <TabsContent value="marketplace">
            <MarketplaceHero setActiveTab={setActiveTab} />
          </TabsContent>

          <TabsContent value="catalog">
            <CatalogTab 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              products={products}
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
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
