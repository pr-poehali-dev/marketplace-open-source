import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  vendor: string;
  category: string;
  image: string;
  rating: number;
  verified: boolean;
}

interface CatalogTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

const CatalogTab = ({ searchQuery, setSearchQuery, products, onAddToCart }: CatalogTabProps) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Поиск товаров, продавцов, категорий..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 h-14 text-lg rounded-xl border-2 focus:border-primary"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setSearchQuery('')}
          >
            <Icon name="X" size={18} />
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Найдено товаров: <span className="font-bold text-primary">{filteredProducts.length}</span>
        </p>
        <Select defaultValue="popular">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">По популярности</SelectItem>
            <SelectItem value="price-asc">Дешевле</SelectItem>
            <SelectItem value="price-desc">Дороже</SelectItem>
            <SelectItem value="rating">По рейтингу</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer overflow-hidden border-2">
            <div className="relative overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {product.verified && (
                <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
                  <Icon name="BadgeCheck" size={14} className="mr-1" />
                  Проверен
                </Badge>
              )}
            </div>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Icon name="Store" size={14} />
                <span>{product.vendor}</span>
                <Separator orientation="vertical" className="h-4" />
                <Icon name="Tag" size={14} />
                <span>{product.category}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Icon name="Star" size={16} fill="currentColor" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {product.price.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => onAddToCart?.(product)}
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                В корзину
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CatalogTab;