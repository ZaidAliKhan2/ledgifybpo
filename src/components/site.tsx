"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Menu, X, Check } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import { services, industries } from "@/lib/content";

const ConsultationContext = createContext<(service?: string) => void>(() => {});
type ConsultationPayload = {
  name: string;
  email: string;
  company: string;
  services: string[];
  service: string;
  message: string;
  website: string;
};
export function Logo({ decorative = false }: { decorative?: boolean }) {
  return (
    <Image
      src="/images/logo.png"
      width={200}
      height={38}
      style={{ height: "auto" }}
      alt={decorative ? "" : "LedgifyBPO"}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
    />
  );
}
export function ConsultationButton({
  children = "Book a Consultation",
  service,
  className = "button",
}: {
  children?: ReactNode;
  service?: string;
  className?: string;
}) {
  const open = useContext(ConsultationContext);
  return (
    <button type="button" className={className} onClick={() => open(service)}>
      {children}
      <ArrowRight size={17} strokeWidth={1.8} />
    </button>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [serviceError, setServiceError] = useState("");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [hoveredServiceSlug, setHoveredServiceSlug] = useState(
    services[0].slug,
  );
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  function open(service?: string) {
    returnFocus.current = document.activeElement as HTMLElement;
    setSelectedServices(
      service && services.some((s) => s.name === service)
        ? [service]
        : [],
    );
    setServiceError("");
    setStatus("idle");
    setError("");
    setMobileOpen(false);
    setIsOpen(true);
    dialogRef.current?.showModal();
  }
  function close() {
    dialogRef.current?.close();
  }
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedServices.length === 0) {
      setServiceError("Choose at least one service.");
      return;
    }
    setStatus("sending");
    setServiceError("");
    const formData = new FormData(event.currentTarget);
    const read = (key: string) => String(formData.get(key) ?? "");
    const data: ConsultationPayload = {
      name: read("name"),
      email: read("email"),
      company: read("company"),
      services: selectedServices,
      service: selectedServices.join(", "),
      message: read("message"),
      website: read("website"),
    };
    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again.");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Your request could not be saved. Please try again.",
      );
    }
  }

  const links = [
    ["Services", "/#services"],
    ["Industries", "/#industries"],
    ["Why LedgifyBPO", "/#why-ledgify"],
    ["About Us", "/#about"],
  ];
  return (
    <ConsultationContext.Provider value={open}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <Link href="/" className="logo-link" aria-label="LedgifyBPO home">
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) =>
              label === "Services" ? (
                <div
                  key={label}
                  className="services-nav-item"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link href="/#services" className="services-trigger">
                    Services <ArrowDown className="services-trigger-arrow" />
                  </Link>

                  {servicesDropdownOpen && (
                    <div className="services-dropdown">
                      <div className="services-dropdown-list">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href="/#services"
                            onMouseEnter={() =>
                              setHoveredServiceSlug(service.slug)
                            }
                            data-active={hoveredServiceSlug === service.slug}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>

                      <div className="services-dropdown-preview">
                        {(() => {
                          const active = services.find(
                            (s) => s.slug === hoveredServiceSlug,
                          );
                          return (
                            <>
                              {active?.image ? (
                                <Image
                                  src={active.image}
                                  alt={active.name}
                                  width={320}
                                  height={180}
                                  className="service-preview-img"
                                />
                              ) : (
                                <div className="service-preview-img" />
                              )}
                              <p>{active?.description}</p>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              ) : label === "Industries" ? (
                <div
                  key={label}
                  className="industries-nav-item"
                  onMouseEnter={() => setIndustriesDropdownOpen(true)}
                  onMouseLeave={() => setIndustriesDropdownOpen(false)}
                >
                  <Link href="/#industries" className="industries-trigger">
                    Industries
                    <ArrowDown
                      className="industries-trigger-arrow"
                      aria-hidden="true"
                    />
                  </Link>

                  {industriesDropdownOpen && (
                    <div className="industries-dropdown">
                      {industries.map((industry) => (
                        <Link
                          key={industry.slug}
                          href={`/industries#${industry.slug}`}
                        >
                          {industry.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ),
            )}
          </nav>
          <div className="nav-actions">
            <ConsultationButton>Let&apos;s Talk</ConsultationButton>
            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {links.map(([label, href]) => {
              if (label === "Services") {
                return (
                  <div key={label} className="mobile-accordion">
                    <button
                      type="button"
                      className="mobile-accordion-trigger"
                      onClick={() =>
                        setMobileServicesOpen(!mobileServicesOpen)
                      }
                      aria-expanded={mobileServicesOpen}
                    >
                      Services
                      <ArrowDown
                        className={`mobile-accordion-arrow${
                          mobileServicesOpen
                            ? " mobile-accordion-arrow-open"
                            : ""
                        }`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mobile-accordion-panel">
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href="/#services"
                            onClick={() => setMobileOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              if (label === "Industries") {
                return (
                  <div key={label} className="mobile-accordion">
                    <button
                      type="button"
                      className="mobile-accordion-trigger"
                      onClick={() =>
                        setMobileIndustriesOpen(!mobileIndustriesOpen)
                      }
                      aria-expanded={mobileIndustriesOpen}
                    >
                      Industries
                      <ArrowDown
                        className={`mobile-accordion-arrow${
                          mobileIndustriesOpen
                            ? " mobile-accordion-arrow-open"
                            : ""
                        }`}
                      />
                    </button>
                    {mobileIndustriesOpen && (
                      <div className="mobile-accordion-panel">
                        {industries.map((industry) => (
                          <Link
                            key={industry.slug}
                            href={`/industries#${industry.slug}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {industry.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>
      {children}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            {/* Block 1: Brand */}
            <div className="footer-brand">
              <Link href="/" className="logo-link" aria-label="LedgifyBPO home">
                <Logo />
              </Link>

              <p>Built for businesses ready to grow with confidence.</p>

              <div className="mt-4 flex items-center gap-4">
                {/* TODO: Replace # with the confirmed LinkedIn URL */}
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-white/15 hover:text-white"
                  aria-label="LedgifyBPO on LinkedIn"
                >
                  <Linkedin size={20} aria-hidden="true" />
                </a>

                {/* TODO: Replace # with the confirmed Instagram URL */}
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-white/15 hover:text-white"
                  aria-label="LedgifyBPO on Instagram"
                >
                  <Instagram size={20} aria-hidden="true" />
                </a>

                {/* TODO: Replace # with the confirmed Facebook URL */}
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-gray-300 transition-colors hover:bg-white/15 hover:text-white"
                  aria-label="LedgifyBPO on Facebook"
                >
                  <Facebook size={20} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Block 2: Navigation */}
            <div>
              <p className="footer-heading">Explore</p>
              <Link href="/about">About us</Link>
              <Link href="/#services">Services</Link>
              <Link href="/industries">Industries</Link>
              <Link href="/careers">Careers</Link>
            </div>

            <div>
              <p className="footer-heading">Services</p>
              <Link href="/services/bookkeeping">Bookkeeping</Link>
              <Link href="/services/accounting">Accounting</Link>
              <Link href="/services/tax">Tax</Link>
              <Link href="/services/advisory">Advisory</Link>
              <Link href="/services/remote-hr-services">
                Remote HR Services
              </Link>
            </div>

            <div>
              <p className="footer-heading">Contact</p>

              <button className="footer-link" onClick={() => open()}>
                Let&apos;s Talk
                <ArrowRight size={14} aria-hidden="true" />
              </button>

              <span className="contact-placeholder">
                Email · info@ledgifybpo.com
              </span>
              <span className="contact-placeholder">
                Phone · +92 332-7923093
              </span>
              <span className="contact-placeholder">
                Address · House No 123
              </span>
            </div>
          </div>

          {/* Block 3: Bottom bar */}
          <div className="footer-bottom flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>
              © {new Date().getFullYear()} LedgifyBPO. All rights reserved.
            </span>

            <span aria-hidden="true">·</span>

            <a
              href="https://www.auroveon.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by <span className="text-[#39ff14]">Auroveon</span>
            </a>

            <div className="flex items-center ml-auto gap-3">
              <Link href="/privacy">Privacy Policy</Link>

              <Link href="/terms">Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
      <dialog
        ref={dialogRef}
        className="consultation-dialog"
        aria-labelledby="consultation-title"
        onClose={() => {
          setIsOpen(false);
          returnFocus.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              close();
          }
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close consultation form"
          onClick={close}
        >
          <X size={22} />
        </button>
        {status === "success" ? (
          <div className="success-content" role="status">
            <span className="icon-chip">
              <Check />
            </span>
            <h2 id="consultation-title">Request received.</h2>
            <p>
              Your consultation request for {selectedServices.join(", ")} has
              been saved. Thank you for getting in touch.
            </p>
            <button className="button" onClick={close}>
              Done <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">LET&apos;S TALK</p>
            <h2 id="consultation-title">Book a Consultation</h2>
            <p className="dialog-description">
              Tell us a little about your business.
            </p>
            <form onSubmit={submit}>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    placeholder="Full name"
                  />
                </label>
                <label>
                  Work email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label>
                Company
                <input
                  name="company"
                  autoComplete="organization"
                  required
                  maxLength={160}
                  placeholder="Company name"
                />
              </label>
              <fieldset
                className="service-selector"
                aria-describedby={serviceError ? "service-error" : "service-hint"}
              >
                <legend>Services you&apos;re interested in</legend>
                <p id="service-hint">Select all that apply.</p>
                <div className="service-options">
                  {services.map((service) => {
                    const selected = selectedServices.includes(service.name);
                    return (
                      <label
                        className={selected ? "service-option selected" : "service-option"}
                        key={service.slug}
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={service.name}
                          checked={selected}
                          onChange={(event) => {
                            setSelectedServices((current) =>
                              event.target.checked
                                ? [...current, service.name]
                                : current.filter((name) => name !== service.name),
                            );
                            setServiceError("");
                          }}
                        />
                        <span className="service-option-check" aria-hidden="true">
                          {selected && <Check size={14} />}
                        </span>
                        <span>{service.name}</span>
                      </label>
                    );
                  })}
                </div>
                {serviceError && (
                  <p className="service-selection-error" id="service-error" role="alert">
                    {serviceError}
                  </p>
                )}
              </fieldset>
              <label>
                How can we help? <span className="optional">(optional)</span>
                <textarea name="message" rows={3} maxLength={3000} />
              </label>
              <div className="honeypot" aria-hidden="true">
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              {status === "error" && (
                <p role="alert" className="form-error">
                  {error}
                </p>
              )}
              <button
                className="button form-submit"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Request a Consultation"}
                <ArrowRight size={17} />
              </button>
            </form>
          </>
        )}
      </dialog>
    </ConsultationContext.Provider>
  );
}
