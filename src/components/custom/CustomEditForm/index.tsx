import type { DataProps, GenericFormProps } from "./interfaces";
import EditFormBody from "./EditFormBody";
import EditFormActions from "./EditFormActions";
import { useState } from "react";

export default function CustomEditForm<T extends DataProps>({ 
  item, 
  fields, 
  onSave, 
  onCancel
}: GenericFormProps<T>) {

  const [currentData, setCurrentData] = useState<T>(item);
  const handleSave = () => {
    onSave(currentData);
  };

  const handleChange = (key: string, value: string) => {
    setCurrentData({ ...currentData, [key]: value });
  };
  return (
    <>
      <EditFormBody 
        item={currentData} 
        fields={fields}
        handleChange={handleChange}
      />
      <EditFormActions
        onSave={handleSave}
        onCancel={onCancel}
      />
    </>
  )
}
