export const CategoryTableConfig = {

    columns: [    
        { label: 'Category Name', key: 'name', className: 'border p-4' },
        { label: 'Description', key: 'description', className: 'w-90 border p-4' },
        { label: 'Image', key: 'image', isImage: true, className: 'border p-4' },
        { label: 'Created Date', key: 'created_at', className: 'border p-4' },
        { label: 'Actions', key: 'actions', isAction: true, className: 'border p-4' },
    ],
    actions: [
        { label: 'View', icon: 'Eye', className: 'bg-sky-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90' },
        { label: 'Edit', icon: 'Pencil', className: 'ms-2 bg-green-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90' },
        { label: 'Delete', icon: 'Trash2', route: 'categories.destroy', className: 'ms-2 bg-red-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90' },
    ],
}