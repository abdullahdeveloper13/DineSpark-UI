'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-restaurant";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FormValues = z.infer<typeof insertMessageSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const sendMessage = useSendMessage();

  const form = useForm<FormValues>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    sendMessage.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "We've received your message and will get back to you shortly.",
        });
        form.reset();
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

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-primary mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Have a question or feedback? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="grid gap-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">Visit Us</h3>
                  <p className="text-muted-foreground">123 Culinary Avenue</p>
                  <p className="text-muted-foreground">Metropolis, NY 10012</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-sm text-muted-foreground mt-1">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-muted-foreground">reservations@lumiere.com</p>
                  <p className="text-muted-foreground">events@lumiere.com</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">Opening Hours</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-muted-foreground">
                    <span>Mon - Thu</span>
                    <span>17:00 - 22:00</span>
                    <span>Fri - Sat</span>
                    <span>17:00 - 23:00</span>
                    <span>Sun</span>
                    <span>16:00 - 21:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-muted rounded-2xl overflow-hidden relative group">
              {/* Map image */}
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1774&auto=format&fit=crop" 
                alt="Map location"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-all">
                <div className="bg-white px-4 py-2 rounded-full shadow-lg text-xs font-bold tracking-wide">
                  VIEW ON MAP
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-border"
          >
            <h2 className="font-serif text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="Your Name"
                />
                {form.formState.errors.name && (
                  <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  {...form.register("email")}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="your@email.com"
                />
                {form.formState.errors.email && (
                  <p className="text-destructive text-sm">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <input
                  {...form.register("subject")}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="What is this regarding?"
                />
                {form.formState.errors.subject && (
                  <p className="text-destructive text-sm">{form.formState.errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
                {form.formState.errors.message && (
                  <p className="text-destructive text-sm">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={sendMessage.isPending}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                {sendMessage.isPending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}