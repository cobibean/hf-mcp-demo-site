import { useEffect, useRef, useState } from "react";
import { mapleMainAssets } from "./generated/maple-main-assets";
import useHeroSequence from "./motion/useHeroSequence";
import useSectionReveals from "./motion/useSectionReveals";

const menuReasons = [
  {
    key: "breakfast",
    label: "Breakfast",
    title: "From the griddle",
    description: "Pancakes, eggs, bacon, and toast when the morning needs a table.",
    price: "$11.50",
    image: mapleMainAssets.food.breakfastPancakes,
    alt: "Pancakes with syrup on a diner plate at Maple and Main Cafe.",
  },
  {
    key: "lunch",
    label: "Lunch",
    title: "Soup and sandwich",
    description: "Turkey on toast with tomato soup, pickle spear, and no fuss.",
    price: "$13.75",
    image: mapleMainAssets.food.lunchSoupSandwich,
    alt: "Turkey sandwich and tomato soup on a porcelain cafe tabletop.",
  },
  {
    key: "coffee",
    label: "Coffee",
    title: "House coffee",
    description: "Always hot, always fresh, ready at the counter.",
    price: "$2.75",
    image: mapleMainAssets.food.coffeePour,
    alt: "Hot coffee pouring into a white mug in morning window light.",
  },
];

const favorites = [
  {
    number: "01",
    title: "Buttermilk pancakes",
    description: "Golden edges, soft center. Real maple syrup, cultured butter.",
  },
  {
    number: "02",
    title: "Turkey & cheddar soup & sandwich",
    description: "Roasted turkey, sharp cheddar, tomato soup, grilled sourdough.",
  },
  {
    number: "03",
    title: "Pour-over coffee",
    description: "Seasonal roast, small batch, always freshly poured.",
  },
];

const audiencePaths = [
  {
    key: "locals",
    path: "Path 01",
    title: "Locals",
    text: "Your regular seat. Familiar faces, strong coffee, and the same booth you love.",
    cta: "Explore your routine",
    image: mapleMainAssets.people.localsCoffeeSeat,
    alt: "Coffee mug and folded paper at a red booth by the cafe window.",
  },
  {
    key: "families",
    path: "Path 02",
    title: "Families",
    text: "Room to settle in. Good food, easy mornings, and space for everyone.",
    cta: "Plan your family stop",
    image: mapleMainAssets.people.familyBooth,
    alt: "Family breakfast spread on a wooden booth table with pancakes and coffee.",
  },
  {
    key: "travelers",
    path: "Path 03",
    title: "Travelers",
    text: "A warm welcome. Local flavor, real conversations, and somewhere to land.",
    cta: "Discover your stop",
    image: mapleMainAssets.people.travelerTakeout,
    alt: "Takeout coffee and map on a sidewalk table outside the cafe.",
  },
];

const visitDetails = [
  {
    label: "Hours",
    icon: mapleMainAssets.icons.hours,
    lines: ["Mon - Fri", "6:30am - 3:00pm", "Sat - Sun", "7:00am - 3:00pm"],
  },
  {
    label: "Address",
    icon: mapleMainAssets.icons.coffee,
    lines: ["123 Maple Street", "Portland, ME 04101", "Neighborhood,", "not a chain."],
  },
  {
    label: "Parking",
    icon: mapleMainAssets.icons.parking,
    lines: ["Free street parking", "on Maple & Main.", "Lot behind cafe", "access off Main."],
  },
  {
    label: "Family Seating",
    icon: mapleMainAssets.icons.kids,
    lines: ["Booth seating,", "high chairs,", "kids welcome.", "All are welcome at our table."],
  },
  {
    label: "Phone",
    icon: mapleMainAssets.icons.takeout,
    lines: ["Call ahead", "for pick up", "or reservations."],
  },
];

function StickyNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero-section");

    if (!hero) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`sticky-nav${isVisible ? " is-visible" : ""}`}>
      <a className="sticky-brand" href="#top">
        Maple &amp; Main <small>Cafe</small>
      </a>
      <nav aria-label="Site navigation">
        <a href="#menu">Menu</a>
        <a href="#favorites">Favorites</a>
        <a href="#people">About</a>
        <a href="#specials">Specials</a>
        <a href="#visit">Visit</a>
      </nav>
      <a className="sticky-order" href="#visit">
        Book a Table
      </a>
    </div>
  );
}

function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useHeroSequence({
    canvasRef,
    heroRef,
    frameCount: mapleMainAssets.hero.frameCount,
    framePath: mapleMainAssets.hero.framePath,
  });

  return (
    <section className="hero-section" id="top" aria-label="Maple & Main Cafe" ref={heroRef}>
      <canvas
        className="hero-sequence-canvas"
        ref={canvasRef}
        aria-hidden="true"
      />
      <img
        className="hero-frame-poster"
        src={mapleMainAssets.hero.framePath(0)}
        alt="Morning window view into Maple and Main Cafe with coffee steam, green trim, and a red booth."
        decoding="async"
        fetchPriority="high"
      />

      <header className="site-nav" aria-label="Primary navigation">
        <nav className="nav-links" aria-label="Section links">
          <a href="#menu">Menu</a>
          <span aria-hidden="true"></span>
          <a href="#favorites">Favorites</a>
          <span aria-hidden="true"></span>
          <a href="#specials">Specials</a>
          <span aria-hidden="true"></span>
          <a href="#visit">Visit</a>
        </nav>

        <a className="wordmark" href="#top" aria-label="Maple and Main Cafe home">
          <small>Est. Main St</small>
        </a>

        <div className="nav-actions">
          <a href="#menu">Order Ahead</a>
          <a className="nav-outline" href="#visit">
            Book a Table
          </a>
        </div>
      </header>

      <h1 className="window-sign">
        <span>Maple &amp; Main</span>
        <small>Cafe</small>
        <b>Breakfast · Coffee · Community</b>
      </h1>

      <div className="hero-copy">
        <p className="hero-kicker">Morning starts on Main</p>
        <p className="hero-tagline">Good coffee. Real food. Your people.</p>
        <a className="receipt-cta" href="#menu">
          <span>See Menu</span>
          <i aria-hidden="true">-&gt;</i>
          <b aria-hidden="true">MM<br />001</b>
        </a>
      </div>
    </section>
  );
}

function DailyReasonsSection() {
  return (
    <section
      className="daily-reasons"
      id="menu"
      style={{
        backgroundImage: `linear-gradient(rgba(247, 242, 234, 0.9), rgba(247, 242, 234, 0.9)), url(${mapleMainAssets.textures.menuPaperOverlay})`,
      }}
    >
      <div className="menu-topline">
        <a href="#top" className="menu-lockup">
          <span>Maple &amp; Main</span>
          <i>Cafe</i>
        </a>
      </div>

      <a className="ticket-cta" href="#visit" aria-label="Order To Go">
        <span>Order<br />To Go</span>
        <i aria-hidden="true">-&gt;</i>
        <b aria-hidden="true">00380</b>
      </a>

      <div className="daily-copy">
        <p className="menu-eyebrow">Menu</p>
        <h2>All day, easy</h2>
        <p className="daily-note">
          Good food, strong coffee, neighborhood seat always saved for you.
        </p>
        <div className="daily-stamp" aria-hidden="true">
          <span>Maple &amp; Main</span>
          <small>Cafe</small>
        </div>
      </div>

      <p className="daily-hours">Open daily<br />7am - 3pm</p>

      <div className="meal-strip" aria-label="Daily reasons to stop in">
        {menuReasons.map((item) => (
          <article className={`meal-card meal-card-${item.key}`} key={item.key}>
            <span className="meal-tab">{item.label}</span>
            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
            <div className="meal-card-copy">
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <strong>{item.price}</strong>
            </div>
          </article>
        ))}
      </div>

      <div className="paper-sketch" aria-hidden="true">
        <span></span>
        <b></b>
      </div>
      <p className="batch-note">Made in small batches<br />right here, every day.</p>
    </section>
  );
}

function CounterFavoritesSection() {
  return (
    <section
      className="counter-favorites"
      id="favorites"
      style={{
        backgroundImage: `linear-gradient(rgba(247, 242, 234, 0.95), rgba(247, 242, 234, 0.95)), url(${mapleMainAssets.textures.porcelainTabletop})`,
      }}
    >
      <div className="counter-topline">
        <a className="counter-lockup" href="#top">
          <span>Maple &amp; Main</span>
          <small>Cafe</small>
        </a>
      </div>

      <div className="counter-copy">
        <h2>Counter favorites</h2>
        <ol className="favorites-list">
          {favorites.map((item) => (
            <li key={item.number}>
              <span>{item.number}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <a className="text-arrow-cta" href="#menu">
          View full menu <span aria-hidden="true">-&gt;</span>
        </a>
      </div>

      <div className="favorites-collage" aria-label="Counter favorites food collage">
        <div
          className="vinyl-field"
          style={{ backgroundImage: `url(${mapleMainAssets.textures.boothVinylRed})` }}
          aria-hidden="true"
        ></div>
        <figure className="favorite-frame favorite-frame-main">
          <img
            src={mapleMainAssets.food.breakfastPancakes}
            alt="Buttermilk pancakes with maple syrup and butter."
          loading="lazy" decoding="async" />
        </figure>
        <figure className="favorite-frame favorite-frame-lunch">
          <img
            src={mapleMainAssets.food.lunchSoupSandwich}
            alt="Turkey sandwich with tomato soup at the cafe counter."
          loading="lazy" decoding="async" />
        </figure>
        <figure className="favorite-frame favorite-frame-coffee">
          <img
            src={mapleMainAssets.food.coffeePour}
            alt="Fresh coffee being poured into a white mug."
          loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  );
}

function AudiencePathsSection() {
  return (
    <section
      className="audience-paths"
      id="people"
      style={{
        backgroundImage: `linear-gradient(rgba(247, 242, 234, 0.94), rgba(247, 242, 234, 0.94)), url(${mapleMainAssets.textures.menuPaperOverlay})`,
      }}
    >
      <div className="audience-lead">
        <p>Maple &amp; Main Cafe <span aria-hidden="true">+</span> Audience Paths</p>
        <h2>Three ways to make M&amp;M your morning.</h2>
        <small>Same booth. Different reasons. Find the path that fits your morning ritual.</small>
      </div>

      <div className="floor-plan" aria-hidden="true"></div>

      <div className="path-panel-row" aria-label="Ways to visit Maple and Main">
        {audiencePaths.map((item) => (
          <article className={`path-panel path-panel-${item.key}`} key={item.key}>
            <div
              className="path-booth"
              style={{ backgroundImage: `url(${mapleMainAssets.textures.boothVinylRed})` }}
              aria-hidden="true"
            ></div>
            <div className="path-content">
              <span>{item.path}</span>
              <h3>{item.title}</h3>
              <i aria-hidden="true"></i>
              <p>{item.text}</p>
              <a href="#visit">
                {item.cta} <b aria-hidden="true">-&gt;</b>
              </a>
            </div>
            <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
          </article>
        ))}
      </div>
    </section>
  );
}

function WeeklySpecialsSection() {
  return (
    <section
      className="weekly-specials"
      id="specials"
      style={{ backgroundImage: `url(${mapleMainAssets.textures.paintedGreenTrim})` }}
    >
      <header className="specials-nav" aria-label="Specials masthead">
        <a href="#top" className="specials-lockup">
          <span>Maple &amp; Main</span>
          <small>Cafe</small>
        </a>
        <a className="specials-order" href="#visit">Order Ahead</a>
      </header>

      <div className="specials-copy">
        <p>From our kitchen</p>
        <h2>This week's board</h2>
        <a className="chalk-cta" href="#visit">View specials <span aria-hidden="true">-&gt;</span></a>
      </div>

      <figure className="chalkboard-frame">
        <img
          src={mapleMainAssets.specials.chalkboardPlate}
          alt="Framed chalkboard with hand-drawn cafe specials."
        loading="lazy" decoding="async" />
        <figcaption>
          <ul>
            <li><span>Mon</span> Tomato soup and grilled cheddar</li>
            <li><span>Wed</span> Maple pancake stack</li>
            <li><span>Fri</span> Chicken pot pie plate</li>
          </ul>
        </figcaption>
      </figure>

      <img
        className="handbill-cluster"
        src={mapleMainAssets.specials.handbillCluster}
        alt="Pinned paper coffee and breakfast sketches on a green wall."
      loading="lazy" decoding="async" />

      <div
        className="specials-booth-rail"
        style={{ backgroundImage: `url(${mapleMainAssets.textures.boothVinylRed})` }}
        aria-hidden="true"
      ></div>
    </section>
  );
}

function VisitDetailsSection() {
  return (
    <section className="visit-details" id="visit">
      <header className="visit-nav" aria-label="Visit masthead">
        <a href="#top" className="visit-lockup">
          <span>Maple<br />&amp; Main</span>
          <small>Cafe</small>
        </a>
        <a className="directions-cta" href="https://maps.apple.com/?q=123%20Maple%20Street%20Portland%20ME">
          Get Directions
        </a>
      </header>

      <div className="visit-info-row">
        <div className="visit-title">
          <p>Practicals</p>
          <h2>Visit us</h2>
          <strong>Good coffee. Solid food. Easy to find.</strong>
        </div>

        <div className="visit-columns" aria-label="Visit details">
          {visitDetails.map((item) => (
            <article className="visit-card" key={item.label}>
              <img src={item.icon} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              <h3>{item.label}</h3>
              {item.lines.map((line, index) => (
                <p className={index > 1 ? "visit-accent" : undefined} key={`${item.label}-${line}`}>
                  {line}
                </p>
              ))}
            </article>
          ))}
        </div>
      </div>

      <div className="visit-media-strip">
        <img
          src={mapleMainAssets.visit.tabletopStrip}
          alt="Cafe table with mug, syrup, silverware, and red booth seating."
        loading="lazy" decoding="async" />
        <figure>
          <img src={mapleMainAssets.visit.mapBlock} alt="Simple map showing Maple and Main Cafe location." loading="lazy" decoding="async" />
          <figcaption>Maple<br />&amp; Main <small>Cafe</small></figcaption>
        </figure>
      </div>

      <a className="call-ahead-band" href="tel:+12075550148">
        <span>Call Ahead</span>
        <i aria-hidden="true">-&gt;</i>
        <b>207-555-0148</b>
        <em>Skip the wait.<br />We'll have it ready.</em>
      </a>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-topnav">
        <a href="#top" className="footer-name">Maple &amp; Main Cafe</a>
        <nav aria-label="Footer navigation">
          <a href="#menu">Menu</a>
          <a href="#favorites">Favorites</a>
          <a href="#people">About</a>
          <a href="#specials">Specials</a>
          <a href="#visit">Visit</a>
          <a className="footer-order" href="#visit">Order Ahead</a>
        </nav>
      </div>

      <div className="footer-image-strip" aria-label="Cafe closing gallery">
        <figure>
          <img src={mapleMainAssets.hero.still} alt="Maple and Main Cafe front window." loading="lazy" decoding="async" />
          <figcaption>Maple<br />&amp;<br />Main<br /><small>Cafe</small></figcaption>
        </figure>
        <img src={mapleMainAssets.people.localsCoffeeSeat} alt="Coffee and paper at a red booth." loading="lazy" decoding="async" />
        <img src={mapleMainAssets.footer.windowDecal} alt="Cafe window with maple seed decal, coffee, and a croissant on the sill." loading="lazy" decoding="async" />
        <figure>
          <img src={mapleMainAssets.brand.logoMarkSource} alt="Maple and Main window coffee mark." loading="lazy" decoding="async" />
          <figcaption className="sign-caption">Coffee<br />People<br />Community</figcaption>
        </figure>
        <img src={mapleMainAssets.footer.lastCup} alt="Last cup of coffee steaming on a cafe table." loading="lazy" decoding="async" />
      </div>

      <section
        className="save-seat"
        style={{ backgroundImage: `url(${mapleMainAssets.brand.windowpaneMaplePattern})` }}
      >
        <h2>Save a seat</h2>
        <div>
          <p>Good coffee. Kind people. Local roots.</p>
          <span>Whether it's your morning ritual or a midday reset, we'll save you a spot.</span>
          <a href="#visit">Plan your visit <b aria-hidden="true">-&gt;</b></a>
        </div>
        <img src={mapleMainAssets.brand.logoMarkSource} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </section>

      <div className="footer-rail">
        <address>
          <strong>Maple &amp; Main Cafe</strong>
          <span>123 Maple Street</span>
          <span>Portland, ME 04101</span>
          <a href="#visit">Get directions</a>
        </address>
        <div>
          <strong>Hours</strong>
          <span>Mon-Fri&nbsp;&nbsp;&nbsp;6:30am - 3:00pm</span>
          <span>Sat-Sun&nbsp;&nbsp;&nbsp;7:00am - 3:00pm</span>
          <a href="#visit">Holiday hours</a>
        </div>
        <img className="footer-monogram" src={mapleMainAssets.brand.monogramBadgeSource} alt="Maple and Main monogram." loading="lazy" decoding="async" />
        <div className="footer-staples">
          <strong>Daily favorites</strong>
          <span><img src={mapleMainAssets.icons.breakfast} alt="" aria-hidden="true" loading="lazy" decoding="async" /> Breakfast</span>
          <span><img src={mapleMainAssets.icons.lunch} alt="" aria-hidden="true" loading="lazy" decoding="async" /> Lunch</span>
          <span><img src={mapleMainAssets.icons.pie} alt="" aria-hidden="true" loading="lazy" decoding="async" /> Pie by the slice</span>
        </div>
        <div>
          <strong>Follow along</strong>
          <a href="https://www.instagram.com/mapleandmaincafe">Instagram</a>
          <a href="https://www.facebook.com/mapleandmaincafe">Facebook</a>
          <a href="mailto:hello@mapleandmaincafe.example">Email sign up</a>
        </div>
        <div>
          <span>© Maple &amp; Main Cafe</span>
          <span>All rights reserved</span>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useSectionReveals();

  return (
    <main>
      <StickyNav />
      <HeroSection />
      <DailyReasonsSection />
      <CounterFavoritesSection />
      <AudiencePathsSection />
      <WeeklySpecialsSection />
      <VisitDetailsSection />
      <SiteFooter />
    </main>
  );
}
