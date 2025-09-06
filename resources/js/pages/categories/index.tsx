import { CustomModalForm } from '@/components/custom-modal-form';
import CustomTable from '@/components/custom-table';
import { CategoryModalFormConfig } from '@/config/forms/category-modal-form';
import { CategoryTableConfig } from '@/config/tables/category-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage Categories',
    href: '/categories',
  },
];

interface LinkProps {
  active: boolean;
  label: string;
  url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  featured_image: string;
  featured_image_original_name: string;
  created_at: string;
}

interface CategoryPagination {
  data: Product[];
  links: LinkProps[];
  from: number;
  to: number;
  total: number;
}

interface FilterProps {
  search: string;
  perPage: string;
}

interface IndexProps {
  categories: CategoryPagination;
  filters: FilterProps;
  totalCount: number;
  filteredCount: number;
}

export default function Index({ categories }: IndexProps) {
  // console.log('from index', filters);
  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
  const flashMessage = flash?.success || flash?.error || "";

  // console.log('from index', categories);
  
  const { data, setData, errors, processing, reset, post } = useForm({
    name: '',
    description: '',
    image: null as File | null,
  });

  const handleDelete = (id: number, route: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      router.delete(route, {
        preserveScroll: true,
      });
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Category Management" />  
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='ml-auto'>
          <CustomModalForm
            addButton={CategoryModalFormConfig.addButton}
            title={CategoryModalFormConfig.title}
            description={CategoryModalFormConfig.description}
            fields={CategoryModalFormConfig.fields}
            buttons={CategoryModalFormConfig.buttons}
            data={data}
            setData={setData}
            errors={errors}
            processing={processing}
          />
        </div>
        <CustomTable
          onDelete={handleDelete}
          from={categories.from}
          data={categories.data}
          columns={CategoryTableConfig.columns}
          actions={CategoryTableConfig.actions}
        />
      </div>
    </AppLayout>
  );
}