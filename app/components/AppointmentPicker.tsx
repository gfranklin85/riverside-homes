"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, addDays, startOfDay } from "date-fns";
import "react-day-picker/style.css";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

type AppointmentPickerProps = {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
};

export default function AppointmentPicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: AppointmentPickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const today = startOfDay(new Date());
  const minDate = addDays(today, 1);
  const maxDate = addDays(today, 60);

  const handleDaySelect = (day: Date | undefined) => {
    if (day) {
      onDateChange(format(day, "yyyy-MM-dd"));
      setCalendarOpen(false);
    }
  };

  const disabledDays = [
    { before: minDate },
    { after: maxDate },
    { dayOfWeek: [0] },
  ];

  const parsedDate = selectedDate ? new Date(selectedDate + "T00:00:00") : undefined;

  return (
    <div className="space-y-4">
      {/* Date Picker */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Preferred Date
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
            calendar_month
          </span>
          <button
            type="button"
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-left text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base"
          >
            {selectedDate
              ? format(new Date(selectedDate + "T00:00:00"), "EEE, MMM d, yyyy")
              : "Select a date..."}
          </button>
          <input type="hidden" name="preferred_date" value={selectedDate} />
        </div>

        {calendarOpen && (
          <div className="mt-2 p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-x-auto">
            <DayPicker
              mode="single"
              selected={parsedDate}
              onSelect={handleDaySelect}
              disabled={disabledDays}
              defaultMonth={minDate}
              classNames={{
                root: "rdp-custom",
                day: "rdp-day-custom",
              }}
            />
          </div>
        )}
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Preferred Time
        </label>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onTimeChange(time)}
              className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all border ${
                selectedTime === time
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-primary/50"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
        <input type="hidden" name="preferred_time" value={selectedTime} />
      </div>
    </div>
  );
}
