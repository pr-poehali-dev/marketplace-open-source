import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Ticket {
  id: number;
  title: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  messages: number;
}

const SupportTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 1,
      title: 'Не могу оформить заказ',
      category: 'Заказы',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-12-05',
      messages: 3,
    },
    {
      id: 2,
      title: 'Вопрос по доставке в Екатеринбург',
      category: 'Доставка',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2024-12-04',
      messages: 5,
    },
    {
      id: 3,
      title: 'Как изменить комиссию для продавца?',
      category: 'Продавцам',
      status: 'open',
      priority: 'low',
      createdAt: '2024-12-03',
      messages: 1,
    },
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    category: '',
    description: '',
  });

  const statusConfig = {
    open: { label: 'Открыт', color: 'bg-blue-500' },
    'in-progress': { label: 'В работе', color: 'bg-yellow-500' },
    resolved: { label: 'Решён', color: 'bg-green-500' },
    closed: { label: 'Закрыт', color: 'bg-gray-500' },
  };

  const priorityConfig = {
    low: { label: 'Низкий', color: 'text-gray-600' },
    medium: { label: 'Средний', color: 'text-yellow-600' },
    high: { label: 'Высокий', color: 'text-red-600' },
  };

  const handleCreateTicket = () => {
    if (newTicket.title && newTicket.category && newTicket.description) {
      const ticket: Ticket = {
        id: tickets.length + 1,
        title: newTicket.title,
        category: newTicket.category,
        status: 'open',
        priority: 'medium',
        createdAt: new Date().toISOString().split('T')[0],
        messages: 1,
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({ title: '', category: '', description: '' });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Icon name="MessageSquare" size={28} className="text-primary" />
                Система тикетов поддержки
              </CardTitle>
              <CardDescription>
                Задайте вопрос или опишите проблему — мы ответим в течение 24 часов
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Новый тикет
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Создать тикет</DialogTitle>
                  <DialogDescription>
                    Опишите вашу проблему или вопрос максимально подробно
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-title">Тема обращения</Label>
                    <Input
                      id="ticket-title"
                      placeholder="Кратко опишите проблему"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticket-category">Категория</Label>
                    <Select
                      value={newTicket.category}
                      onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                    >
                      <SelectTrigger id="ticket-category">
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orders">Заказы</SelectItem>
                        <SelectItem value="delivery">Доставка</SelectItem>
                        <SelectItem value="payment">Оплата</SelectItem>
                        <SelectItem value="vendors">Продавцам</SelectItem>
                        <SelectItem value="technical">Технические вопросы</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticket-description">Описание проблемы</Label>
                    <Textarea
                      id="ticket-description"
                      placeholder="Подробно опишите вашу проблему или вопрос..."
                      rows={5}
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    />
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleCreateTicket}
                  >
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить тикет
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <Icon name="MessageCircle" size={32} className="text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Живой чат доступен!</h3>
            <p className="text-gray-700 mb-3">
              Получите мгновенный ответ от оператора поддержки. Среднее время ответа — 2 минуты.
            </p>
            <Button variant="outline" className="bg-white">
              <Icon name="MessageSquare" size={18} className="mr-2" />
              Открыть чат
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className="text-xl font-bold">Ваши обращения</h3>
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-lg transition-all cursor-pointer border-2">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-lg">{ticket.title}</h4>
                    <Badge className={statusConfig[ticket.status].color}>
                      {statusConfig[ticket.status].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={14} />
                      {ticket.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MessageSquare" size={14} />
                      {ticket.messages} {ticket.messages === 1 ? 'сообщение' : 'сообщений'}
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${priorityConfig[ticket.priority].color}`}>
                      <Icon name="AlertCircle" size={14} />
                      {priorityConfig[ticket.priority].label}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Открыть
                </Button>
              </div>
              {ticket.status === 'in-progress' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                  <p className="text-sm text-yellow-800 flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    Специалист поддержки работает над вашим обращением
                  </p>
                </div>
              )}
              {ticket.status === 'resolved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <Icon name="CheckCircle2" size={16} />
                    Проблема решена. Пожалуйста, оцените качество поддержки
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Book" size={24} className="text-secondary" />
            База знаний
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="HelpCircle" size={18} className="text-primary" />
                Как оформить заказ?
              </h4>
              <p className="text-sm text-gray-600">Пошаговая инструкция для покупателей</p>
            </div>
            <div className="bg-white p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="HelpCircle" size={18} className="text-primary" />
                Способы оплаты
              </h4>
              <p className="text-sm text-gray-600">Все доступные варианты оплаты</p>
            </div>
            <div className="bg-white p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="HelpCircle" size={18} className="text-primary" />
                Условия доставки
              </h4>
              <p className="text-sm text-gray-600">Сроки и тарифы доставки по России</p>
            </div>
            <div className="bg-white p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Icon name="HelpCircle" size={18} className="text-primary" />
                Возврат товара
              </h4>
              <p className="text-sm text-gray-600">Политика возврата и обмена</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTickets;
