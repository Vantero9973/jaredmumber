"use client";

import { useState } from "react";

export default function UploadPage() {
  const [status, setStatus] = useState("");

  async function handleFiles(files) {
    const fileArray = Array.from(files);
    setStatus(`Uploading 0 of ${fileArray.length}...`);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      const urlRes = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!urlRes.ok) {
        setStatus("Something went wrong getting the upload URL.");
        return;
      }

      const { uploadUrl } = await urlRes.json();

      const putRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!putRes.ok) {
        setStatus(`Upload failed on file ${i + 1}.`);
        return;
      }

      setStatus(`Uploading ${i + 1} of ${fileArray.length}...`);
    }

    await fetch("/api/upload-complete", { method: "POST" });
    setStatus(`Done! ${fileArray.length} photos uploaded.`);
  }

  return (
    <main
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      className="flex flex-col items-center justify-center gap-5 h-100 border-4 border-dashed border-neutral-300 m-5"
    >
      <p className="text-xl">Drop photos here</p>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {status && <p className="text-lg">{status}</p>}
    </main>
  );
}
