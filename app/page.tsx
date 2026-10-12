"use client";

import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  categories,
  currencies,
  displayAmount,
  displayPrice,
  listings,
  type CurrencyCode,
  type Listing,
} from "@/lib/catalogue";
import { configuredContactChannels } from "@/lib/contact-channels";
import { buildOrderSummary } from "@/lib/order-brief";

const contactActions = [
  {
    label: "Continue on Discord",
    url: configuredContactChannels.discord,
  },
  {
    label: "Continue on Telegram",
    url: configuredContactChannels.telegram,
  },
].filter((action): action is { label: string; url: string } => Boolean(action.url));

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All services");
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [selected, setSelected] = useState<Listing | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function openBrief(listing: Listing) {
    setSelected(listing);
    setSelectedPackageId(
      listing.packages.find((option) => option.isActive)?.id ?? "",
    );
    setOrderNotes("");
  }

  function copyOrderBrief() {
    if (!selected) return;
    const summary = buildOrderSummary({
      listing: selected,
      currency,
      selectedPackageId,
      notes: orderNotes,
    });
    void navigator.clipboard?.writeText(summary);
  }

  const filteredListings = useMemo(
    () =>
      listings.filter((listing) => {
        const matchesCategory =
          activeCategory === "All services" ||
          listing.category === activeCategory;
        const matchesSearch =
          listing.name.toLowerCase().includes(search.toLowerCase()) ||
          listing.description.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [activeCategory, search],
  );

  return (
    <main className="site-shell">
      <header className="topbar">
        <a href="#top" className="wordmark" aria-label="Legend Lane home">
          <span className="wordmark-mark">LL</span>
          <span>
            Legend
            <br />
            Lane
          </span>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          <a href="#catalogue" onClick={() => setMenuOpen(false)}>
            Catalogue
          </a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How it works
          </a>
          <a href="#footer" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
        <div className="topbar-actions">
          <label className="currency-select">
            <span className="sr-only">Display currency</span>
            <select
              value={currency}
              onChange={(event) =>
                setCurrency(event.target.value as CurrencyCode)
              }
            >
              {Object.keys(currencies).map((code) => (
                <option key={code}>{code}</option>
              ))}
            </select>
            <ChevronDown size={14} aria-hidden="true" />
          </label>
          <button
            className="bag-button"
            aria-label="View order brief"
            onClick={() => openBrief(selected ?? listings[0])}
          >
            <ShoppingBag size={17} />
            <span>Brief</span>
          </button>
          <button
            className="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">
            <span className="pulse-dot" /> Independent service catalogue / Los
            Santos
          </p>
          <h1>
            MAKE YOUR
            <br />
            <em>MOVE.</em>
          </h1>
          <p className="hero-lede">
            Curated GTA Online services, laid out clearly. Choose your brief,
            see the USD reference, then take the conversation off-site.
          </p>
          <a className="button button-light" href="#catalogue">
            Explore catalogue <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="hero-stamp" aria-hidden="true">
          <span>EST.</span>
          <strong>24</strong>
          <span>
            LEGEND LANE
            <br />
            L.S. / ONLINE
          </span>
        </div>
        <div className="hero-scroll">
          SCROLL TO DISCOVER <span>↓</span>
        </div>
      </section>

      <section className="ticker" aria-label="Store information">
        <div>NO CHECKOUT</div>
        <span>✦</span>
        <div>USD REFERENCE PRICES</div>
        <span>✦</span>
        <div>EXTERNAL CONTACT HANDOFF</div>
        <span>✦</span>
        <div>NO CHECKOUT</div>
      </section>

      <section className="catalogue-section" id="catalogue">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / The catalogue</p>
            <h2>
              FIND YOUR
              <br />
              <span>LANE.</span>
            </h2>
          </div>
          <p className="section-note">
            Every listing below is a configurable template. Published inventory,
            terms and availability are managed by the administrator.
          </p>
        </div>
        <div className="catalogue-toolbar">
          <div
            className="category-tabs"
            role="tablist"
            aria-label="Service categories"
          >
            {categories.map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={16} />
            <span className="sr-only">Search listings</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search catalogue"
            />
          </label>
        </div>
        <div className="listing-grid">
          {filteredListings.map((listing, index) => (
            <article className="listing-card" key={listing.id}>
              <button
                className="listing-image"
                onClick={() => openBrief(listing)}
                style={{ backgroundImage: `url(${listing.image})` }}
                aria-label={`View ${listing.name}`}
              >
                <span className={`image-tag ${listing.tone}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="view-tag">
                  View brief <ArrowUpRight size={14} />
                </span>
              </button>
              <div className="listing-info">
                <div>
                  <p className="eyebrow">{listing.eyebrow}</p>
                  <h3>{listing.name}</h3>
                </div>
                <p className="listing-price">
                  {listing.pricing === "starting" && <small>from </small>}
                  {displayPrice(listing, currency)}
                  <small>
                    {listing.pricing === "quote" ? "" : " indicative"}
                  </small>
                </p>
              </div>
              <p className="listing-description">{listing.description}</p>
              <button className="text-link" onClick={() => openBrief(listing)}>
                Build an order brief <ArrowUpRight size={15} />
              </button>
            </article>
          ))}
        </div>
        {filteredListings.length === 0 && (
          <div className="empty-state">
            No listings match that search. Try another lane.
          </div>
        )}
      </section>

      <section className="manifesto" id="how-it-works">
        <div className="manifesto-number">02</div>
        <p className="eyebrow">The Legend Lane standard</p>
        <h2>
          NO NOISE.
          <br />
          <span>JUST THE PLAY.</span>
        </h2>
        <div className="manifesto-copy">
          <p>
            See what is available. Understand the price. Send a clear brief to
            the seller. The website is the map; the actual conversation happens
            on Discord or Telegram.
          </p>
          <a className="button button-dark" href="#catalogue">
            Browse the lanes <ArrowUpRight size={17} />
          </a>
        </div>
      </section>

      <footer id="footer">
        <div className="footer-brand">
          LEGEND
          <br />
          <span>LANE</span>
        </div>
        <div className="footer-links">
          <div>
            <p className="eyebrow">Navigate</p>
            <a href="#catalogue">Catalogue</a>
            <a href="#how-it-works">How it works</a>
            <a href="/faq">Policies & FAQ</a>
          </div>
          <div>
            <p className="eyebrow">Order desk</p>
            {contactActions.length > 0 ? (
              contactActions.map((action) => (
                <a key={action.label} href={action.url} target="_blank" rel="noreferrer">
                  {action.label.replace("Continue on ", "")}
                </a>
              ))
            ) : (
              <span>Contact channels / not configured</span>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Legend Lane</span>
          <span>Prices shown are indicative. USD is the reference.</span>
          <span>All systems nominal ◉</span>
        </div>
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <aside
            className="brief-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setSelected(null)}
              aria-label="Close order brief"
            >
              <X size={19} />
            </button>
            <p className="eyebrow">Order brief / {selected.id}</p>
            <h2>{selected.name}</h2>
            <p className="brief-copy">
              Review the intended service, then continue the conversation with
              the seller. This does not place an order or process payment.
            </p>
            {selected.packages.length > 0 && (
              <fieldset className="package-options">
                <legend>Choose a package</legend>
                {selected.packages
                  .filter((option) => option.isActive)
                  .map((option) => (
                    <label
                      className={`package-option ${selectedPackageId === option.id ? "selected" : ""}`}
                      key={option.id}
                    >
                      <input
                        type="radio"
                        name="package"
                        value={option.id}
                        checked={selectedPackageId === option.id}
                        onChange={() => setSelectedPackageId(option.id)}
                      />
                      <span>
                        <strong>{option.name}</strong>
                        <small>{option.description}</small>
                      </span>
                      <b>{displayAmount(option.priceUsd, currency)}</b>
                    </label>
                  ))}
              </fieldset>
            )}
            <div className="brief-row">
              <span>
                {selected.pricing === "range"
                  ? "Indicative range"
                  : "Reference price"}
              </span>
              <strong>
                {selected.packages.find(
                  (option) => option.id === selectedPackageId,
                )?.priceUsd !== undefined
                  ? displayAmount(
                      selected.packages.find(
                        (option) => option.id === selectedPackageId,
                      )!.priceUsd,
                      currency,
                    )
                  : displayPrice(selected, currency)}{" "}
                <small>
                  {selected.pricing === "quote" ? "to confirm" : "indicative"}
                </small>
              </strong>
            </div>
            <div className="brief-row">
              <span>Availability</span>
              <strong className="status">{selected.availability}</strong>
            </div>
            <label className="brief-input">
              <span>Order notes</span>
              <textarea
                value={orderNotes}
                onChange={(event) => setOrderNotes(event.target.value)}
                placeholder="Platform, account details or questions..."
              />
            </label>
            <button
              className="button button-light full-width"
              onClick={copyOrderBrief}
            >
              Copy brief <ArrowUpRight size={17} />
            </button>
            {contactActions.length > 0 && (
              <div className="contact-actions">
                {contactActions.map((action) => (
                  <a
                    className="button button-dark full-width"
                    key={action.label}
                    href={action.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {action.label} <ArrowUpRight size={17} />
                  </a>
                ))}
              </div>
            )}
            <p className="panel-footnote">
              {contactActions.length > 0
                ? "The conversation continues outside this website."
                : "Copy the brief to keep a handoff ready. Contact destinations will appear here once configured by the administrator."}
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
