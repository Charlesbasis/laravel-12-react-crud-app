import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Circle, CirclePlusIcon, Eye, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    featured_image: string;
    created_at: string;
}

export default function Index({ ...props }: { products: Product[] }) {
// export default function Index({ products }: { products: [] }) {
    // console.log('check', products);
    const { products } = props;
    const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;
    const flashMessage = flash?.success || flash?.error;
    const [showAlert, setShowAlert] = useState(flashMessage ? true : false);

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showAlert && flashMessage && (
                    <Alert variant={'default'} className={`${flash?.success ? 'bg-green-800' : (flash?.error ? 'bg-red-800' : '')} ml-auto max-w-md text-white`}>
                        <AlertTitle className='font-bold'>
                            {flash.success ? 'Success' : 'Error'}
                        </AlertTitle>
                        <AlertDescription className='text-white'>
                            {flash.success ? 'Success!' : 'Error!'} {''}
                            {flashMessage}
                        </AlertDescription>
                    </Alert>
                )}
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
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2 text-center">{product?.name}</td>
                                    <td className="border px-4 py-2 text-center">{product?.description}</td>
                                    <td className="border px-4 py-2 text-center">{product?.price}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <img src={product?.featured_image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
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
                                        <Link
                                            as='button'
                                            href={route('products.show', product.id)}
                                            className="ms-2 bg-red-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90"
                                        >
                                            <Trash2 size={18} />{' '}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}