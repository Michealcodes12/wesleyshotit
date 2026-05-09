"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mapping of packages to prices
const PACKAGE_PRICES = {
  essential: 750000,
  premium: 1250000,
  luxury: 2500000,
};

type Booking = {
  id: string;
  partner_1_name: string;
  partner_2_name: string;
  email: string;
  event_date: string;
  package_level: keyof typeof PACKAGE_PRICES; // "essential" | "premium" | "luxury"
  status: "pending" | "confirmed" | "cancelled" | "paid";
  created_at: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Simple password check (In a real app, use proper auth)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthorized(true);
      localStorage.setItem("admin_auth", "true");
      fetchBookings();
    } else {
      toast.error("Invalid password");
    }
  };

  async function fetchBookings() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast.error("Failed to fetch bookings: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  // On client mount, restore auth state from localStorage and fetch bookings if needed
  useEffect(() => {
    (() => {
      const wasAuthorized = localStorage.getItem("admin_auth") === "true";
      if (wasAuthorized) {
        setIsAuthorized(true);
        fetchBookings();
      }
    })();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Booking ${newStatus}`);
      fetchBookings(); // Refresh
    } catch (error) {
      toast.error("Update failed: " + (error as Error).message);
    }
  };

  const handleBroadcastEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailMessage.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setIsSendingEmail(true);
    try {
      const emails = bookings.map((b) => b.email).filter(Boolean);
      const uniqueEmails = Array.from(new Set(emails));

      if (uniqueEmails.length === 0) {
        toast.error("No users to send email to");
        return;
      }

      // Call the existing API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emails: uniqueEmails, // Assuming the API supports array of emails
          message: emailMessage,
          subject: "Update from WesleyShotIt",
        }),
      });

      if (!response.ok) throw new Error("Failed to send email");

      toast.success(`Email sent to ${uniqueEmails.length} users`);
      setEmailMessage("");
    } catch (error) {
      toast.error("Failed to send email: " + (error as Error).message);
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Analytics Calculations
  const totalClients = bookings.length;
  const pendingClients = bookings.filter((b) => b.status === "pending").length;
  const confirmedClients = bookings.filter(
    (b) => b.status === "confirmed",
  ).length;

  const totalRevenue = bookings.reduce((acc, booking) => {
    if (booking.status === "confirmed" || booking.status === "paid") {
      const price =
        PACKAGE_PRICES[booking.package_level as keyof typeof PACKAGE_PRICES] ||
        0;
      return acc + price;
    }
    return acc;
  }, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  if (!isAuthorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md bg-secondary/10 border border-border p-8 rounded-none">
          <h1 className="text-xl font-medium mb-6 text-center tracking-wider">
            ADMIN ACCESS
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest opacity-60">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-none bg-secondary/30"
                placeholder="Enter admin password"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 rounded-none bg-primary text-primary-foreground"
            >
              LOGIN
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Default password is{" "}
            <code className="bg-secondary p-1">admin123</code>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-32 pb-24 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-light tracking-wide text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground font-light">
              Manage your bookings and clients
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("admin_auth");
              setIsAuthorized(false);
            }}
            className="rounded-none"
          >
            Logout
          </Button>
        </header>

        {/* Analytics Board */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-secondary/10 border border-border p-6 rounded-none">
            <span className="text-xs uppercase tracking-widest opacity-60">
              Total Bookings
            </span>
            <p className="text-3xl font-light mt-2">{totalClients}</p>
          </div>
          <div className="bg-secondary/10 border border-border p-6 rounded-none">
            <span className="text-xs uppercase tracking-widest opacity-60">
              Pending Clients
            </span>
            <p className="text-3xl font-light mt-2 text-yellow-500">
              {pendingClients}
            </p>
          </div>
          <div className="bg-secondary/10 border border-border p-6 rounded-none">
            <span className="text-xs uppercase tracking-widest opacity-60">
              Confirmed Clients
            </span>
            <p className="text-3xl font-light mt-2 text-primary">
              {confirmedClients}
            </p>
          </div>
          <div className="bg-secondary/10 border border-border p-6 rounded-none">
            <span className="text-xs uppercase tracking-widest opacity-60">
              Revenue (Confirmed)
            </span>
            <p className="text-2xl font-light mt-2 text-emerald-500">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
        </section>

        {/* Bookings Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-light tracking-wide">Recent Bookings</h2>
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase tracking-widest bg-secondary/20 opacity-60">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Event Date</th>
                  <th className="px-6 py-4">Package</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-t border-border hover:bg-secondary/5"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium">
                          {booking.partner_1_name} & {booking.partner_2_name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {booking.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">{booking.event_date}</td>
                      <td className="px-6 py-4 uppercase text-xs">
                        {booking.package_level}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            "px-2 py-1 text-xs uppercase tracking-wider rounded-none",
                            booking.status === "confirmed"
                              ? "bg-primary/20 text-primary"
                              : booking.status === "pending"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        {booking.status === "pending" && (
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground text-xs rounded-none"
                            onClick={() =>
                              handleStatusUpdate(booking.id, "confirmed")
                            }
                          >
                            Approve
                          </Button>
                        )}
                        {booking.status !== "cancelled" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs rounded-none border-border"
                            onClick={() =>
                              handleStatusUpdate(booking.id, "cancelled")
                            }
                          >
                            Cancel
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Email Broadcast */}
        <section className="bg-secondary/10 border border-border p-8 rounded-none space-y-4">
          <div>
            <h2 className="text-lg font-light tracking-wide">
              Broadcast Email
            </h2>
            <p className="text-sm text-muted-foreground font-light">
              Send a message to all users on the dashboard
            </p>
          </div>
          <form onSubmit={handleBroadcastEmail} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest opacity-60">
                Message
              </label>
              <textarea
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                className="w-full h-32 p-4 bg-secondary/30 border border-border focus:outline-none focus:ring-1 focus:ring-primary text-sm font-light"
                placeholder="Type your message here..."
              />
            </div>
            <Button
              type="submit"
              disabled={isSendingEmail || loading}
              className="bg-primary text-primary-foreground rounded-none"
            >
              {isSendingEmail ? "Sending..." : "Send to All Users"}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
