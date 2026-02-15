'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateReservation } from "@/hooks/use-restaurant";
import { insertReservationSchema } from "@shared/schema";
import { motion } from "framer-motion";
import { CalendarIcon, Clock, Users, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Extend the schema to handle form inputs nicely (date as string initially)
const formSchema = insertReservationSchema.extend({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  partySize: z.coerce.number().min(1, "Must be at least 1 person").max(20, "For groups larger than 20, please contact us directly"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReservationsPage() {
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);
  const createReservation = useCreateReservation();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "19:00",
      partySize: 2,
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: new Date(data.date), // Convert string to Date object
      time: data.time,
      partySize: data.partySize, // Use correct field name
      message: data.message || undefined,
    };
    
    createReservation.mutate(payload, {
      onSuccess: () => {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  if (success) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-background px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center p-10 rounded-2xl bg-white shadow-xl border border-border"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-3xl font-bold mb-4">Reservation Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Thank you for booking with us. A confirmation email has been sent to your inbox. We look forward to serving you.
          </p>
          <button 
            onClick={() => {
              setSuccess(false);
              form.reset();
            }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Make Another Reservation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="h-[40vh] relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           {/* Chef cooking */}
           <img 
            src="/reservationimg1.png" 
            alt="Chef cooking"
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto h-full flex items-end pb-12 px-6 relative z-10">
          <div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">Reservations</h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Secure your spot at our table. For parties larger than 10, please contact us directly.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reservation Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-border"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Full Name</label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Email Address</label>
                  <input
                    {...form.register("email")}
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">Phone Number</label>
                  <input
                    {...form.register("phone")}
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                  {form.formState.errors.phone && (
                    <p className="text-destructive text-sm">{form.formState.errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Party Size
                  </label>
                  <select
                    {...form.register("partySize")}
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num: number) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> Date
                  </label>
                  <input
                    type="date"
                    {...form.register("date")}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  />
                  {form.formState.errors.date && (
                    <p className="text-destructive text-sm">{form.formState.errors.date.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Time
                  </label>
                  <select
                    {...form.register("time")}
                    className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  >
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="20:30">8:30 PM</option>
                    <option value="21:00">9:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Special Requests (Optional)</label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  placeholder="Allergies, special occasions, seating preferences..."
                />
              </div>

              <button
                type="submit"
                disabled={createReservation.isPending}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {createReservation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Confirming...
                  </span>
                ) : (
                  "Confirm Reservation"
                )}
              </button>
            </form>
          </motion.div>

          {/* Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg">
              <h3 className="font-serif text-2xl font-bold mb-6">Dining Info</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-accent font-semibold mb-2">Dress Code</h4>
                  <p className="text-white/70 text-sm">Smart casual. We request no beachwear or athletic attire.</p>
                </div>
                <div>
                  <h4 className="text-accent font-semibold mb-2">Cancellation Policy</h4>
                  <p className="text-white/70 text-sm">We respectfully request at least 24 hours notice for cancellations.</p>
                </div>
                <div>
                  <h4 className="text-accent font-semibold mb-2">Parking</h4>
                  <p className="text-white/70 text-sm">Valet parking is available at the entrance on 5th Street.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
              <h3 className="font-serif text-xl font-bold mb-4 text-primary">Large Events</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Planning a private event or corporate dinner? We have a private dining room that seats up to 40 guests.
              </p>
              <Link href="/">
              <button className="w-full py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
                View Event Info
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}