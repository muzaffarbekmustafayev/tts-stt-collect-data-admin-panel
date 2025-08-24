import type { DataProps, FieldProps } from "./CustomEditForm/interfaces";
import CustomEditForm from "./CustomEditForm";

interface GenericEditFormProps<T extends DataProps> {
  title?: string;
  item: T;
  fields: FieldProps[];
  onSave: (item: T) => void;
  onCancel: () => void;
}

export default function GenericEditForm<T extends DataProps>({
  title,
  item,
  fields,
  onSave,
  onCancel,
}: GenericEditFormProps<T>) {

  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 backdrop-blur-xs transition-all duration-300">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-medium mb-4">{title || "Edit Item"}</h3>
          <CustomEditForm
            item={item}
            fields={fields}
            onSave={onSave}
            onCancel={onCancel}
          />
        </div>
      </div>
    </>
  )
}