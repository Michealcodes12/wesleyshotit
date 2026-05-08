"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function NewsletterOptIn() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("subscribers")
        .insert([{ email, source: "homepage_guide" }]);

      if (error) throw error;

      toast.success("Welcome! You're now part of our monthly circle.");
      setEmail("");
    } catch (error) {
      if ((error as { code: string }).code === "23505") {
        toast.error("You are already subscribed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background py-24 px-4 border-t border-border/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-sm tracking-[0.4em] text-primary mb-12 uppercase font-medium">
            Monthly Inner Circle
          </h3>
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6 text-foreground">
            STAY IN THE LOOP
          </h2>
          <p className="text-muted-foreground mb-10 text-lg">
            Receive monthly brand updates, heartfelt new month greetings, and
            exclusive behind-the-scenes looks at our latest visual narratives.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary/50 border-border text-foreground h-12 rounded-none focus-visible:ring-primary"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-8 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium tracking-wide"
            >
              {loading ? "Sending..." : "SUBSCRIBE!"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
