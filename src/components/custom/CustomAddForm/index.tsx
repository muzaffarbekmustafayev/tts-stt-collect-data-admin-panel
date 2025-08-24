import type { DataProps, GenericAddFormProps } from "./interfaces";
import AddFormBody from "./AddFormBody";
import AddFormActions from "./AddFormActions";
import { useState } from "react";

export default function CustomAddForm<T extends DataProps>({ 
  fields, 
  onSave, 
  onCancel
}: GenericAddFormProps<T>) {

  const [currentData, setCurrentData] = useState<T>({} as T);
  const handleSave = () => {
    onSave(currentData);
  };

  const handleChange = (key: string, value: string) => {
    setCurrentData({ ...currentData, [key]: value });
  };
  return (
    <>
      <AddFormBody
        item={currentData} 
        fields={fields}
        handleChange={handleChange}
      />
      <AddFormActions
        onSave={handleSave}
        onCancel={onCancel}
      />
    </>
  )
}
