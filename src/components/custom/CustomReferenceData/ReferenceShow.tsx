import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCallback, useEffect, useState } from "react";
import type { ColumnsProps, DataProps } from "../CustomTable/interfaces";
import { apiService } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ReferenceShowProps<T extends DataProps> {
  setShowReference: (show: boolean) => void;
  reference: { item: T, col: ColumnsProps } | null;
  setReference: (reference: { item: T, col: ColumnsProps } | null) => void;
  showReference: boolean;
}

export default function ReferenceShow<T extends DataProps>({ setShowReference, reference, setReference, showReference }: ReferenceShowProps<T>) {
  const closeHandler = () => {
    setShowReference(false);
    setReference(null);
  }
  const { token, logout } = useAuth();
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    try {
      if (reference) {
        if (reference.col.reference === 'users') {
          const user_id = (reference.item as Record<string, unknown>).user_id as string
            || (reference.item as Record<string, unknown>).checked_by as string;
          if (!user_id || user_id === 'undefined' || user_id === 'null') return;
          const res = await apiService.getReferenceUser(user_id, token as string);
          if (res.success) {
            setData(res.data);
          } else if(res.status && res.status === 401) {
            logout();
          } else {
            toast.error('Failed to fetch data: '+ res.message);
          }
        }
        else if (reference.col.reference === 'sentences') {
          const sentence_id = (reference.item as Record<string, unknown>).sentence_id as string;
          if (!sentence_id || sentence_id === 'undefined' || sentence_id === 'null') return;
          const res = await apiService.getReferenceSentence(sentence_id, token as string);
          if (res.success) {
            setData(res.data);
          } else if(res.status && res.status === 401) {
            logout();
          } else {
            toast.error('Failed to fetch data: '+ res.message);
          }
        }
        else if (reference.col.reference === 'audios') {
          const audio_id = (reference.item as Record<string, unknown>).audio_id as string;
          if (!audio_id || audio_id === 'undefined' || audio_id === 'null') return;
          const res = await apiService.getReferenceAudio(audio_id, token as string);
          if (res.success) {
            setData(res.data);
          } else if(res.status && res.status === 401) {
            logout();
          } else {
            toast.error('Failed to fetch data: '+ res.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch data: '+ (error as Error).message);
    }
  }, [reference, token, logout]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Dialog defaultOpen={true} open={showReference} onOpenChange={closeHandler}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Reference Data
          </DialogTitle>
          <DialogDescription className="sr-only">
            Reference data details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {reference && Object.entries(data).length > 0 ? (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center border-b border-gray-200 pb-3 last:border-b-0">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    <div className="text-sm text-gray-900 bg-white p-2 rounded border min-h-[32px] flex items-center">
                      {value as unknown as React.ReactNode}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 text-sm">
                Reference Data is loading...
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}



