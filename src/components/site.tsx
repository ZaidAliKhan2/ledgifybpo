"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowDown,
  Check,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xppzvygw";

const navigationItems = [
  {
    label: "Services",
    href: "/#services",
    activePath: "/services",
    includeDescendants: true,
  },
  {
    label: "Industries",
    href: "/industries",
    activePath: "/industries",
    includeDescendants: false,
  },
  {
    label: "Why LedgifyBPO",
    href: "/why-ledgify-bpo",
    activePath: "/why-ledgify-bpo",
    includeDescendants: false,
  },
  {
    label: "About Us",
    href: "/about",
    activePath: "/about",
    includeDescendants: false,
  },
  {
    label: "Careers",
    href: "/careers",
    activePath: "/careers",
    includeDescendants: false,
  },
] as const;

function matchesPathname(
  pathname: string,
  activePath: string,
  includeDescendants = false,
) {
  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  return (
    normalizedPathname === activePath ||
    (includeDescendants && normalizedPathname.startsWith(`${activePath}/`))
  );
}

const ConsultationContext = createContext<(service?: string) => void>(() => {});
type ConsultationPayload = {
  name: string;
  email: string;
  company: string;
  phone: string;
  services: string;
  message: string;
  _gotcha: string;
};
type FormspreeResponse = {
  error?: string;
  errors?: { message?: string }[];
};
export function Logo({ decorative = false }: { decorative?: boolean }) {
  return (
    <Image
      src="/images/logo.png"
      unoptimized
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
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submittedServiceSummary, setSubmittedServiceSummary] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [hoveredServiceSlug, setHoveredServiceSlug] = useState<
    (typeof services)[number]["slug"] | null
  >(null);
  const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const submissionInFlight = useRef(false);
  const currentServiceSlug = services.find((service) =>
    matchesPathname(pathname, `/services/${service.slug}`),
  )?.slug;
  const previewedServiceSlug =
    hoveredServiceSlug ?? currentServiceSlug ?? services[0].slug;

  function open(service?: string) {
    returnFocus.current = document.activeElement as HTMLElement;
    setSelectedServices(
      service && services.some((s) => s.name === service)
        ? [service]
        : [],
    );
    setServiceError("");
    setSubmittedServiceSummary("");
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
    if (submissionInFlight.current || status === "sending") return;
    if (selectedServices.length === 0) {
      setServiceError("Choose at least one service.");
      return;
    }
    submissionInFlight.current = true;
    setStatus("sending");
    setServiceError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const read = (key: string) => String(formData.get(key) ?? "");
    const serviceSummary = selectedServices.join(", ");
    const data: ConsultationPayload = {
      name: read("name").trim(),
      email: read("email").trim(),
      company: read("company").trim(),
      phone: read("phone").trim(),
      services: serviceSummary,
      message: read("message").trim(),
      _gotcha: read("_gotcha"),
    };
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = (await response
        .json()
        .catch(() => null)) as FormspreeResponse | null;

      if (!response.ok) {
        const responseError = result?.errors
          ?.map(({ message }) => message)
          .filter(Boolean)
          .join(" ");
        const fallback =
          response.status === 429
            ? "Too many requests were sent. Please wait a moment and try again."
            : "Your request could not be sent. Please try again.";

        throw new Error(responseError || result?.error || fallback);
      }

      setSubmittedServiceSummary(serviceSummary);
      form.reset();
      setSelectedServices([]);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Your request could not be sent. Please try again.",
      );
    } finally {
      submissionInFlight.current = false;
    }
  }

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
            {navigationItems.map((item) => {
              const isCurrent = matchesPathname(
                pathname,
                item.activePath,
                item.includeDescendants,
              );

              return item.label === "Services" ? (
                <div
                  key={item.label}
                  className="services-nav-item"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => {
                    setServicesDropdownOpen(false);
                    setHoveredServiceSlug(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className="services-trigger"
                    aria-current={isCurrent ? "page" : undefined}
                    data-current={isCurrent ? "page" : undefined}
                  >
                    Services <ArrowDown className="services-trigger-arrow" />
                  </Link>

                  {servicesDropdownOpen && (
                    <div className="services-dropdown">
                      <div className="services-dropdown-list">
                        {services.map((service) => {
                          const isCurrentService = matchesPathname(
                            pathname,
                            `/services/${service.slug}`,
                          );

                          return (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onMouseEnter={() =>
                                setHoveredServiceSlug(service.slug)
                              }
                              data-active={previewedServiceSlug === service.slug}
                              aria-current={
                                isCurrentService ? "page" : undefined
                              }
                              data-current={
                                isCurrentService ? "page" : undefined
                              }
                            >
                              {service.name}
                            </Link>
                          );
                        })}
                      </div>

                      <div className="services-dropdown-preview">
                        {(() => {
                          const active = services.find(
                            (s) => s.slug === previewedServiceSlug,
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
              ) : item.label === "Industries" ? (
                <div
                  key={item.label}
                  className="industries-nav-item"
                  onMouseEnter={() => setIndustriesDropdownOpen(true)}
                  onMouseLeave={() => setIndustriesDropdownOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="industries-trigger"
                    aria-current={isCurrent ? "page" : undefined}
                    data-current={isCurrent ? "page" : undefined}
                  >
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
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  data-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
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
            {navigationItems.map((item) => {
              const isCurrent = matchesPathname(
                pathname,
                item.activePath,
                item.includeDescendants,
              );

              if (item.label === "Services") {
                return (
                  <div key={item.label} className="mobile-accordion">
                    <button
                      type="button"
                      className="mobile-accordion-trigger"
                      onClick={() =>
                        setMobileServicesOpen(!mobileServicesOpen)
                      }
                      aria-expanded={mobileServicesOpen}
                      aria-current={isCurrent ? "page" : undefined}
                      data-current={isCurrent ? "page" : undefined}
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
                        {services.map((service) => {
                          const isCurrentService = matchesPathname(
                            pathname,
                            `/services/${service.slug}`,
                          );

                          return (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setMobileOpen(false)}
                              aria-current={
                                isCurrentService ? "page" : undefined
                              }
                              data-current={
                                isCurrentService ? "page" : undefined
                              }
                            >
                              {service.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              if (item.label === "Industries") {
                return (
                  <div key={item.label} className="mobile-accordion">
                    <button
                      type="button"
                      className="mobile-accordion-trigger"
                      onClick={() =>
                        setMobileIndustriesOpen(!mobileIndustriesOpen)
                      }
                      aria-expanded={mobileIndustriesOpen}
                      aria-current={isCurrent ? "page" : undefined}
                      data-current={isCurrent ? "page" : undefined}
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
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isCurrent ? "page" : undefined}
                  data-current={isCurrent ? "page" : undefined}
                >
                  {item.label}
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
            </div>

            {/* Block 2: Navigation */}
            <div>
              <p className="footer-heading">Explore</p>
              <Link href="/about">About us</Link>
              <Link href="/why-ledgify-bpo">Why LedgifyBPO</Link>
              <Link href="/#services">Services</Link>
              <Link href="/industries">Industries</Link>
              <Link href="/careers">Careers</Link>
            </div>

            <div>
              <p className="footer-heading">Services</p>
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  {service.name}
                </Link>
              ))}
            </div>

            <div>
              <p className="footer-heading">Contact</p>

              <button className="footer-link" onClick={() => open()}>
                Let&apos;s Talk
                <ArrowRight size={14} aria-hidden="true" />
              </button>

              <span className="contact-placeholder">
                <Mail size={14} strokeWidth={1.8} aria-hidden="true" />
                info@ledgifybpo.com
              </span>
              <span className="contact-placeholder">
                <Phone size={14} strokeWidth={1.8} aria-hidden="true" />
                +92 332-7923093
              </span>
              <span className="contact-placeholder">
                <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
                US · Canada · Pakistan
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
              Your consultation request for {submittedServiceSummary} has been
              sent. Thank you for getting in touch.
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
                  Email
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="you@gmail.com"
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
              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  required
                  maxLength={30}
                  placeholder="+1 555 123 4567"
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
                  <input name="_gotcha" tabIndex={-1} autoComplete="off" />
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
