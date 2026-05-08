"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingCalendar } from "@/components/BookingCalendar";
import { toast } from "sonner";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const bookingSchema = z.object({
  partner_1_name: z.string().min(2, "Name is required"),
  partner_2_name: z.string().min(2, "Name is required"),
  event_date: z.date({ message: "Please select a date" }),
  location: z.string().min(3, "Location is required"),
  event_types: z.array(z.string()).min(1, "Select at least one event type"),
  guest_count: z.string().min(1, "Select guest count"),
  package_level: z.string().min(1, "Select a package"),
  email: z.string().email("Invalid email address"),
  whatsapp_number: z.string().min(10, "Invalid WhatsApp number"),
  newsletter_opt_in: z.boolean(),
});

type BookingValues = z.infer<typeof bookingSchema>;

export default function BookingWizard() {
  "use no memo";
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      partner_1_name: "",
      partner_2_name: "",
      location: "",
      event_types: [],
      guest_count: "",
      package_level: "",
      email: "",
      whatsapp_number: "",
      newsletter_opt_in: true,
    } as Partial<BookingValues>,
  });

  const values = useWatch({ control });

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingValues)[] = [];
    if (step === 1)
      fieldsToValidate = [
        "partner_1_name",
        "partner_2_name",
        "event_date",
        "location",
      ];
    if (step === 2)
      fieldsToValidate = ["event_types", "guest_count", "package_level"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit: SubmitHandler<BookingValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if (!data.event_date) {
        throw new Error("Please select an event date");
      }

      // 1. Insert into bookings
      const { newsletter_opt_in, ...bookingData } = data;
      const { error: bookingError } = await supabase.from("bookings").insert([
        {
          ...bookingData,
          status: "pending",
          event_date: data.event_date.toISOString().split("T")[0],
        },
      ]);

      if (bookingError) throw bookingError;

      // 2. If newsletter opted in, insert into subscribers
      if (newsletter_opt_in) {
        await supabase
          .from("subscribers")
          .insert([{ email: data.email, source: "booking_form" }]);
      }

      // 3. Trigger email (simulated for now, would call an API route)
      await fetch("/api/send-email", {
        method: "POST",
        body: JSON.stringify(data),
      });

      router.push("/success");
    } catch (error) {
      toast.error("Submission failed: " + (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-24 px-4 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-sm tracking-[0.5em] text-primary mb-4 uppercase font-medium">
            Book Your Story
          </h1>
          <div className="flex justify-center items-center gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 w-12 transition-all duration-500 ${i <= step ? "bg-primary" : "bg-secondary"}`}
              />
            ))}
          </div>
        </header>

        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="space-y-12"
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest opacity-60">
                      Your Name
                    </Label>
                    <Input
                      {...register("partner_1_name")}
                      className="rounded-none bg-secondary/30"
                      placeholder="Enter your full name"
                    />
                    {errors.partner_1_name && (
                      <p className="text-destructive text-xs">
                        {errors.partner_1_name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest opacity-60">
                      Partner&apos;s Name
                    </Label>
                    <Input
                      {...register("partner_2_name")}
                      className="rounded-none bg-secondary/30"
                      placeholder="Enter partner's full name"
                    />
                    {errors.partner_2_name && (
                      <p className="text-destructive text-xs">
                        {errors.partner_2_name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest opacity-60">
                    Event Date
                  </Label>
                  <BookingCalendar
                    selected={values.event_date}
                    onSelect={(date) =>
                      setValue("event_date", date as Date, {
                        shouldValidate: true,
                      })
                    }
                  />
                  {errors.event_date && (
                    <p className="text-destructive text-xs">
                      {errors.event_date.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest opacity-60">
                    Location / Venue
                  </Label>
                  <Input
                    {...register("location")}
                    className="rounded-none bg-secondary/30"
                    placeholder="e.g. Benin City, Edo State"
                  />
                  {errors.location && (
                    <p className="text-destructive text-xs">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full h-14 rounded-none bg-primary text-primary-foreground"
                >
                  Next Step <ChevronRight className="ml-2" size={16} />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <Label className="text-[10px] uppercase tracking-widest opacity-60">
                    Event Type
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "White Wedding",
                      "Traditional",
                      "Engagement",
                      "Pre-Wedding",
                    ].map((type) => (
                      <div
                        key={type}
                        className="flex items-center space-x-3 bg-secondary/30 p-4 border border-transparent hover:border-primary/20 transition-all"
                      >
                        <Checkbox
                          id={type}
                          checked={values.event_types?.includes(type)}
                          onCheckedChange={(checked) => {
                            const current = values.event_types || [];
                            setValue(
                              "event_types",
                              checked
                                ? [...current, type]
                                : current.filter((t) => t !== type),
                              { shouldValidate: true },
                            );
                          }}
                        />
                        <label
                          htmlFor={type}
                          className="text-sm font-light cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.event_types && (
                    <p className="text-destructive text-xs">
                      {errors.event_types.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest opacity-60">
                    Guest Count
                  </Label>
                  <Select
                    value={values.guest_count}
                    onValueChange={(v) =>
                      setValue("guest_count", v ?? "", {
                        shouldValidate: true,
                      })
                    }
                  >
                    <SelectTrigger className="rounded-none bg-secondary/30 border-none h-12">
                      <SelectValue placeholder="How many guests are you expecting?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< 100">Less than 100</SelectItem>
                      <SelectItem value="100-300">100 - 300</SelectItem>
                      <SelectItem value="300-500">300 - 500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.guest_count && (
                    <p className="text-destructive text-xs">
                      {errors.guest_count.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] uppercase tracking-widest opacity-60">
                    Package Selection
                  </Label>
                  <RadioGroup
                    value={values.package_level}
                    onValueChange={(v) =>
                      setValue("package_level", v ?? "", {
                        shouldValidate: true,
                      })
                    }
                    className="grid grid-cols-1 gap-4"
                  >
                    {[
                      {
                        id: "essential",
                        name: "Essential Story",
                        price: "₦750,000",
                        desc: "Single photographer, 6 hours coverage.",
                      },
                      {
                        id: "premium",
                        name: "Premium Narrative",
                        price: "₦1,250,000",
                        desc: "Two photographers, 10 hours, Engagement session.",
                      },
                      {
                        id: "luxury",
                        name: "Luxury Story",
                        price: "₦2,500,000",
                        desc: "Full day, Video, Luxury Album, Fine Art prints.",
                      },
                    ].map((pkg) => {
                      const isSelected = values.package_level === pkg.id;
                      return (
                        <div key={pkg.id} className="relative">
                          <RadioGroupItem
                            value={pkg.id}
                            id={pkg.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={pkg.id}
                            className={cn(
                              "flex flex-col p-6 transition-all cursor-pointer border",
                              isSelected
                                ? "bg-muted border-secondary"
                                : "bg-secondary/5 border-border/50",
                            )}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium tracking-wide">
                                {pkg.name}
                              </span>
                              <span className="text-[10px] uppercase tracking-widest opacity-50">
                                {pkg.price}
                              </span>
                            </div>
                            <p className="text-xs font-light text-muted-foreground">
                              {pkg.desc}
                            </p>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                  {errors.package_level && (
                    <p className="text-destructive text-xs">
                      {errors.package_level.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 h-14 rounded-none border-border"
                  >
                    <ChevronLeft className="mr-2" size={16} /> Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-2 h-14 rounded-none bg-primary text-primary-foreground"
                  >
                    Final Step <ChevronRight className="ml-2" size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-6 bg-secondary/30 p-8 border border-border/10">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest opacity-60">
                      Email Address
                    </Label>
                    <Input
                      {...register("email")}
                      className="rounded-none bg-background/50 border-border"
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest opacity-60">
                      WhatsApp Number
                    </Label>
                    <Input
                      {...register("whatsapp_number")}
                      className="rounded-none bg-background/50 border-border"
                      placeholder="+234 ..."
                    />
                    {errors.whatsapp_number && (
                      <p className="text-destructive text-xs">
                        {errors.whatsapp_number.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start space-x-3 pt-4">
                    <Checkbox
                      id="newsletter"
                      checked={values.newsletter_opt_in}
                      onCheckedChange={(checked) =>
                        setValue("newsletter_opt_in", !!checked, {
                          shouldValidate: true,
                        })
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <div className="flex items-center gap-2 leading-none">
                        <label
                          htmlFor="newsletter"
                          className="text-xs font-light cursor-pointer"
                        >
                          By checking this box, you agree to our terms and
                          conditions. Terms & Conditions
                        </label>
                        <Dialog>
                          <DialogTrigger className="text-xs   text-blue-700 underline focus:outline-none ">
                            Read here
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl bg-card border-border">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-light tracking-wide text-foreground">
                                Terms & Conditions
                              </DialogTitle>
                              <DialogDescription className="text-muted-foreground font-light text-sm">
                                Please read our terms carefully before booking.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 text-sm font-light text-foreground/80 max-h-[60vh] overflow-y-auto pr-4 mt-4">
                              <div>
                                <h4 className="text-xs tracking-widest uppercase text-primary mb-2">
                                  1. Booking & Retainer
                                </h4>
                                <p>
                                  A non-refundable retainer fee is required to
                                  secure your date. The remaining balance must
                                  be paid in full before the event day.
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs tracking-widest uppercase text-primary mb-2">
                                  2. Cancellation & Rescheduling
                                </h4>
                                <p>
                                  If you need to cancel or reschedule, please
                                  notify us at least 30 days in advance.
                                  Retainers are non-refundable but may be
                                  applied to a future date at our discretion.
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs tracking-widest uppercase text-primary mb-2">
                                  3. Image Delivery & Copyright
                                </h4>
                                <p>
                                  Sneak peeks are delivered within 1 week. Full
                                  galleries are delivered within the timeframe
                                  specified in your package (4-6 weeks).
                                  Wesleyshotit retains copyright of all images
                                  but grants you a license for personal use.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="flex-1 h-14 rounded-none border-border"
                  >
                    <ChevronLeft className="mr-2" size={16} /> Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-2 h-14 rounded-none bg-primary text-primary-foreground font-medium tracking-widest uppercase text-xs"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking Request"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </main>
  );
}
