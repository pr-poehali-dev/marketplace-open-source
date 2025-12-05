import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface PageComponent {
  id: string;
  type: 'hero' | 'features' | 'products' | 'text' | 'gallery' | 'form' | 'footer';
  order: number;
  data: any;
}

const PageBuilder = () => {
  const [components, setComponents] = useState<PageComponent[]>([
    {
      id: '1',
      type: 'hero',
      order: 1,
      data: { title: 'Добро пожаловать', subtitle: 'Лучший маркетплейс России' },
    },
    {
      id: '2',
      type: 'features',
      order: 2,
      data: { items: ['Быстрая доставка', 'Качество', 'Поддержка'] },
    },
  ]);

  const availableComponents = [
    { type: 'hero', label: 'Hero-блок', icon: 'Sparkles', color: 'bg-purple-100' },
    { type: 'features', label: 'Преимущества', icon: 'Star', color: 'bg-blue-100' },
    { type: 'products', label: 'Товары', icon: 'ShoppingBag', color: 'bg-green-100' },
    { type: 'text', label: 'Текстовый блок', icon: 'FileText', color: 'bg-yellow-100' },
    { type: 'gallery', label: 'Галерея', icon: 'Image', color: 'bg-pink-100' },
    { type: 'form', label: 'Форма', icon: 'Mail', color: 'bg-indigo-100' },
    { type: 'footer', label: 'Подвал', icon: 'Layout', color: 'bg-gray-100' },
  ];

  const addComponent = (type: string) => {
    const newComponent: PageComponent = {
      id: Date.now().toString(),
      type: type as any,
      order: components.length + 1,
      data: {},
    };
    setComponents([...components, newComponent]);
  };

  const removeComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
  };

  const moveComponent = (id: string, direction: 'up' | 'down') => {
    const index = components.findIndex(c => c.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === components.length - 1)
    ) {
      return;
    }

    const newComponents = [...components];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newComponents[index], newComponents[targetIndex]] = [
      newComponents[targetIndex],
      newComponents[index],
    ];
    setComponents(newComponents);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#8b7d9b]/30 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#8b7d9b]/10 to-[#6b5d7b]/10">
          <CardTitle className="text-3xl flex items-center gap-3 text-[#3b2c35]">
            <Icon name="Blocks" size={32} className="text-[#8b7d9b]" />
            Конструктор страниц
          </CardTitle>
          <CardDescription className="text-[#6b5d7b]">
            Создавайте и редактируйте страницы маркетплейса без кода — просто перетаскивайте блоки
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-[#3b2c35]">Главная страница</h3>
              <p className="text-sm text-[#6b5d7b]">Последнее изменение: 05.12.2024 14:30</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-[#8b7d9b] text-[#6b5d7b] hover:bg-[#8b7d9b]/10">
                <Icon name="Eye" size={18} className="mr-2" />
                Предпросмотр
              </Button>
              <Button className="bg-[#8b7d9b] hover:bg-[#9b8dab] text-white">
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-[#3b2c35]">Компоненты страницы</h4>
                <Badge className="bg-[#8b7d9b] hover:bg-[#9b8dab]">
                  {components.length} блоков
                </Badge>
              </div>

              {components.length === 0 ? (
                <Card className="border-2 border-dashed border-[#8b7d9b]/30">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Icon name="Plus" size={48} className="text-[#b4a5bd] mb-4" />
                    <p className="text-[#6b5d7b] mb-4">Страница пуста. Добавьте первый блок!</p>
                    <Button className="bg-[#8b7d9b] hover:bg-[#9b8dab]">
                      Добавить компонент
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {components.map((component, index) => (
                    <Card
                      key={component.id}
                      className="border-2 border-[#8b7d9b]/30 hover:border-[#9b8dab] hover:shadow-lg transition-all"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#8b7d9b]/20 p-2 rounded-lg">
                              <Icon
                                name={
                                  availableComponents.find(c => c.type === component.type)?.icon as any
                                }
                                size={20}
                                className="text-[#8b7d9b]"
                              />
                            </div>
                            <div>
                              <h5 className="font-semibold text-[#3b2c35]">
                                {availableComponents.find(c => c.type === component.type)?.label}
                              </h5>
                              <p className="text-xs text-[#6b5d7b]">Позиция: {index + 1}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveComponent(component.id, 'up')}
                              disabled={index === 0}
                              className="border-[#8b7d9b]/30 text-[#6b5d7b] hover:bg-[#8b7d9b]/10"
                            >
                              <Icon name="ChevronUp" size={16} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveComponent(component.id, 'down')}
                              disabled={index === components.length - 1}
                              className="border-[#8b7d9b]/30 text-[#6b5d7b] hover:bg-[#8b7d9b]/10"
                            >
                              <Icon name="ChevronDown" size={16} />
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-[#8b7d9b]/30 text-[#6b5d7b] hover:bg-[#8b7d9b]/10"
                                >
                                  <Icon name="Settings" size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Настройки компонента</DialogTitle>
                                  <DialogDescription>
                                    Измените параметры блока
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Заголовок</Label>
                                    <Input placeholder="Введите заголовок" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Описание</Label>
                                    <Textarea placeholder="Введите описание" rows={3} />
                                  </div>
                                  <Button className="w-full bg-[#8b7d9b] hover:bg-[#9b8dab]">
                                    Сохранить изменения
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeComponent(component.id)}
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Card className="border-2 border-[#8b7d9b]/30 sticky top-6">
                <CardHeader className="bg-[#8b7d9b]/10">
                  <CardTitle className="text-lg text-[#3b2c35]">Библиотека блоков</CardTitle>
                  <CardDescription className="text-[#6b5d7b]">
                    Выберите компонент для добавления
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {availableComponents.map((comp) => (
                    <Button
                      key={comp.type}
                      variant="outline"
                      className="w-full justify-start border-[#8b7d9b]/30 text-[#3b2c35] hover:bg-[#9b8dab] hover:text-white transition-all"
                      onClick={() => addComponent(comp.type)}
                    >
                      <Icon name={comp.icon as any} size={18} className="mr-3" />
                      {comp.label}
                      <Icon name="Plus" size={14} className="ml-auto" />
                    </Button>
                  ))}

                  <Separator className="my-4" />

                  <div className="bg-[#c8a4d8]/20 rounded-lg p-3 border border-[#8b7d9b]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Lightbulb" size={18} className="text-[#8b7d9b]" />
                      <span className="text-sm font-semibold text-[#3b2c35]">Совет</span>
                    </div>
                    <p className="text-xs text-[#6b5d7b]">
                      Используйте перетаскивание для изменения порядка блоков
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-[#8b7d9b]/30">
        <CardHeader className="bg-gradient-to-r from-[#c8a4d8]/20 to-[#8b7d9b]/20">
          <CardTitle className="text-xl text-[#3b2c35] flex items-center gap-2">
            <Icon name="Palette" size={24} className="text-[#8b7d9b]" />
            Глобальные настройки темы
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[#3b2c35]">Основной цвет</Label>
              <div className="flex gap-2">
                <Input type="color" value="#8b7d9b" className="w-20" />
                <Input value="#8b7d9b" className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#3b2c35]">Акцентный цвет</Label>
              <div className="flex gap-2">
                <Input type="color" value="#c8a4d8" className="w-20" />
                <Input value="#c8a4d8" className="flex-1" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#3b2c35]">Шрифт заголовков</Label>
            <Select defaultValue="montserrat">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="montserrat">Montserrat</SelectItem>
                <SelectItem value="roboto">Roboto</SelectItem>
                <SelectItem value="opensans">Open Sans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[#3b2c35]">Радиус скругления</Label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без скругления</SelectItem>
                <SelectItem value="small">Маленький</SelectItem>
                <SelectItem value="medium">Средний</SelectItem>
                <SelectItem value="large">Большой</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full bg-[#8b7d9b] hover:bg-[#9b8dab]">
            <Icon name="Save" size={18} className="mr-2" />
            Применить настройки
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageBuilder;
