import { Link, router } from '@inertiajs/react';
import * as LucidIcons from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';

interface TableColumn {
    label: string;
    key: string;
    isImage?: boolean;
    isAction?: boolean;
    className?: string;
}

interface ActionConfig {
    label: string;
    icon: keyof typeof LucidIcons;
    route: string;
}

interface CustomTableProps {
  columns: TableColumn[];
  actions: ActionConfig[];
}

function CustomTable({ columns, actions }: CustomTableProps) {
    console.log('from custom table', columns, actions);
  return (
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <table className="w-full table-auto">
              <thead>
                  <tr className="bg-gray-700 text-white">
                      <th className="border p-4">#</th>

                      {columns.map((column, index) => (
                          <th key={column.key} className={column.className}>
                              {column.label}
                          </th>
                      ))}
                      
                      {/* <th className="border p-4">Name</th>
                      <th className="border p-4">Description</th>
                      <th className="border p-4">Price (BDT)</th>
                      <th className="border p-4">Featured Image</th>
                      <th className="border p-4">Created Date</th>
                      <th className="border p-4">Action</th> */}
                  </tr>
              </thead>

              {/* <tbody>
                  {products.data.length > 0 ? (
                      products.data.map((product, index) => (
                          <tr key={index}>
                              <td className="border px-4 py-2 text-center">{products.from + index}</td>
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
              </tbody> */}
          </table>
      </div>
  )
}

export default CustomTable