import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/products',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

            {/* Add Product Button */}
            <div className="ml-auto ">
                <Link className="bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90" as="button" href={route('products.create')}>Add Product</Link>
            </div>                
            <div className='overflow-hidden rounded-lg border bg-white shadow-sm'>
                <table className='w-full table-auto'>
                    <thead>
                        <tr className='bg-gray-700 text-white'>
                            <th className='p-4 border'>#</th>
                            <th className='p-4 border'>Name</th>
                            <th className='p-4 border'>Description</th>
                            <th className='p-4 border'>Price</th>
                            <th className='p-4 border'>Featured Image</th>
                            <th className='p-4 border'>Created Date</th>
                            <th className='p-4 border'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className='border px-4 py-2 text-center text-black'>1</td>
                            <td className='border px-4 py-2 text-center text-black'>Mobile Phone</td>
                            <td className='border px-4 py-2 text-center text-black'>Mobile Phone Description</td>
                            <td className='border px-4 py-2 text-center text-black'>12000</td>
                            <td className='border px-4 py-2 text-center text-black'></td>
                            <td className='border px-4 py-2 text-center text-black'>2025-04-01</td>
                            <td className='border px-4 py-2 text-center text-black'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        </AppLayout>
    );
}
