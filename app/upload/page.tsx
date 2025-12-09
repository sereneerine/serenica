"use client";
import UploadDropzone from "../../components/UploadDropzone";

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Upload sample</h2>
      <div className="bg-panel p-6 rounded">
        <UploadDropzone />
      </div>
    </div>
  );
}
