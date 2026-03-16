"use client";

import type { ListingFormData } from "@/app/types/listing";

interface Props {
  formData: ListingFormData;
  onChange: (updates: Partial<ListingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Media({ formData, onChange, onNext, onBack }: Props) {
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
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
          Add Photos
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Paste image URLs (up to 3). Listings with photos get significantly
          more views.
        </p>
      </div>

      <div className="space-y-4">
        {urls.map((url, i) => (
          <div key={i} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={(e) => updateUrl(i, e.target.value)}
                placeholder={`Image URL ${i + 1}`}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {urls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUrl(i)}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    delete
                  </span>
                </button>
              )}
            </div>

            {/* Live preview */}
            {url.trim() !== "" && (
              <div className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-video">
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
            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary/40 hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm font-bold"
          >
            <span className="material-symbols-outlined">add_photo_alternate</span>
            Add another photo
          </button>
        )}
      </div>

      {!hasImage && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <span className="material-symbols-outlined text-amber-500 shrink-0">
            warning
          </span>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Listings without photos receive far fewer views. Adding at least one
            image is strongly recommended.
          </p>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold py-3.5 px-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 transition-all"
        >
          Next: Financials
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
