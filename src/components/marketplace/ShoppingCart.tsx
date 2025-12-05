import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CartItem {
  id: number;
  name: string;
  price: number;
  vendor: string;
  image: string;
  quantity: number;
  weight: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const ShoppingCart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: ShoppingCartProps) => {
  const [selectedZone, setSelectedZone] = useState('moscow');

  const shippingRates = {
    moscow: { name: 'Москва и МО', baseRate: 300, perKgRate: 50 },
    central: { name: 'Центральная Россия', baseRate: 500, perKgRate: 80 },
    far: { name: 'Дальние регионы', baseRate: 1000, perKgRate: 150 },
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalWeight = cartItems.reduce((sum, item) => sum + item.weight * item.quantity, 0);
  
  const currentRate = shippingRates[selectedZone as keyof typeof shippingRates];
  const shippingCost = currentRate.baseRate + Math.ceil(totalWeight) * currentRate.perKgRate;
  const total = subtotal + shippingCost;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="ShoppingCart" size={28} className="text-primary" />
            Корзина покупок
          </DialogTitle>
          <DialogDescription>
            {cartItems.length} {cartItems.length === 1 ? 'товар' : 'товаров'} на сумму {subtotal.toLocaleString('ru-RU')} ₽
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="ShoppingBag" size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Корзина пуста</p>
              <Button className="mt-4" onClick={onClose}>
                Перейти к покупкам
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                              <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Icon name="Store" size={14} />
                                {item.vendor}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <Icon name="Trash2" size={18} className="text-red-500" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                            <p className="text-lg font-bold text-primary">
                              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Icon name="Truck" size={20} className="text-blue-600" />
                    Расчёт доставки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Зона доставки</label>
                    <Select value={selectedZone} onValueChange={setSelectedZone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moscow">Москва и МО</SelectItem>
                        <SelectItem value="central">Центральная Россия</SelectItem>
                        <SelectItem value="far">Дальние регионы</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-white rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Базовая ставка:</span>
                      <span className="font-semibold">{currentRate.baseRate} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Вес груза:</span>
                      <span className="font-semibold">{totalWeight.toFixed(2)} кг</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Доплата за вес:</span>
                      <span className="font-semibold">
                        {(Math.ceil(totalWeight) * currentRate.perKgRate).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-blue-600">
                      <span className="font-semibold">Стоимость доставки:</span>
                      <span className="font-bold">{shippingCost.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span>Товары:</span>
                      <span className="font-semibold">{subtotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Доставка:</span>
                      <span className="font-semibold">{shippingCost.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-2xl">
                      <span className="font-bold">Итого:</span>
                      <span className="font-bold text-primary">{total.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Оформить заказ
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingCart;
