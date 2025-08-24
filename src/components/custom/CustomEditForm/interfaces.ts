// Base interfaces for edit form components
export interface FieldProps {
  key: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  options?: { label: string; value: string }[];
  render?: (value: unknown, row: unknown) => React.ReactNode;
}

export interface DataProps {
  id: string | number;
  [key: string]: unknown;
}

// Generic edit form props interface
export interface GenericFormProps<T extends DataProps> {
  item: T;
  fields: FieldProps[];
  onSave: (item: T) => void;
  onCancel: () => void;
}

export interface GenericFormActionsProps {
  onSave: () => void;
  onCancel: () => void;
}

export interface GenericFormBodyProps<T extends DataProps> {
  item: T;
  fields: FieldProps[];
  handleChange: (key: string, value: string) => void;
}

