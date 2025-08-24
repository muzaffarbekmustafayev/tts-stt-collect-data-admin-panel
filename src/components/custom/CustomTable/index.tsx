import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import type { GenericTableProps, DataProps } from "./interfaces";

export default function CustomTable<T extends DataProps>({ 
  columns, 
  data, 
  onDelete,
  onEdit,
  onView,
  loading = false,
  emptyMessage = "No data available",
  showActions = true,
  actions = {
    edit: true,
    delete: true,
    view: false
  },
  canNotEdit = false,
  canNotDelete = false
}: GenericTableProps<T>) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-8 text-center">
          <p className="text-gray-600">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader 
            columns={columns} 
            showActions={showActions}
            canNotEdit={canNotEdit}
            canNotDelete={canNotDelete}
          />
          <TableBody 
            data={data} 
            columns={columns} 
            onDelete={onDelete}
            onEdit={onEdit}
            onView={onView}
            showActions={showActions}
            actions={actions}
            canNotEdit={canNotEdit}
            canNotDelete={canNotDelete}
          />
        </table>
      </div>
    </div>
  );
}