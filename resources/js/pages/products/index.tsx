import CustomTable from '@/components/custom-table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import { ProductTableConfig } from '@/config/tables/product-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { CirclePlusIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
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

interface ProductPagination {
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
    products: ProductPagination;
    filters: FilterProps;
    totalCount: number;
    filteredCount: number;
}

export default function Index({ products, filters, totalCount, filteredCount }: IndexProps ) {
    // console.log('from index', filters);
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error || "";
    const [showAlert, setShowAlert] = useState(false);

    console.log('from index', products);
    useEffect(() => {
        if (flashMessage) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const { data, setData } = useForm({
        search:  filters.search || '',
        perPage: filters.perPage || '10',
    });
    
    // Handle Change for the Search Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);

        const queryString = {
            ...(value && { search: value }),
            ...(data.perPage && { perPage: data.perPage }),
        };

        router.get(route('products.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // To Reset Applied Filters
    const handleReset = () => {
        setData('search', '');
        setData('perPage', '10');
        router.get(route('products.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePerPageChange = (value: string) => {
        setData('perPage', value);
        
        const queryString = {
            ...(data.search && { search: data.search }),
            ...(value && { perPage: value }),
        };

        router.get(route('products.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number, route: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route, {
                preserveScroll: true,
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showAlert && flashMessage && (
                    <Alert variant={'default'} className={`${flash?.success ? 'bg-green-800' : (flash?.error ? 'bg-red-800' : '')} ml-auto max-w-md text-white`}>
                        <AlertTitle className='font-bold'>
                            {flash?.success ? 'Success' : 'Error'}
                        </AlertTitle>
                        <AlertDescription className='text-white'>
                            {flash?.success ? 'Success!' : 'Error!'} {''}
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Search Inputs and button */}
                <div className="flex items-center justify-between gap-4">

                    <Input
                        type='text'
                        placeholder='Search Product...'
                        name='search'
                        className='w-1/3'
                        onChange={handleChange}
                        value={data.search}
                    />

                    <Button onClick={handleReset} className='bg-red-600 rounded-lg cursor-pointer hover:bg-red-500'>
                        <X size={18} />
                    </Button>
                {/* Add Product Button */}
                <div className="ml-auto">
                    
                    <Link
                        className="flex items-center text-md cursor-pointer rounded-lg bg-indigo-800 px-4 py-2 text-white hover:opacity-90"
                        as="button"
                        href={route('products.create')}
                    >
                        <CirclePlusIcon className='me-2' /> Add Product
                    </Link>
                </div>
                </div>

                <CustomTable onDelete={handleDelete} from={products.from} data={products.data} columns={ProductTableConfig.columns} actions={ProductTableConfig.actions} />

                <Pagination search={data.search} totalCount={totalCount} filteredCount={filteredCount} products={products} perPage={data.perPage} onPerPageChange={handlePerPageChange} />
            </div>
        </AppLayout>
    );
}