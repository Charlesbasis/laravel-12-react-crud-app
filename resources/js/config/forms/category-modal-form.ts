import { CirclePlus } from "lucide-react"

const CategoryModalFormConfig =  {
  moduleTitle: 'Manage Categories',
  title: 'Create Category',
  description: 'Fill in the details below to create a new category.',
  addButton: {
    id: 'add-category',
    label: 'Add Category',
    className: 'bg-blue-600 text-white p-2 rounded-lg cursor-pointer hover:opacity-90',
    icon: CirclePlus,
    type: 'button',
    variant: 'default',
  },
  fields: [
    {
        id: 'category-name',
        key: 'name',
        label: 'Category Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter Category Name',
        autocomplete: 'name',
        tabIndex: 1,
        autoFocus: true,
    },
    {
        id: 'category-description',
        key: 'description',
        label: 'Description',
        name: 'description',
        type: 'textarea',
        placeholder: 'Enter Category description',
        autocomplete: 'description',
        tabIndex: 2,
        rows: 3,
        className: 'w-full border p-2 rounded',
    },
    {
        id: 'category-image',
        key: 'image',
        label: 'Image (optional)',
        name: 'image',
        type: 'file',
        tabIndex: 3,
        accept: 'image/*',
    },
    ],
}

export default CategoryModalFormConfig