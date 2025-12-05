import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Order {
  id: number;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  total: number;
  vendor: string;
  trackingNumber?: string;
}

const UserProfile = () => {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: 'ORD-2024-001234',
      date: '2024-12-05',
      status: 'shipped',
      items: 2,
      total: 119980,
      vendor: 'TechStore',
      trackingNumber: 'RU123456789',
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-001198',
      date: '2024-12-03',
      status: 'delivered',
      items: 1,
      total: 29990,
      vendor: 'AudioShop',
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-001156',
      date: '2024-12-01',
      status: 'processing',
      items: 3,
      total: 274970,
      vendor: 'AppleCenter',
    },
  ]);

  const statusConfig = {
    pending: { label: 'Ожидает', color: 'bg-gray-500', icon: 'Clock' },
    processing: { label: 'Обрабатывается', color: 'bg-blue-500', icon: 'Package' },
    shipped: { label: 'Отправлен', color: 'bg-yellow-500', icon: 'Truck' },
    delivered: { label: 'Доставлен', color: 'bg-green-500', icon: 'CheckCircle2' },
    cancelled: { label: 'Отменён', color: 'bg-red-500', icon: 'XCircle' },
  };

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status)).length;

  return (
    <div className="space-y-6">
      <Card className="border-2 bg-gradient-to-br from-primary/10 to-secondary/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl">
              <Icon name="User" size={48} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Иван Петров</h2>
              <p className="text-gray-600">ivan.petrov@example.com</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-primary">Покупатель</Badge>
                <Badge variant="outline">С нами с ноября 2024</Badge>
              </div>
            </div>
            <Button variant="outline">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon name="ShoppingBag" size={24} className="text-primary" />
              <Badge className="bg-primary/10 text-primary">Всего</Badge>
            </div>
            <p className="text-3xl font-bold text-primary">{totalOrders}</p>
            <p className="text-sm text-gray-600">Заказов оформлено</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon name="TrendingUp" size={24} className="text-secondary" />
              <Badge className="bg-secondary/10 text-secondary">Сумма</Badge>
            </div>
            <p className="text-3xl font-bold text-secondary">{totalSpent.toLocaleString('ru-RU')} ₽</p>
            <p className="text-sm text-gray-600">Общая сумма покупок</p>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Clock" size={24} className="text-yellow-600" />
              <Badge className="bg-yellow-100 text-yellow-600">Активные</Badge>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{activeOrders}</p>
            <p className="text-sm text-gray-600">Заказов в обработке</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Icon name="Package" size={28} className="text-primary" />
            Мои заказы
          </CardTitle>
          <CardDescription>
            История всех ваших покупок и текущий статус доставки
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">
                Все ({totalOrders})
              </TabsTrigger>
              <TabsTrigger value="active">
                Активные ({activeOrders})
              </TabsTrigger>
              <TabsTrigger value="delivered">
                Доставлены
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Отменённые
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg">{order.orderNumber}</h4>
                          <Badge className={statusConfig[order.status].color}>
                            <Icon name={statusConfig[order.status].icon as any} size={14} className="mr-1" />
                            {statusConfig[order.status].label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            {new Date(order.date).toLocaleDateString('ru-RU')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Store" size={14} />
                            {order.vendor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="Package" size={14} />
                            {order.items} {order.items === 1 ? 'товар' : 'товаров'}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary mb-1">
                          {order.total.toLocaleString('ru-RU')} ₽
                        </p>
                        <Button variant="outline" size="sm">
                          <Icon name="Eye" size={16} className="mr-2" />
                          Подробнее
                        </Button>
                      </div>
                    </div>

                    {order.trackingNumber && (
                      <>
                        <Separator className="my-4" />
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Трек-номер для отслеживания</p>
                              <p className="font-mono font-bold text-blue-600">{order.trackingNumber}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Icon name="MapPin" size={16} className="mr-2" />
                              Отследить
                            </Button>
                          </div>
                        </div>
                      </>
                    )}

                    {order.status === 'processing' && (
                      <>
                        <Separator className="my-4" />
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-sm text-yellow-800 flex items-center gap-2">
                            <Icon name="Clock" size={16} />
                            Продавец обрабатывает ваш заказ. Обычно это занимает 1-2 дня.
                          </p>
                        </div>
                      </>
                    )}

                    {order.status === 'delivered' && (
                      <>
                        <Separator className="my-4" />
                        <div className="flex items-center gap-3">
                          <Button variant="outline" className="flex-1">
                            <Icon name="MessageSquare" size={16} className="mr-2" />
                            Оставить отзыв
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Icon name="RotateCcw" size={16} className="mr-2" />
                            Вернуть товар
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="active">
              <div className="space-y-4">
                {orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status)).map((order) => (
                  <Card key={order.id} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold mb-1">{order.orderNumber}</h4>
                          <Badge className={statusConfig[order.status].color}>
                            {statusConfig[order.status].label}
                          </Badge>
                        </div>
                        <p className="text-xl font-bold text-primary">
                          {order.total.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="delivered">
              <div className="text-center py-12 text-gray-500">
                <Icon name="Package" size={64} className="mx-auto mb-4 text-gray-300" />
                <p>Доставленных заказов пока нет</p>
              </div>
            </TabsContent>

            <TabsContent value="cancelled">
              <div className="text-center py-12 text-gray-500">
                <Icon name="XCircle" size={64} className="mx-auto mb-4 text-gray-300" />
                <p>Отменённых заказов нет</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Icon name="Heart" size={24} className="text-red-500" />
            Избранное
          </CardTitle>
          <CardDescription>
            Товары, которые вам понравились
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Icon name="Heart" size={48} className="mx-auto mb-3 text-gray-300" />
            <p>В избранном пока ничего нет</p>
            <Button variant="outline" className="mt-4">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Перейти в каталог
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
