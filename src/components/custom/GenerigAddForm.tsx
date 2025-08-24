import type { DataProps, FieldProps } from "./CustomAddForm/interfaces";
import CustomAddForm from "./CustomAddForm";

interface GenericAddFormProps<T extends DataProps> {
  title?: string;
  fields: FieldProps[];
  onSave: (item: T) => void;
  onCancel: () => void;
}

export default function GenericAddForm<T extends DataProps>({
  title,
  fields,
  onSave,
  onCancel
}: GenericAddFormProps<T>) {

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 backdrop-blur-xs transition-all duration-300">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-medium mb-4">{title || "Add Item"}</h3>
          <CustomAddForm
            fields={fields}
            onSave={onSave}
            onCancel={onCancel}
          />
        </div>
      </div>
    </>
  )
}