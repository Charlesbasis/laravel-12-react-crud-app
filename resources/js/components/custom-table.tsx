import { Link } from '@inertiajs/react';
import * as LucidIcons from 'lucide-react';
import React from 'react';
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
    className?: string;
}

interface TableRow {
    [key: string]: any;
}

interface CustomTableProps {
    columns: TableColumn[];
    actions: ActionConfig[];
    data: TableRow[];
    from: number;
    onDelete: (id: number, route: string) => void;
}

function CustomTable({ columns, actions, data, from, onDelete }: CustomTableProps) {
    console.log('from custom table', actions);

    const renderActionButtons = (row: TableRow) => {
        return (
            <div className="flex">
                {actions.map((action, index) => {
                    const IconComponent = LucidIcons[action.icon] as React.ElementType;

                    if (action.label === 'Delete') {
                        return (
                            <Button
                                key={index}
                                className={action.className}
                                onClick={() => onDelete(row.id, route(action.route, row.id))}                                    
                            >
                                <IconComponent size={18} />{' '}
                            </Button>
                        );
                    }

                    return (
                        <Link 
                            className={action.className} 
                            href={route(action.route, row.id)} 
                            as='button'
                        >
                            <IconComponent size={18} />{' '}    
                        </Link>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="border p-4">#</th>

                        {columns.map((column, index) => (
                            <th key={column.key} className={column.className}>
                                {column.label}{' '}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr key={index}>
                                <td className='border px-4 py-2 text-center'>{from + index}</td>
                                {columns.map((col) => (
                                    <td className="border px-4 py-2 text-center">
                                        {col.isImage ? (
                                            <div>
                                                <img src={row[col.key]} alt={row.name || 'Image'} className="w-20 h-16 object-cover rounded-lg" />
                                            </div>
                                        ) : col.isAction ? (renderActionButtons(row)
                                        ) : (
                                            row[col.key]
                                        )}
                                    </td>
                                ))}
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
    )
}

export default CustomTable