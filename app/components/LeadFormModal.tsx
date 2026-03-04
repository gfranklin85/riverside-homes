"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/submitLead";
import AddressAutocomplete from "./AddressAutocomplete";
import AppointmentPicker from "./AppointmentPicker";

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
  const [address, setAddress] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const isAppointment = source === "book-appointment";
  const isCallback = source === "request-callback";
  const showScheduling = isAppointment || isCallback;

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

  // Reset local state when modal opens with a new source
  useEffect(() => {
    if (open) {
      setAddress("");
      setPreferredDate("");
      setPreferredTime("");
    }
  }, [open]);

  const title =
    source === "request-callback"
      ? "Request a Call Back"
      : source === "book-appointment"
        ? "Book Your Appointment"
        : "Get Started";

  const subtitle =
    source === "request-callback"
      ? "Pick a time that works best for your call."
      : source === "book-appointment"
        ? "Choose a date and time for your appointment."
        : "Tell us about your property and we'll reach out.";

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-black/50 backdrop:backdrop-blur-sm bg-white dark:bg-slate-900 sm:rounded-2xl shadow-2xl p-0 w-full max-w-md mx-auto border border-slate-200 dark:border-slate-700 max-sm:m-0 max-sm:max-w-none max-sm:min-h-screen max-sm:rounded-none"
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
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex-shrink-0 ml-4"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form
            action={formAction}
            className="p-4 sm:p-6 space-y-4 max-h-[70vh] max-sm:max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <input type="hidden" name="source" value={source} />

            {/* Name */}
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

            {/* Phone */}
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

            {/* Email */}
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

            {/* Property Address with Google autocomplete */}
            <AddressAutocomplete
              name="address"
              value={address}
              onChange={setAddress}
            />

            {/* Appointment / Callback scheduling */}
            {showScheduling && (
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary text-xl">
                    {isAppointment ? "event" : "phone_callback"}
                  </span>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {isAppointment
                      ? "Schedule Your Appointment"
                      : "When Should We Call?"}
                  </span>
                </div>
                <AppointmentPicker
                  selectedDate={preferredDate}
                  selectedTime={preferredTime}
                  onDateChange={setPreferredDate}
                  onTimeChange={setPreferredTime}
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Message
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
              {isPending
                ? "Sending..."
                : isAppointment
                  ? "Book Appointment"
                  : isCallback
                    ? "Request Call Back"
                    : "Submit"}
            </button>
          </form>
        </div>
      )}
    </dialog>
  );
}
