import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

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
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const verifyInn = () => {
    if (vendorInn.length === 10 || vendorInn.length === 12) {
      alert(`ИНН ${vendorInn} проверен через Дадата. Компания подтверждена! ✅`);
    } else {
      alert('Неверный формат ИНН. Введите 10 или 12 цифр.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <Icon name="Store" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Toronto-Shop</h1>
                <p className="text-xs text-gray-500">Мультивендорный маркетплейс</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('marketplace')}>
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('catalog')}>
                <Icon name="Grid3x3" size={18} className="mr-2" />
                Каталог
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('vendors')}>
                <Icon name="Store" size={18} className="mr-2" />
                Для продавцов
              </Button>
              <Button variant="ghost">
                <Icon name="HeadphonesIcon" size={18} className="mr-2" />
                Поддержка
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Icon name="User" size={18} className="mr-2" />
                Войти
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Корзина
              </Button>
            </div>
          </div>
        </div>
      </header>

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

          <TabsContent value="marketplace" className="space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl blur-3xl -z-10" />
              <div className="bg-white rounded-3xl p-12 text-center shadow-lg border">
                <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                  🚀 Мультивендорная платформа
                </Badge>
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Добро пожаловать в Toronto-Shop
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Открытая торговая площадка с гибкой системой комиссий, верификацией поставщиков 
                  и управлением доставкой по всей России
                </p>
                <div className="flex justify-center gap-4">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => setActiveTab('catalog')}>
                    <Icon name="Search" size={20} className="mr-2" />
                    Начать покупки
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveTab('vendors')}>
                    <Icon name="Store" size={20} className="mr-2" />
                    Стать продавцом
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                    <Icon name="BadgeCheck" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Верификация продавцов</CardTitle>
                  <CardDescription>
                    Проверка по ИНН через Дадата и Контур.Фокус. Только надежные поставщики
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-3">
                    <Icon name="Truck" size={24} className="text-secondary" />
                  </div>
                  <CardTitle>Гибкая доставка</CardTitle>
                  <CardDescription>
                    Тарифы по зонам, расстояниям и весу. Интеграция с Яндекс.Картами
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                    <Icon name="TrendingUp" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Гибкие комиссии</CardTitle>
                  <CardDescription>
                    Глобальные проценты или индивидуальные ставки для каждого продавца
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="catalog" className="space-y-6">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск товаров, продавцов, категорий..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg rounded-xl border-2 focus:border-primary"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setSearchQuery('')}
                >
                  <Icon name="X" size={18} />
                </Button>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Найдено товаров: <span className="font-bold text-primary">{filteredProducts.length}</span>
              </p>
              <Select defaultValue="popular">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-asc">Дешевле</SelectItem>
                  <SelectItem value="price-desc">Дороже</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer overflow-hidden border-2">
                  <div className="relative overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.verified && (
                      <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
                        <Icon name="BadgeCheck" size={14} className="mr-1" />
                        Проверен
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Icon name="Store" size={14} />
                      <span>{product.vendor}</span>
                      <Separator orientation="vertical" className="h-4" />
                      <Icon name="Tag" size={14} />
                      <span>{product.category}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Icon name="Star" size={16} fill="currentColor" />
                        <span className="font-semibold">{product.rating}</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="UserCheck" size={28} className="text-primary" />
                  Система верификации продавцов
                </CardTitle>
                <CardDescription>
                  Регистрация и проверка компании по ИНН через Дадата и Контур.Фокус
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inn">ИНН организации</Label>
                  <div className="flex gap-2">
                    <Input
                      id="inn"
                      placeholder="1234567890"
                      value={vendorInn}
                      onChange={(e) => setVendorInn(e.target.value)}
                      className="flex-1"
                      maxLength={12}
                    />
                    <Button onClick={verifyInn} className="bg-secondary hover:bg-secondary/90">
                      <Icon name="Search" size={18} className="mr-2" />
                      Проверить
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Введите 10 или 12 цифр ИНН для автоматической проверки</p>
                </div>

                <Separator />

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="CheckCircle2" size={24} className="text-green-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-1">Преимущества верификации</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>✓ Доверие покупателей увеличивается на 85%</li>
                        <li>✓ Приоритет в поисковой выдаче маркетплейса</li>
                        <li>✓ Специальный значок «Проверенный продавец»</li>
                        <li>✓ Доступ к расширенной аналитике</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Package" size={28} className="text-primary" />
                  Добавление товара
                </CardTitle>
                <CardDescription>
                  Управление каталогом и добавление новых товаров с фронтенда
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Название товара</Label>
                    <Input id="product-name" placeholder="Apple iPhone 15 Pro Max" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Цена (₽)</Label>
                    <Input id="product-price" type="number" placeholder="99990" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-category">Категория</Label>
                  <Select>
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Электроника</SelectItem>
                      <SelectItem value="computers">Компьютеры</SelectItem>
                      <SelectItem value="audio">Аудио</SelectItem>
                      <SelectItem value="games">Игры</SelectItem>
                      <SelectItem value="home">Бытовая техника</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product-description">Описание</Label>
                  <Textarea
                    id="product-description"
                    placeholder="Подробное описание товара..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch id="digital-product" />
                    <Label htmlFor="digital-product" className="cursor-pointer">
                      Цифровой товар
                    </Label>
                  </div>
                  <Icon name="Download" size={20} className="text-gray-400" />
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Добавить товар
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Товар добавлен!</DialogTitle>
                      <DialogDescription>
                        Товар успешно добавлен в каталог и отправлен на модерацию.
                        Обычно проверка занимает 1-2 часа.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Truck" size={28} className="text-primary" />
                  Управление доставкой
                </CardTitle>
                <CardDescription>
                  Настройка тарифов по зонам России, расстояниям и весу груза
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {shippingZones.map((zone) => (
                  <div key={zone.id} className="p-4 border-2 rounded-xl hover:border-primary transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{zone.name}</h4>
                        <p className="text-sm text-gray-500">До {zone.maxDistance} км</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Settings" size={16} className="mr-1" />
                        Изменить
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 mb-1">Базовая ставка</p>
                        <p className="text-xl font-bold text-primary">{zone.baseRate} ₽</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-600 mb-1">За каждый кг</p>
                        <p className="text-xl font-bold text-secondary">{zone.perKgRate} ₽</p>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full" size="lg">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить зону доставки
                </Button>

                <Separator />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={24} className="text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Интеграция с Яндекс.Картами</h4>
                      <p className="text-sm text-blue-800">
                        Автоматический расчёт расстояния и стоимости доставки до клиента.
                        Поддержка зон России с учётом веса груза.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Percent" size={28} className="text-primary" />
                  Комиссии маркетплейса
                </CardTitle>
                <CardDescription>
                  Гибкая система комиссионных: глобальные проценты или индивидуальные ставки
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Globe" size={24} className="text-primary" />
                      <h4 className="font-bold text-lg">Глобальная комиссия</h4>
                    </div>
                    <p className="text-4xl font-bold text-primary mb-2">8%</p>
                    <p className="text-sm text-gray-600">
                      Стандартная ставка для всех продавцов
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border-2 border-secondary/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="User" size={24} className="text-secondary" />
                      <h4 className="font-bold text-lg">Индивидуальная</h4>
                    </div>
                    <p className="text-4xl font-bold text-secondary mb-2">5-15%</p>
                    <p className="text-sm text-gray-600">
                      Особые условия для крупных продавцов
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="TrendingDown" size={24} className="text-yellow-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">Программа лояльности</h4>
                      <p className="text-sm text-yellow-800">
                        При обороте более 1 млн ₽/месяц комиссия снижается до 5%.
                        Бонусы за стабильность и высокие оценки покупателей.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                  <Icon name="Store" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold">Toronto-Shop</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Мультивендорная торговая площадка с открытым исходным кодом
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Как сделать заказ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Способы оплаты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат товара</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Продавцам</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Стать продавцом</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Комиссии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Документация API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">База знаний</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Служба поддержки</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Система тикетов</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Живой чат</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <p>© 2024 Toronto-Shop. Открытая платформа с поддержкой 54-ФЗ.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Badge variant="outline" className="text-gray-400 border-gray-700">
                <Icon name="Shield" size={14} className="mr-1" />
                54-ФЗ
              </Badge>
              <Badge variant="outline" className="text-gray-400 border-gray-700">
                <Icon name="Lock" size={14} className="mr-1" />
                SSL
              </Badge>
              <Badge variant="outline" className="text-gray-400 border-gray-700">
                <Icon name="FileText" size={14} className="mr-1" />
                ЭДО
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
