import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount?: number;
  onCartClick?: () => void;
}

const Header = ({ activeTab, setActiveTab, cartCount = 0, onCartClick }: HeaderProps) => {
  return (
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
            <Button variant="ghost" onClick={() => setActiveTab('support')}>
              <Icon name="HeadphonesIcon" size={18} className="mr-2" />
              Поддержка
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setActiveTab('profile')}>
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 relative" onClick={onCartClick}>
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Корзина
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 min-w-[20px] h-5 flex items-center justify-center p-1">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;