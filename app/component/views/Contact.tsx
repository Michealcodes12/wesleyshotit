import { Button, SectionHeading } from "@/app/utils/helper_function";
import { Mail, MapPin } from "lucide-react";

export function ContactView() {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Get In Touch" subtitle="Let's Create Together" />

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Contact Info</h3>
            <p className="text-zinc-400">
              Have a question about packages, availability, or just want to say
              hi? Drop me a message.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-800 p-3 rounded-full">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="text-zinc-400">bookings@wesleyshot.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-zinc-800 p-3 rounded-full">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Studio</h4>
                  <p className="text-zinc-400">
                    14 Lekki Phase 1, Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
