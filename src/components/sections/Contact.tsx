import { BUSINESS, WHATSAPP_MESSAGE } from "@/lib/constants";

export function Contact() {
  return (
    <section
      id="iletisim"
      className="bg-base-light py-(--spacing-section-mobile) md:py-(--spacing-section)"
    >
      <div className="mx-auto max-w-(--container-content) px-4 md:px-6">
        <h2 className="font-display text-2xl font-bold text-cream mb-8">
          Iletisim
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Google Maps */}
          <div className="overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d37.9835!3d40.1588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCami+Orta+Mahallesi%2C+Sivas+Cd.+No%3A55%2FC%2C+58600+S%C3%BC%C5%9Fehri%2FSivas!5e0!3m2!1str!2str"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Salon Dejavu Konum"
            />
          </div>

          {/* Business Info */}
          <div className="flex flex-col gap-6">
            {/* Address */}
            <div className="flex items-start gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-1 shrink-0 text-neon-red"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <p className="text-cream text-base">{BUSINESS.address}</p>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 text-neon-red"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="text-cream text-base underline hover:text-neon-red transition-colors"
              >
                {BUSINESS.phoneFormatted}
              </a>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mt-1 shrink-0 text-neon-red"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <p className="text-sm font-bold text-cream mb-1">
                  Calisma Saatleri
                </p>
                <p className="text-cream/70 text-sm">
                  Pazartesi - Cumartesi: {BUSINESS.hours.weekdays}
                </p>
                <p className="text-cream/70 text-sm">
                  Pazar: {BUSINESS.hours.sunday}
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={`${BUSINESS.whatsappUrl}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream hover:text-[#25D366] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.11.546 4.095 1.503 5.82L0 24l6.335-1.463A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.94 0-3.75-.56-5.28-1.527l-.378-.226-3.762.87.908-3.676-.248-.394A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              <span className="text-sm font-bold">WhatsApp ile yazin</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-cream/10 pt-4">
          <p className="text-sm text-cream/50 text-center">
            {BUSINESS.copyright}
          </p>
        </div>
      </div>
    </section>
  );
}
