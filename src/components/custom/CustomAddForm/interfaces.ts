// Base interfaces for add form components
export interface FieldProps {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  options?: { label: string; value: string }[];
  render?: (value: unknown, row: unknown) => React.ReactNode;
  required?: boolean;
  noedit?: boolean;
  defaultValue?: string;
  name?: string;
  is_reference?: boolean;
  reference?: string;
}

export interface DataProps {
  id: string | number;
  [key: string]: unknown;
}

// Generic add form props interface
export interface GenericAddFormProps<T extends DataProps> {
  fields: FieldProps[];
  onSave: (item: T) => void;
  onCancel: () => void;
}

export interface GenericFormActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export interface GenericFormBodyProps {
  item: DataProps;
  fields: FieldProps[];
  handleChange: (key: string, value: string) => void;
}