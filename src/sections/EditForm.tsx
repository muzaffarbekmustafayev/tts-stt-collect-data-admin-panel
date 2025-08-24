import { Save, X } from "lucide-react";



const EditForm = (props: { item: any, fields: any, onSave: any, onCancel: any, setEditingItem: any }) => {
  const { item, fields, onSave, onCancel, setEditingItem } = props;
  return (
    
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-medium mb-4">Edit Item</h3>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                value={item[field.key] || ''}
                onChange={(e) => onSave({ ...item, [field.key]: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {field.options.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                value={item[field.key] || ''}
                onChange={(e) => onSave({ ...item, [field.key]: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            ) : (
              <input
                type={field.type || 'text'}
                value={item[field.key] || ''}
                onChange={(e) => onSave({ ...item, [field.key]: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-6">
        <button
          onClick={() => {
            // Update the data
            const updatedData = { ...data };
            const tableName = currentPage;
            updatedData[tableName] = updatedData[tableName].map(i => 
              i.id === item.id ? item : i
            );
            setData(updatedData);
            setEditingItem(null);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save size={16} className="mr-2" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <X size={16} className="mr-2" />
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
};

export default EditForm;