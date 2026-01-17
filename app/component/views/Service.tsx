import { Button, SectionHeading } from "@/app/utils/helper_function";
import { SERVICES } from "@/app/utils/Data";
import { Camera, Check, Clock } from "lucide-react";

export function ServicesView({
  navigateTo,
}: {
  navigateTo: (tab: any) => void;
}) {
  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Investment" subtitle="Packages & Pricing" />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              className={`relative bg-zinc-900 rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col ${
                idx === 1
                  ? "md:-mt-8 md:mb-8 border-white/20 shadow-2xl shadow-white/5"
                  : ""
              }`}
            >
              {idx === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black">N{service.price}</span>
                <span className="text-zinc-500">/ session</span>
              </div>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                {service.description}{service.outsideprice}
              </p>

              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-zinc-500" />
                  <span>{service.duration} Session</span>
                </li>
               
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-white" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={idx === 1 ? "primary" : "outline"}
                className="w-full"
                onClick={() => navigateTo("booking")}
              >
                Select Package
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-zinc-900 rounded-2xl p-12 text-center border border-white/5">
          <h3 className="text-2xl font-bold mb-4">Need something custom?</h3>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
            We understand that every project is unique. Contact us for a bespoke
            quote tailored to your specific requirements.
          </p>
          <Button variant="secondary" onClick={() => navigateTo("contact")}>
            Contact for Custom Quote
          </Button>
        </div>
      </div>
    </div>
  );
}
