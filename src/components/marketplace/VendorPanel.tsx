import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ShippingZone {
  id: number;
  name: string;
  baseRate: number;
  perKgRate: number;
  maxDistance: number;
}

interface VendorPanelProps {
  vendorInn: string;
  setVendorInn: (inn: string) => void;
  shippingZones: ShippingZone[];
  verifyInn: () => void;
}

const VendorPanel = ({ vendorInn, setVendorInn, shippingZones, verifyInn }: VendorPanelProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default VendorPanel;
