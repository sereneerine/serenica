"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function UploadDropzone() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });

  async function startUpload() {
    if (files.length === 0) return;
    setUploading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload-url`, {
        files: files.map(f => ({ name: f.name, size: f.size, type: f.type }))
      });
      const uploads = res.data as { signedUrls: string[] };
      await Promise.all(files.map((file, i) =>
        axios.put(uploads.signedUrls[i], file, { headers: { "Content-Type": file.type } })
      ));
      const jobResp = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        files: files.map(f => ({ name: f.name }))
      });
      alert("Upload started. Job ID: " + jobResp.data.jobId);
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + (err as any).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div {...getRootProps()} className="border-2 border-dashed border-silver rounded p-8 cursor-pointer">
        <input {...getInputProps()} />
        <p className="text-silver">Drag & drop VCF/FASTQ/BAM here or click to select</p>
      </div>

      <div className="mt-4">
        {files.length > 0 && (
          <div>
            <div className="mb-2 text-silver">Files to upload:</div>
            <ul>
              {files.map((f, idx) => (
                <li key={idx} className="text-white">{f.name} — {Math.round(f.size/1024)} KB</li>
              ))}
            </ul>
            <div className="mt-4">
              <button onClick={startUpload} className="bg-helix px-4 py-2 rounded text-midnight" disabled={uploading}>
                {uploading ? "Uploading…" : "Start Upload"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
