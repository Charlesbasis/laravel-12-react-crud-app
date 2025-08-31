import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { CirclePlusIcon, Eye, Pencil, Trash2, X } from 'lucide-react';
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
}

interface IndexProps {
    products: ProductPagination;
    filters: FilterProps;
}

export default function Index({ products, filters }: IndexProps ) {
    // console.log('from index', filters);
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error || "";
    const [showAlert, setShowAlert] = useState(false);

    console.log('from index', flashMessage, flash, showAlert)
    useEffect(() => {
        if (flashMessage) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    const { data, setData } = useForm({
        search:  filters.search || '',
    });
    
    // Handle Change for the Search Input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setData('search', value);
        const queryString = value ? { search: value } : {};
        router.get(route('products.index'), queryString, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // To Reset Applied Filters
    const handleReset = () => {
        setData('search', '');
        router.get(route('products.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

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
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="border p-4">#</th>
                                <th className="border p-4">Name</th>
                                <th className="border p-4">Description</th>
                                <th className="border p-4">Price (BDT)</th>
                                <th className="border p-4">Featured Image</th>
                                <th className="border p-4">Created Date</th>
                                <th className="border p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.data.length > 0 ? (
                                products.data.map((product, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{product?.name}</td>
                                    <td className="border px-4 py-2 text-center">{product?.description}</td>
                                    <td className="border px-4 py-2 text-center">{product?.price}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {product.featured_image && (
                                            <img src={product?.featured_image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                                        )}                                        
                                    </td>
                                    <td className="border px-4 py-2 text-center">{product?.created_at}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <Link
                                            as='button'
                                            href={route('products.show', product.id)}
                                            className="bg-sky-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90"
                                        >
                                            <Eye size={18} />{' '}
                                        </Link>
                                        <Link
                                            as='button'
                                            href={route('products.edit', product.id)}
                                            className="ms-2 bg-green-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90"
                                        >
                                            <Pencil size={18} />{' '}
                                        </Link>
                                        <Button
                                            className='ms-2 bg-red-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90'
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this product?')) {
                                                    router.delete(route('products.destroy', product.id), {
                                                        preserveScroll: true,
                                                    });
                                                }
                                            }}
                                        >
                                            <Trash2 size={18} />{' '}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="font-bold text-red-600 py-4 text-center">No products found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination products={products} />
            </div>
        </AppLayout>
    );
}