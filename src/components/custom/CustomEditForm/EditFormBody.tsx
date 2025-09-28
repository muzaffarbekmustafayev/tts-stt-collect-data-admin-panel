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
              if(field.key === 'id' || field.key === 'created_at' || field.key === 'checked_at' || field.noedit) return null;
              return (
                <div key={field.key} className={`${field.required ? 'required' : ''}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                    {field.required ? <span className="text-red-500 ml-1">*</span> : ''}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={typeof item[field.key] === 'boolean' ? item[field.key] as boolean ? 'true' : 'false' : item[field.key] as string || ''}
                      required={field?.required}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className={`${item[field.key] as boolean} w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      {field.options?.map((option: { label: string; value: string }) => (
                        <option key={option.value} value={option.value.toString()}>{option.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={item[field.key] as string || ''}
                      required={field?.required}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={item[field.key] as string}
                      required={field?.required}
                      name={field?.name || ''}
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
