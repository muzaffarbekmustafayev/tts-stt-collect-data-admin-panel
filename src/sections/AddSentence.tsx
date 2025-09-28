import FileUpload from "@/components/custom/FileUpload";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { X } from "lucide-react";

interface AddSentenceFromFileProps {
  showUploadFile: boolean;
  setShowUploadFile: (show: boolean) => void;
}

const backendUrl = import.meta.env.VITE_API_URL;

export const AddSentenceFromFile = ({setShowUploadFile}: AddSentenceFromFileProps) => {
  const { token } = useAuth();
  return (
    <>
      <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50 backdrop-blur-xs transition-all duration-300">
        <div className="bg-white rounded-lg p-6 max-w-max w-full">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium mb-4">Add Sentence From File</h3>
            <Button onClick={() => setShowUploadFile(false)}><X size={16} /></Button>
          </div>
          <div className="flex flex-col gap-2">
          <FileUpload
            accept={{ "text/plain": [] }}
            maxSize={5 * 1024 * 1024}
            uploadUrl={backendUrl + "/sentences/file"}
            onUploadComplete={() => {
              setShowUploadFile(false);
            }}
            token={token}
          />
          </div>
        </div>
      </div>
    </>
  )
}