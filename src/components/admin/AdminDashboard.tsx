import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const AdminDashboard = () => {
  const stats = [
    {
      label: 'Общий доход',
      value: '2 847 390 ₽',
      change: '+12.5%',
      icon: 'TrendingUp',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Новые заказы',
      value: '48',
      change: '+8',
      icon: 'ShoppingBag',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Активные продавцы',
      value: '127',
      change: '+3',
      icon: 'Store',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Пользователи',
      value: '8 542',
      change: '+234',
      icon: 'Users',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001234', customer: 'Иван Петров', amount: 45990, status: 'processing' },
    { id: 'ORD-001233', customer: 'Мария Сидорова', amount: 12500, status: 'shipped' },
    { id: 'ORD-001232', customer: 'Алексей Иванов', amount: 89990, status: 'delivered' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#3b2c35]">Дашборд</h1>
          <p className="text-[#6b5d7b]">Обзор ключевых метрик маркетплейса</p>
        </div>
        <Button className="bg-[#8b7d9b] hover:bg-[#9b8dab]">
          <Icon name="Download" size={18} className="mr-2" />
          Экспорт отчёта
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-2 border-[#8b7d9b]/30 hover:border-[#9b8dab] hover:shadow-lg transition-all"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <Icon name={stat.icon as any} size={24} className={stat.color} />
                </div>
                <Badge className="bg-green-100 text-green-700">{stat.change}</Badge>
              </div>
              <p className="text-2xl font-bold text-[#3b2c35] mb-1">{stat.value}</p>
              <p className="text-sm text-[#6b5d7b]">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-[#8b7d9b]/30">
          <CardHeader className="bg-[#8b7d9b]/10">
            <CardTitle className="text-[#3b2c35]">Последние заказы</CardTitle>
            <CardDescription className="text-[#6b5d7b]">Новые заказы требующие обработки</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#8b7d9b]/20 hover:bg-[#8b7d9b]/5 transition-all"
                >
                  <div>
                    <p className="font-semibold text-[#3b2c35]">{order.id}</p>
                    <p className="text-sm text-[#6b5d7b]">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#8b7d9b]">{order.amount.toLocaleString('ru-RU')} ₽</p>
                    <Badge className="bg-[#c8a4d8] text-[#3b2c35]">
                      {order.status === 'processing' && 'Обработка'}
                      {order.status === 'shipped' && 'Отправлен'}
                      {order.status === 'delivered' && 'Доставлен'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#8b7d9b]/30">
          <CardHeader className="bg-[#8b7d9b]/10">
            <CardTitle className="text-[#3b2c35]">Быстрые действия</CardTitle>
            <CardDescription className="text-[#6b5d7b]">Часто используемые функции</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start border-[#8b7d9b]/30 text-[#3b2c35] hover:bg-[#9b8dab] hover:text-white"
            >
              <Icon name="Plus" size={18} className="mr-3" />
              Добавить товар
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-[#8b7d9b]/30 text-[#3b2c35] hover:bg-[#9b8dab] hover:text-white"
            >
              <Icon name="UserPlus" size={18} className="mr-3" />
              Добавить продавца
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-[#8b7d9b]/30 text-[#3b2c35] hover:bg-[#9b8dab] hover:text-white"
            >
              <Icon name="FileText" size={18} className="mr-3" />
              Создать промокод
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-[#8b7d9b]/30 text-[#3b2c35] hover:bg-[#9b8dab] hover:text-white"
            >
              <Icon name="Mail" size={18} className="mr-3" />
              Отправить рассылку
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
