import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface AdminSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AdminSidebar = ({ activeSection, setActiveSection }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'orders', label: 'Заказы', icon: 'ShoppingBag', badge: 12 },
    { id: 'products', label: 'Товары', icon: 'Package' },
    { id: 'vendors', label: 'Продавцы', icon: 'Store', badge: 3 },
    { id: 'users', label: 'Пользователи', icon: 'Users' },
    { id: 'categories', label: 'Категории', icon: 'FolderTree' },
    { id: 'shipping', label: 'Доставка', icon: 'Truck' },
    { id: 'payments', label: 'Платежи', icon: 'CreditCard' },
    { id: 'tickets', label: 'Тикеты', icon: 'MessageSquare', badge: 5 },
    { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
    { id: 'builder', label: 'Конструктор', icon: 'Blocks' },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#3b2c35] to-[#2d1f29] text-white p-6 sticky top-0">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-[#8b7d9b] to-[#6b5d7b] p-2 rounded-xl">
            <Icon name="ShieldCheck" size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Админ-панель</h2>
            <p className="text-xs text-[#b4a5bd]">Toronto-Shop</p>
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-[#6b5d7b]/30" />

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={`w-full justify-start text-left transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-[#8b7d9b] hover:bg-[#9b8dab] text-white'
                : 'text-[#d4c5dd] hover:bg-[#8b7d9b]/30 hover:text-white'
            }`}
            onClick={() => setActiveSection(item.id)}
          >
            <Icon name={item.icon as any} size={18} className="mr-3" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <Badge className="bg-[#c8a4d8] text-[#3b2c35] hover:bg-[#d8b4e8] ml-auto">
                {item.badge}
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      <Separator className="my-6 bg-[#6b5d7b]/30" />

      <div className="bg-[#6b5d7b]/20 rounded-lg p-4 border border-[#8b7d9b]/30">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="User" size={20} className="text-[#c8a4d8]" />
          <span className="text-sm font-semibold">Администратор</span>
        </div>
        <p className="text-xs text-[#b4a5bd] mb-3">admin@toronto-shop.ru</p>
        <Button
          variant="outline"
          size="sm"
          className="w-full border-[#8b7d9b] text-[#d4c5dd] hover:bg-[#8b7d9b] hover:text-white"
        >
          <Icon name="LogOut" size={16} className="mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
