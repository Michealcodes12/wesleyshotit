"use client";
import { supabase } from "@/app/superbase/config";
import {
  Button,
  SectionHeading,
} from "@/app/utils/helper_function";
import { SERVICES } from "@/app/utils/Data";
import {
  BookingFormData,
  BookingRecord,
} from "@/app/utils/typescript_interface";
import {
  Check,
  Loader2,
  MapPin,
  ArrowBigDownIcon,
} from "lucide-react";
import { useState } from "react";

export function BookingView({ user, navigateTo }: { user: any, navigateTo: (tab: string) => void }) {
  const [step, setStep] = useState(1);
  const [booked, setisbooked] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [formData, setFormData] = useState<BookingFormData>({
    clientName: "",
    clientEmail: "",
    service: "",
    date: "",
    time: "",
    location: "",
    message: "",
    event_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    setisloading(true);
    const selectedDate = e.target.value;
    const { data, error } = await supabase.from("bookings").select("date");
    if (error) {
      console.log(error, "Error Fetching date");
    }
    if (data) {
      setisloading(false);
      const dates = data.map((item) => item.date);
      if (dates.includes(selectedDate)) {
        setisbooked(true);
      } else {
        setisbooked(false);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);

    if (!user) return; // Guard
    setIsSubmitting(true);
    const bookingData = {
      name: formData.clientName,
      email: formData.clientEmail,
      event_type: formData.event_type,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      message: formData.message,
      service: formData.service,
      status: "pending",
    };
    

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select(); // Returns the created row
      setSuccess(true);
      if(data){
        // const sendemail = await fetch("/api/send", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({name: formData.clientName, email: formData.clientEmail}),
        // })
        // const res = await sendemail.json()
        // console.log("Email sent response:", res);}
      }
    } catch (error) {
      console.log("Booking failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  if (success) {
    return (
      <div className="min-h-[80vh] py-24 px-6 flex items-center justify-center">
        <div className="bg-zinc-900 p-8 md:p-12 rounded-2xl border border-green-500/20 text-center max-w-2xl w-full animate-in zoom-in">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Booking Confirmed</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Thanks, {formData.clientName}. To proceed With payment Follow The
            link Below
          </p>

          <a
            href={"#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all transform hover:scale-105 mb-12 shadow-lg shadow-blue-500/20"
          >
            <ArrowBigDownIcon className="w-5 h-5" /> Make Payment
          </a>
          <div className="mt-8">
            <Button variant="outline" onClick={() => navigateTo("portfolio")}>
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 bg-black">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="Book Your Shoot" subtitle="Step-by-Step" />

        <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Progress Bar */}
          <div className="flex border-b border-white/10">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${
                  step >= s ? "bg-white text-black" : "text-zinc-500"
                }`}
              >
                Step {s}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-10">
                <h3 className="text-2xl font-bold mb-6">Select a Service</h3>
                <div className="grid gap-4">
                  {SERVICES.map((service) => (
                    <div
                      key={service.id}
                      onClick={() =>
                        handleInputChange("service", service.title)
                      }
                      className={`p-6 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                        formData.service === service.title
                          ? "bg-white text-black border-white"
                          : "bg-black border-white/10 hover:border-white/30"
                      }`}
                    >
                      <div>
                        <div className="font-bold text-lg">{service.title}</div>
                        <div
                          className={`text-sm ${
                            formData.service === service.id
                              ? "text-zinc-600"
                              : "text-zinc-500"
                          }`}
                        >
                          {service.duration}
                        </div>
                      </div>
                      <div className="font-bold text-xl">${service.price}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <Button onClick={nextStep} disabled={!formData.service}>
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-10">
                <h3 className="text-2xl font-bold mb-6">Date & Details</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
                      value={formData.date}
                      onBlur={(e) => handleBlur(e)}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                    />
                    {booked ? (
                      <div className="error">
                        <span>This Date is Booked</span>
                      </div>
                    ) : (
                      ""
                    )}
                    {isloading ? (
                      <div className="error">
                        <span>checking availability...</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Preferred Time
                    </label>
                    <select
                      className="w-full bg-black border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
                      value={formData.time}
                      onChange={(e) =>
                        handleInputChange("time", e.target.value)
                      }
                    >
                      <option value="">Select Time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Event Type
                    </label>
                    <select
                      className="w-full bg-black border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
                      value={formData.event_type}
                      onChange={(e) =>
                        handleInputChange("event_type", e.target.value)
                      }
                    >
                      <option value="">Select Event</option>
                      <option value="wedding">Weddings</option>
                      <option value="Birthday">Birthday Party</option>
                      <option value="Commercial">
                        Studio / Out-Door Session
                      </option>
                      <option value="Commercial">Co-Operate Meetings </option>

                      <option value="Burial">Burial Ceremony</option>
                      <option value="Burial">Other </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Shoot Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="e.g. Studio, Beach, Your Office"
                      required
                      className="w-full bg-black border border-white/10 rounded-lg p-3 pl-10 focus:outline-none focus:border-white transition-colors"
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={
                      !formData.date || !formData.time || !formData.location
                    }
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-10">
                <h3 className="text-2xl font-bold mb-6">Your Information</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full bg-black border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
                      value={formData.clientName}
                      onChange={(e) =>
                        handleInputChange("clientName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full bg-black border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
                      value={formData.clientEmail}
                      onChange={(e) =>
                        handleInputChange("clientEmail", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full bg-black border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                  />
                </div>

                <div className="bg-white/5 p-4 rounded-lg text-sm text-zinc-400">
                  <p>
                    By clicking submit, you agree to our booking terms. A
                    non-refundable deposit may be required to secure your slot.
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.clientName ||
                      !formData.clientEmail
                    }
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing
                      </span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
