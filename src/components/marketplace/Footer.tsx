import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
                <Icon name="Store" size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">Toronto-Shop</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Мультивендорная торговая площадка с открытым исходным кодом
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Покупателям</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Как сделать заказ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Способы оплаты</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Возврат товара</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Продавцам</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Стать продавцом</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Комиссии</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Документация API</a></li>
              <li><a href="#" className="hover:text-white transition-colors">База знаний</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Служба поддержки</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Система тикетов</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Живой чат</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors flex items-center gap-1">
                <Icon name="ShieldCheck" size={14} />
                Админ-панель
              </a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© 2024 Toronto-Shop. Открытая платформа с поддержкой 54-ФЗ.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Badge variant="outline" className="text-gray-400 border-gray-700">
              <Icon name="Shield" size={14} className="mr-1" />
              54-ФЗ
            </Badge>
            <Badge variant="outline" className="text-gray-400 border-gray-700">
              <Icon name="Lock" size={14} className="mr-1" />
              SSL
            </Badge>
            <Badge variant="outline" className="text-gray-400 border-gray-700">
              <Icon name="FileText" size={14} className="mr-1" />
              ЭДО
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;