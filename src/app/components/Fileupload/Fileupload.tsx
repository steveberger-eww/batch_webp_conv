// components/FileUpload.js
"use client";

import { useDropzone, FileRejection } from "react-dropzone";
import axios from "axios";

// interface FileUploadProps {
//   onUpload: (acceptedFiles: File[]) => void;
// }

// const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       "image/png": [".png"],
//       "image/jpg": [".jpg"],
//       "image/jpeg": [".jpeg"],
//     },
//     onDrop: (acceptedFiles) => onUpload(acceptedFiles),
//   });

interface FileUploadProps {
  onUpload: (acceptedFiles: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    onDrop: async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      // You can handle file rejections here if needed
      if (fileRejections.length > 0) {
        console.log("Some files were rejected:", fileRejections);
      }

      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target) {
          const arrayBuffer = event.target.result as ArrayBuffer;
          try {
            const response = await axios.post(
              "http://localhost:3001/convertToWebp",
              {
                imageBuffer: Array.from(new Uint8Array(arrayBuffer)),
              }
            );

            console.log("Conversion response:", response.data);

            onUpload(acceptedFiles);
          } catch (error) {
            console.error("Error converting to WebP:", error);
          }
        }
      };

      reader.readAsArrayBuffer(file);
    },
  });

  return (
    <div className="container h-screen mx-auto py-0 ">
      <div
        {...getRootProps()}
        className="p-4 border-dashed border-2 border-gray-300 rounded-md text-center cursor-pointer h-3/6"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500 mx-auto py-0">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
