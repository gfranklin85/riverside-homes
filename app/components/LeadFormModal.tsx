"use client";

import { useActionState, useRef, useEffect } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/submitLead";

type LeadFormModalProps = {
  open: boolean;
  onClose: () => void;
  source: string;
};

const initialState: LeadFormState = { status: "idle", message: "" };

export default function LeadFormModal({
  open,
  onClose,
  source,
}: LeadFormModalProps) {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const title =
    source === "request-callback"
      ? "Request a Call Back"
      : "Book Your Appointment";

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-0 w-full max-w-md mx-auto border border-slate-200 dark:border-slate-700"
    >
      {state.status === "success" ? (
        <div className="p-8 text-center">
          <span className="material-symbols-outlined text-5xl text-green-500 mb-4 block">
            check_circle
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Thank You!
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {state.message}
          </p>
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Close
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form action={formAction} className="p-6 space-y-4">
            <input type="hidden" name="source" value={source} />

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="(951) 555-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Message or Property Address
              </label>
              <textarea
                name="message"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                placeholder="Tell us about your property or ask a question..."
              />
            </div>

            {state.status === "error" && (
              <p className="text-red-500 text-sm font-medium">
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all"
            >
              {isPending ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </dialog>
  );
}
