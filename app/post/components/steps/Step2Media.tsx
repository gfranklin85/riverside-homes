"use client";

import type { ListingFormData } from "@/app/types/listing";

interface Props {
  formData: ListingFormData;
  onChange: (updates: Partial<ListingFormData>) => void;
}

export default function Step2Media({ formData, onChange }: Props) {
  const urls = formData.imageUrls.length > 0 ? formData.imageUrls : [""];

  function updateUrl(index: number, value: string) {
    const next = [...urls];
    next[index] = value;
    onChange({ imageUrls: next });
  }

  function addUrl() {
    if (urls.length < 3) onChange({ imageUrls: [...urls, ""] });
  }

  function removeUrl(index: number) {
    const next = urls.filter((_, i) => i !== index);
    onChange({ imageUrls: next.length > 0 ? next : [""] });
  }

  const hasImage = urls.some((u) => u.trim() !== "");

  return (
    <div className="space-y-6">
      {/* Drag-and-drop zone */}
      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors bg-slate-50/50 dark:bg-slate-800/30">
        <span className="material-symbols-outlined text-5xl text-slate-400 dark:text-slate-500 mb-4">
          cloud_upload
        </span>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Drag and drop photos
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs mt-1">
          Upload high-quality images. JPG, PNG up to 10MB each.
        </p>
        <button
          type="button"
          className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-6 py-2 rounded-lg text-sm font-bold text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Browse Files
        </button>
      </div>

      {/* URL inputs */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Or paste image URLs
        </p>
        {urls.map((url, i) => (
          <div key={i} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(i, e.target.value)}
                placeholder={`Image URL ${i + 1}`}
                className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              {urls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUrl(i)}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              )}
            </div>
            {url.trim() !== "" && (
              <div className="relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video">
                <img
                  src={url}
                  alt={`Preview ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-300 text-4xl">
                    broken_image
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
        {urls.length < 3 && (
          <button
            type="button"
            onClick={addUrl}
            className="w-full py-2.5 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary/40 hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm font-bold"
          >
            <span className="material-symbols-outlined">add_photo_alternate</span>
            Add another photo
          </button>
        )}
      </div>

      {!hasImage && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <span className="material-symbols-outlined text-amber-500 shrink-0">warning</span>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Listings without photos receive far fewer views. Adding at least one image is strongly
            recommended.
          </p>
        </div>
      )}
    </div>
  );
}
