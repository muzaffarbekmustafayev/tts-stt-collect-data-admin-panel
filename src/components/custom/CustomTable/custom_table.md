# Generic Table Component System

Bu tizim dasturingizda turli pagelarda umumiy table komponentasini ishlatish imkonini beradi.

## Asosiy Komponentalar

### 1. CustomTable
Umumiy table komponentasi, har qanday ma'lumot turi bilan ishlaydi.

```tsx
import CustomTable from "@/components/custom/CustomTable";

<CustomTable<User>
  columns={usersColumns}
  data={users}
  loading={false}
  onEdit={handleEdit}
  onDelete={handleDelete}
  showActions={true}
  actions={{
    edit: true,
    delete: true,
    view: false
  }}
/>
```

### 2. GenericTablePage
To'liq table page komponentasi - search, pagination, actions bilan.

```tsx
import GenericTablePage from "@/components/custom/GenericTablePage";

<GenericTablePage<User>
  title="Users Management"
  columns={usersColumns}
  data={users}
  searchProps={{
    searchTerm,
    setSearchTerm: handleSearch,
    placeholder: "Search users..."
  }}
  paginationProps={{
    currentPage: page,
    total: totalUsers,
    limit: 10,
    onNext: () => setPage(page + 1),
    onPrevious: () => setPage(page - 1)
  }}
  onAdd={handleAdd}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

## Interface-lar

### 1. Asosiy Interface-lar

```tsx
// Ma'lumot turi uchun
interface DataProps {
  id: string | number;
  [key: string]: any;
}

// Table komponentasi uchun
interface GenericTableProps<T extends DataProps> {
  columns: ColumnsProps[];
  data: T[];
  loading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (id: string | number) => void;
  showActions?: boolean;
  actions?: {
    edit?: boolean;
    delete?: boolean;
    view?: boolean;
  };
}
```

### 2. Page-specific Interface-lar

```tsx
// src/types/pageInterfaces.ts faylida
export interface User extends DataProps {
  id: number;
  telegram_id: string;
  name: string;
  gender: string;
  age: number;
  phone: string;
  info: string;
  created_at: string;
}

export interface Sentence extends DataProps {
  id: number;
  text: string;
  language: string;
  category: string;
  created_at: string;
  status: string;
}
```

## Qanday Ishlatish

### 1. Yangi Page Yaratish

```tsx
// 1. Interface yarating
interface MyData extends DataProps {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

// 2. Columns yarating
const myDataColumns = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'created_at', label: 'Created At' },
];

// 3. Page komponentasini yarating
export default function MyPage() {
  const [data, setData] = useState<MyData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <GenericTablePage<MyData>
      title="My Data Management"
      columns={myDataColumns}
      data={data}
      searchProps={{
        searchTerm,
        setSearchTerm,
        placeholder: "Search..."
      }}
      onAdd={() => {/* Add logic */}}
      onEdit={(item) => {/* Edit logic */}}
      onDelete={(id) => {/* Delete logic */}}
    />
  );
}
```

### 2. Mavjud Page-ni Yangilash

```tsx
// Eski usul
<CustomTable
  columns={columns}
  data={data}
  setEditingItem={setEditingItem}
  onDelete={() => {}}
/>

// Yangi usul
<GenericTablePage<User>
  title="Users"
  columns={usersColumns}
  data={users}
  onEdit={handleEdit}
  onDelete={handleDelete}
  searchProps={{
    searchTerm,
    setSearchTerm: handleSearch
  }}
/>
```

### 3. Maxsus Render Funksiyalari

```tsx
const columns = [
  { key: 'id', label: 'ID' },
  { 
    key: 'price', 
    label: 'Price',
    render: (value: number) => `$${value.toFixed(2)}`
  },
  { 
    key: 'status', 
    label: 'Status',
    render: (value: string, item: MyData) => (
      <span className={value === 'active' ? 'text-green-600' : 'text-red-600'}>
        {value}
      </span>
    )
  }
];
```

### 4. Sortlash Funksiyasi

```tsx
const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'created_at', label: 'Created At', sortable: true }
];

// TableHeader komponentasi avtomatik ravishda sortlash ikonkalarini ko'rsatadi
```

## Misollar

### 1. Users Page
```tsx
// src/pages/Users.tsx
<GenericTablePage<User>
  title="Users Management"
  columns={usersColumns}
  data={filteredData}
  searchProps={{
    searchTerm,
    setSearchTerm: handleSearchUsers,
    placeholder: "Search by name..."
  }}
  paginationProps={{
    currentPage: page,
    total: stats.users,
    limit,
    onNext: () => setPage(page + 1),
    onPrevious: () => page > 1 && setPage(page - 1)
  }}
  onAdd={handleAddUser}
  onEdit={handleEditUser}
  onDelete={handleDeleteUser}
/>
```

### 2. Sentences Page
```tsx
// src/pages/Sentences.tsx
<GenericTablePage<Sentence>
  title="Sentences Management"
  columns={sentencesColumns}
  data={filteredData}
  searchProps={{
    searchTerm,
    setSearchTerm: handleSearchSentences,
    placeholder: "Search by text, language, or category..."
  }}
  onAdd={handleAddSentence}
  onEdit={handleEditSentence}
  onDelete={handleDeleteSentence}
/>
```

### 3. Example Page (Yangi ma'lumot turi)
```tsx
// src/pages/Example.tsx - yangi Product ma'lumot turi bilan
interface Product extends DataProps {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  created_at: string;
}

<GenericTablePage<Product>
  title="Products Management"
  columns={productColumns}
  data={filteredData}
  onAdd={handleAddProduct}
  onEdit={handleEditProduct}
  onDelete={handleDeleteProduct}
/>
```

## Afzalliklari

1. **Type Safety** - TypeScript bilan to'liq qo'llab-quvvatlash
2. **Reusability** - Har qanday ma'lumot turi bilan ishlaydi
3. **Consistency** - Barcha pagelarda bir xil ko'rinish
4. **Flexibility** - Har bir page uchun maxsus sozlamalar
5. **Maintainability** - Markazlashtirilgan kod
6. **Custom Rendering** - Har bir ustun uchun maxsus render funksiyasi
7. **Sorting** - Avtomatik sortlash funksiyasi
8. **Actions** - Edit, Delete, View action-larini boshqarish

## Eslatmalar

- Har bir yangi ma'lumot turi uchun interface yarating
- Columns array-da `key` maydonlari interface-dagi maydonlar bilan mos kelishi kerak
- `GenericTablePage` komponentasi eng ko'p ishlatiladi
- `CustomTable` komponentasi maxsus holatlar uchun
- `render` funksiyasi bilan maxsus ko'rinish yaratish mumkin
- `sortable: true` bilan ustunlarni sortlash mumkin
- `actions` obyekti bilan qaysi action-lar ko'rsatilishini boshqarish mumkin
