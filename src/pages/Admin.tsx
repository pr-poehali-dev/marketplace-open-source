import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminDashboard from '@/components/admin/AdminDashboard';
import PageBuilder from '@/components/admin/PageBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'builder':
        return <PageBuilder />;
      case 'orders':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="ShoppingBag" size={28} className="text-[#8b7d9b]" />
                Управление заказами
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="ShoppingBag" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'products':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="Package" size={28} className="text-[#8b7d9b]" />
                Управление товарами
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="Package" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'vendors':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="Store" size={28} className="text-[#8b7d9b]" />
                Управление продавцами
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="Store" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'users':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="Users" size={28} className="text-[#8b7d9b]" />
                Управление пользователями
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="Users" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'categories':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="FolderTree" size={28} className="text-[#8b7d9b]" />
                Управление категориями
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="FolderTree" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'shipping':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="Truck" size={28} className="text-[#8b7d9b]" />
                Настройка доставки
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="Truck" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'payments':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="CreditCard" size={28} className="text-[#8b7d9b]" />
                Платёжные системы
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="CreditCard" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'tickets':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="MessageSquare" size={28} className="text-[#8b7d9b]" />
                Тикеты поддержки
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="MessageSquare" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'analytics':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="TrendingUp" size={28} className="text-[#8b7d9b]" />
                Аналитика и отчёты
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="TrendingUp" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      case 'settings':
        return (
          <Card className="border-2 border-[#8b7d9b]/30">
            <CardHeader className="bg-[#8b7d9b]/10">
              <CardTitle className="text-2xl text-[#3b2c35] flex items-center gap-2">
                <Icon name="Settings" size={28} className="text-[#8b7d9b]" />
                Настройки системы
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12 text-center">
              <Icon name="Settings" size={64} className="mx-auto text-[#b4a5bd] mb-4" />
              <p className="text-[#6b5d7b]">Раздел в разработке</p>
            </CardContent>
          </Card>
        );
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f5f0f7] to-[#e8dce8]">
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  );
};

export default Admin;
