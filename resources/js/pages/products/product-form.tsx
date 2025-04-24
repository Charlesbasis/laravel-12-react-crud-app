import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product',
        href: route('products.create'),
    },
];

export default function ProductForm() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">                     
                <Card>
                    <CardHeader>
                        <CardTitle>Create Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className='flex flex-col gap-4' autoComplete='off'>
                            <div className="grid gap-6">

                                {/* Product Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor='name'>Product Name</Label>

                                    <Input
                                        id='name'
                                        name='name'
                                        type='text'
                                        placeholder='Product Name'
                                        autoFocus
                                        tabIndex={1}
                                    ></Input>
                                </div>

                                {/* Product Description */}
                                <div className="grid gap-2">
                                    <Label htmlFor='name'>Description</Label>

                                    <Input
                                        id='name'
                                        name='name'
                                        type='text'
                                        placeholder='Product Name'
                                        autoFocus
                                        tabIndex={1}
                                    ></Input>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
