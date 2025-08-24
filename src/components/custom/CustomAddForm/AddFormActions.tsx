import { Save, X } from "lucide-react";
import type { GenericFormActionsProps } from "./interfaces";

export default function AddFormActions({
  onSave,
  onCancel
}: GenericFormActionsProps) {
  return (
    <div className="flex space-x-2 mt-6 justify-around">
        <button
          onClick={onSave}
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
  )
}
