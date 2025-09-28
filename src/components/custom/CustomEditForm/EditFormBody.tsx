import type { DataProps, FieldProps, GenericFormBodyProps } from "./interfaces";

export default function EditFormBody<T extends DataProps>({
  item,
  fields,
  handleChange
}: GenericFormBodyProps<T>) {
  return (
    <div className="space-y-4">
        {
          fields.map(
            (field: FieldProps) => {
              if(field.key === 'id' || field.key === 'created_at' || field.key === 'checked_at') return null;
              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={item[field.key] as string || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {field.options?.map((option: { label: string; value: string }) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={item[field.key] as string || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={item[field.key] as string}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                </div>
              )
            }
          )
        }
      </div>
  )
}
