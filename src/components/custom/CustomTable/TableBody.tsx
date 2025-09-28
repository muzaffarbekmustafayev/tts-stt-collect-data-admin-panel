import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import type { TableBodyProps, DataProps } from './interfaces';
 
const backendUrl = import.meta.env.VITE_API_URL;

export default function TableBody<T extends DataProps>({ 
  data, 
  columns, 
  onDelete,
  onEdit,
  onView,
  showActions = true,
  actions = {
    edit: true,
    delete: true,
    view: false
  },
  canNotEdit = false,
  canNotDelete = false
}: TableBodyProps<T>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(item => (
        <tr key={item.id} className="hover:bg-gray-50">
          {columns.map(col => (
            <td key={col.key} className={`px-6 py-4 whitespace-wrap break-words text-sm text-gray-900 ${col?.width || ''}`}>
              {col.render
                ? col.render(item[col.key as keyof T], item)
                : (
                  typeof item[col.key as keyof T] === 'string' ||
                  typeof item[col.key as keyof T] === 'number' ||
                  React.isValidElement(item[col.key as keyof T])
                    ? col.type == 'audio_url' && backendUrl ? <audio src={ backendUrl + '/' + item[col.key as keyof T] as string} controls /> : (item[col.key as keyof T] as React.ReactNode)
                    : col.type == 'checkbox' ? item[col.key as keyof T] as boolean ? 'Yes' : 'No' : 
                    '-'
                )
              }
            </td>
          ))}
          {showActions && !canNotEdit && !canNotDelete && (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <div className="flex space-x-2">
                {actions.view && onView && (
                  <button
                    onClick={() => onView(item)}
                    className="text-green-600 hover:text-green-900"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                )}
                {actions.edit && onEdit && !canNotEdit && (
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-900"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                )}
                {actions.delete && onDelete && !canNotDelete && (
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
