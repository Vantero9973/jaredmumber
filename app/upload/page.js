"use client";

import { useState, useEffect } from "react";

export default function UploadPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (unlocked) refreshPhotos();
  }, [unlocked]);

  async function refreshPhotos() {
    const res = await fetch("/api/list-photos");
    const data = await res.json();
    setPhotos(data.photos.reverse());
  }

  async function checkPassword() {
    setError("");
    const res = await fetch("/api/check-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();

    if (data.valid) {
      setUnlocked(true);
    } else {
      setError("Wrong password, try again.");
    }
  }

  async function handleFiles(files) {
    const fileArray = Array.from(files);
    setStatus(`Uploading 0 of ${fileArray.length}...`);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];

      const urlRes = await fetch("/api/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!urlRes.ok) {
        setStatus("Something went wrong. Try refreshing and logging in again.");
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

    await fetch("/api/upload-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setStatus(`Done! ${fileArray.length} photos uploaded.`);
    refreshPhotos();
  }

  async function handleDelete(key) {
    if (!confirm("Delete this photo?")) return;

    await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, key }),
    });

    refreshPhotos();
  }

  if (!unlocked) {
    return (
      <main className="flex flex-col items-center justify-center h-100 gap-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && checkPassword()}
          className="text-lg p-3 border border-neutral-300 rounded"
        />
        <button
          onClick={checkPassword}
          className="text-lg px-5 py-2.5 bg-neutral-900 text-white rounded"
        >
          Enter
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </main>
    );
  }

  return (
    <main className="p-6">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="flex flex-col items-center justify-center gap-5 h-64 border-4 border-dashed border-neutral-300 mb-8"
      >
        <p className="text-xl">Drop photos here</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {status && <p className="text-lg">{status}</p>}
      </div>

      <h2 className="text-lg font-semibold mb-4">
        Current photos ({photos.length})
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {photos.map((photo) => (
          <div key={photo.key} className="relative group">
            <img src={photo.url} alt="" className="w-full h-32 object-cover" />
            <button
              onClick={() => handleDelete(photo.key)}
              className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
