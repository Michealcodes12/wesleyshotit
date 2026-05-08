"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/lib/supabase";
import { isSameDay } from "date-fns";

interface BookingCalendarProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

export function BookingCalendar({ selected, onSelect }: BookingCalendarProps) {
  const [occupiedDates, setOccupiedDates] = React.useState<Date[]>([]);
  const [pendingDates, setPendingDates] = React.useState<Date[]>([]);

  React.useEffect(() => {
    async function fetchDates() {
      // Fetch confirmed bookings and manual unavailable dates
      const { data: bookings } = await supabase
        .from("bookings")
        .select("event_date, status");

      const { data: unavailable } = await supabase
        .from("unavailable_dates")
        .select("date");

      if (bookings) {
        setOccupiedDates(
          bookings
            .filter((b) => b.status === "confirmed")
            .map((b) => new Date(b.event_date)),
        );
        setPendingDates(
          bookings
            .filter((b) => b.status === "pending")
            .map((b) => new Date(b.event_date)),
        );
      }

      if (unavailable) {
        setOccupiedDates((prev) => [
          ...prev,
          ...unavailable.map((u) => new Date(u.date)),
        ]);
      }
    }

    fetchDates();
  }, []);

  return (
    <div className="w-full p-6 bg-secondary/30 border border-border/50 flex flex-col items-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={(date) =>
          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
          occupiedDates.some((d) => isSameDay(d, date))
        }
        initialFocus
        className="mx-auto"
        modifiers={{
          occupied: occupiedDates,
          pending: pendingDates,
        }}
        modifiersStyles={{
          occupied: {
            textDecoration: "line-through",
            color: "#9CA3AF",
            cursor: "not-allowed",
          },
          pending: { backgroundColor: "#FEF3C7", color: "#B45309" },
          selected: { backgroundColor: "#000000", color: "#FFFFFF" },
        }}
      />
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] uppercase tracking-widest opacity-60">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-foreground" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-200" />
          <span>Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
}
