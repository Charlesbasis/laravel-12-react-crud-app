import { CustomModalForm } from '@/components/custom-modal-form';
import CustomTable from '@/components/custom-table';
import { CategoryModalFormConfig } from '@/config/forms/category-modal-form';
import { CategoryTableConfig } from '@/config/tables/category-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'view' | 'edit'>('create');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('from index', data);
    post(route('categories.store'), {
      onSuccess: (response) => {
        console.log('from index Success', response);
        closeModal();
      },
      onError: (error) => {
        console.log('from index Error', error);
      },
    })
  }

  const closeModal = () => {
    setMode('create');
    setSelectedCategory(null);
    setPreviewImage(null);
    reset();

    setModalOpen(false);
  }

  const handleModalToggle = (open: boolean) => {

    setModalOpen(open);

    if (!open) {

      setPreviewImage(null);
      setMode('create');
      setSelectedCategory(null);

      reset();
    }
  }

  const openModal = (mode: 'create' | 'view' | 'edit', category?: any) => {

    setMode(mode);

    // console.log('from index category mode', category, mode);

    if (category) {
      Object.entries(category).forEach(([key, value]) => {
        if (key !== 'image') {

          setData(key as keyof typeof data, value as string | null);
        }
      });

      setPreviewImage(category.image);
      setSelectedCategory(category);
    } else {
      reset();
    }

    // console.log('from index data', data);
    
    setModalOpen(true);

  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Category Management" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='ml-auto'>
          <CustomModalForm
            addButton={CategoryModalFormConfig.addButton}
            title={mode === 'view' ? 'View Category' : (mode === 'edit' ? 'Update Category' : CategoryModalFormConfig.title)}
            description={CategoryModalFormConfig.description}
            fields={CategoryModalFormConfig.fields}
            buttons={CategoryModalFormConfig.buttons}
            data={data}
            setData={setData}
            errors={errors}
            processing={processing}
            handleSubmit={handleSubmit}
            open={modalOpen}
            onOpenChange={handleModalToggle}
            mode={mode}
            previewImage={previewImage}
          />
        </div>
        <CustomTable
          onDelete={handleDelete}
          from={categories.from}
          data={categories.data}
          columns={CategoryTableConfig.columns}
          actions={CategoryTableConfig.actions}
          onView={(category) => openModal('view', category)}
          onEdit={(category) => openModal('edit', category)}
          isModal={true}
        />
      </div>
    </AppLayout>
  );
}