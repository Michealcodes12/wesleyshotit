"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Mail, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="h-screen w-full flex items-center justify-center px-4 bg-background">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <CheckCircle2 size={40} strokeWidth={1} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-light tracking-widest uppercase mb-6"
        >
          Request Received
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground font-light mb-12 leading-relaxed"
        >
          Thank you for trusting us with your story. We&apos;ve received your
          request and will reach out via WhatsApp within 24 hours to discuss the
          details.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Link
            href="/highlight"
            className="flex items-center gap-4 bg-secondary/30 p-4 border border-border/10 text-left"
          >
            <ArrowRight size={18} className="text-primary shrink-0" />
            <p className="text-[10px] uppercase tracking-widest opacity-70">
              You can fill your eyes with more of our gallery
            </p>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-4 bg-secondary/30 p-4 border border-border/10 text-left"
          >
            <ArrowRight size={18} className="text-primary shrink-0" />
            <p className="text-[10px] uppercase tracking-widest opacity-70">
              Return To Home
            </p>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
