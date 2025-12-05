import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MarketplaceHeroProps {
  setActiveTab: (tab: string) => void;
}

const MarketplaceHero = ({ setActiveTab }: MarketplaceHeroProps) => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default MarketplaceHero;
