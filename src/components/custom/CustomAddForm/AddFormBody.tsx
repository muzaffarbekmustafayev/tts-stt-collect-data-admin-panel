import type { FieldProps, GenericFormBodyProps } from "./interfaces";

export default function AddFormBody({
  item, 
  fields,
  handleChange
}: GenericFormBodyProps) {
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
                      value={item[field.key] as string || ''}
                      defaultValue={'-'}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      required={field?.required}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option selected>{'-'}</option>
                      {field.options?.map((option: { label: string; value: string }) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      required={field?.required}
                      value={item[field.key] as string || field?.defaultValue || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      required={field?.required}
                      name={field?.name || ''}
                      value={item[field.key] as string || field?.defaultValue || ''}
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
