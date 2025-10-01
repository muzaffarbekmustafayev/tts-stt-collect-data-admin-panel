import { useCallback, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { type Accept } from "react-dropzone";

interface FileUploadProps {
  accept?: { [key: string]: string[] } | string;
  maxSize?: number;
  onUploadComplete?: (file: File | null) => void;
  uploadUrl?: string | null;
  token?: string | null;
}

interface UploadFile {
  file: File;
  preview: string | null;
  errors: string[];
  progress: number;
  status: "ready" | "uploading" | "done" | "error";
}

function readableBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function FileUpload({
  accept = { "text/csv": [".csv"] },
  // accept = { "text/plain": [] },
  maxSize = 10 * 1024 * 1024, // 10 MB
  onUploadComplete = () => {},
  uploadUrl = null,
  token = null,
}: FileUploadProps) {
  const [file, setFile] = useState<UploadFile | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setGlobalError(null);

      if (acceptedFiles.length > 0) {
        const f = acceptedFiles[0];
        setFile({
          file: f,
          preview: f.type === "text/csv" ? URL.createObjectURL(f) : null,
          errors: [],
          progress: 0,
          status: "ready",
        });
      }

      if (fileRejections.length > 0) {
        const rej = fileRejections[0];
        setFile({
          file: rej.file,
          preview: rej.file.type == "text/csv"
            ? URL.createObjectURL(rej.file)
            : null,
          errors: rej.errors.map((e) => e.message),
          progress: 0,
          status: "error",
        });
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: accept as Accept,
    maxSize,
    multiple: false,
    noClick: true,
  });

  const removeFile = () => {
    if (file?.preview) URL.revokeObjectURL(file.preview);
    setFile(null);
  };

  const upload = async () => {
    if (!file || file.status !== "ready") {
      setGlobalError("File not found.");
      return;
    }

    setGlobalError(null);
    setFile({ ...file, status: "uploading", progress: 0 });

    if (!uploadUrl) {
      // simulate progress
      for (let p = 10; p <= 100; p += 10) {
        await new Promise((r) => setTimeout(r, 120));
        setFile((cur) => (cur ? { ...cur, progress: p } : null));
      }
      setFile((cur) => (cur ? { ...cur, status: "done", progress: 100 } : null));
      onUploadComplete(file.file);
    } else {
      try {
        const form = new FormData();
        form.append("file", file.file);
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        setFile((cur) => (cur ? { ...cur, status: "done", progress: 100 } : null));
        onUploadComplete(file.file);
      } catch (err: unknown) {
        setFile((cur) =>
          cur
            ? { ...cur, status: "error", errors: [err instanceof Error ? err.message : 'Unknown error'], progress: 0 }
            : null
        );
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 rounded-lg p-6 transition-colors focus-within:ring-2 focus-within:ring-offset-2 outline-none
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-dashed border-gray-300 bg-white"
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Upload File</h3>
            <p className="text-sm text-gray-600">
              Drag and drop or{" "}
              <button
                type="button"
                onClick={open}
                className="text-blue-600 underline"
              >
                upload
              </button>{" "}
              button.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Accepted:{" "}
              {typeof accept === "string"
                ? accept
                : Object.keys(accept).join(", ")}{" "}
              • Max: {readableBytes(maxSize)}
            </p>
          </div>

          <button
            type="button"
            onClick={open}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Select File
          </button>
        </div>

        {isDragActive && (
          <p className="mt-3 text-sm text-blue-700">
            Drag and drop — file is being accepted...
          </p>
        )}
      </div>

      {/* File preview */}
      {file && (
        <div className="mt-4 border rounded p-3 flex items-center gap-3">
          <div className="w-16 h-12 flex items-center justify-center bg-gray-50 rounded overflow-hidden">
            {/* {file.preview ? (
              <img
                src={file.preview}
                alt={file.file.name}
                className="object-cover w-full h-full"
              />
            ) : (
            )} */}
            <span className="text-xs">{file.file.name.split(".").pop()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium truncate">{file.file.name}</div>
                <div className="text-xs text-gray-500">
                  {readableBytes(file.file.size)}
                </div>
              </div>
              <div className="text-sm">
                {file.status === "uploading" && (
                  <span className="text-gray-600">
                    Uploading {file.progress}%
                  </span>
                )}
                {file.status === "done" && (
                  <span className="text-green-600">Uploaded</span>
                )}
                {file.status === "error" && (
                  <span className="text-red-600">Error</span>
                )}
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 h-2 rounded">
              <div
                style={{ width: `${file.progress}%` }}
                className={`h-2 rounded ${
                  file.status === "error" ? "bg-red-500" : "bg-blue-500"
                }`}
              />
            </div>
            {file.errors.length > 0 && (
              <div className="text-xs text-red-600 mt-1">
                {file.errors.map((e, i) => (
                  <div key={i}>{e}</div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={removeFile}
            className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Remove
          </button>
        </div>
      )}

      {/* controls */}
      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={upload}
          type="button"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Upload
        </button>
        <button
          onClick={removeFile}
          type="button"
          className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Clear
        </button>
        {globalError && (
          <div className="text-sm text-red-600">{globalError}</div>
        )}
      </div>
    </div>
  );
}
