import { useState, useEffect, useRef } from "react";

// ── Figma Asset URLs ──────────────────────────────────────────────────────────
const ASSETS = {
  heroSmile:      "https://www.figma.com/api/mcp/asset/7b76e0b1-1eab-45f5-8db6-bf89a271bcd5",
  heroBg:         "https://www.figma.com/api/mcp/asset/e0b63572-d7e2-442b-9990-4d65243258ed",
  heroBlob:       "https://www.figma.com/api/mcp/asset/1aaedc4b-8960-491a-9607-cb669ca68962",
  heroDecor:      "https://www.figma.com/api/mcp/asset/98484ac8-91b1-4186-876d-86aff618f39f",
  servicesImg:    "https://www.figma.com/api/mcp/asset/fc7e175c-a4dc-4dd4-a9eb-7817d439a75c",
  feat1:          "https://www.figma.com/api/mcp/asset/55307976-7fdb-4403-b225-8c4c7afb77d9",
  feat2:          "https://www.figma.com/api/mcp/asset/22ed4009-2655-43a3-81dc-bd82fabe6cf2",
  feat3:          "https://www.figma.com/api/mcp/asset/83ca5363-34cd-4072-9fe7-efbbda6c856e",
  feat4:          "https://www.figma.com/api/mcp/asset/f100ba1b-5328-4420-936f-03f6e4431c07",
  feat5:          "https://www.figma.com/api/mcp/asset/31403b9f-f1f5-4290-8f54-a6268547f025",
  feat6:          "https://www.figma.com/api/mcp/asset/0471f473-dcd8-44bf-8261-7c7af81f80bb",
  whoImg:         "https://www.figma.com/api/mcp/asset/46fcdeac-f456-49f8-845f-70dfeed4f844",
  doctor1:        "https://www.figma.com/api/mcp/asset/b3eb1260-1c96-4722-a0e8-6f85391c68cf",
  doctor2:        "https://www.figma.com/api/mcp/asset/adcba850-28fa-4eb6-8d9c-60a8fa580047",
  doctor3:        "https://www.figma.com/api/mcp/asset/913e850d-8776-4cf7-b655-5edb8b2a0af2",
  doctor4:        "https://www.figma.com/api/mcp/asset/de7953e9-15de-4154-9af0-48df0788aacd",
};

// ── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  primary:   "#516EFF",
  secondary: "#FFD700",
  black:     "#18181B",
  gray:      "#52525B",
  grayLight: "#777777",
  grayTone:  "#BCBCBC",
  bg:        "#F8FAFC",
  white:     "#FFFFFF",
};

// ── Reusable Primitives ───────────────────────────────────────────────────────
const ShieldIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Badge = ({ num, label, style }) => (
  <div style={{
    position: "absolute", background: C.secondary, color: C.white,
    borderRadius: 16, padding: "10px 20px", display: "flex", alignItems: "center",
    gap: 8, boxShadow: "0 8px 24px rgba(81,110,255,.2)", ...style
  }}>
    <span style={{ fontSize: 24, fontWeight: 600 }}>{num}</span>
    <span style={{ fontSize: 12, lineHeight: 1.4, whiteSpace: "pre" }}>{label}</span>
  </div>
);

const BtnPrimary = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{
    background: C.primary, color: C.white, border: "none", borderRadius: 8,
    padding: "14px 40px", fontSize: 18, fontWeight: 600, cursor: "pointer",
    transition: "opacity .2s, transform .2s", ...style
  }}
    onMouseEnter={e => { e.target.style.opacity = ".85"; e.target.style.transform = "translateY(-2px)"; }}
    onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = "translateY(0)"; }}
  >{children}</button>
);

const BtnOutline = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    background: "transparent", color: C.gray, border: `1px solid ${C.gray}`, borderRadius: 8,
    padding: "14px 40px", fontSize: 18, fontWeight: 600, cursor: "pointer", transition: "all .2s"
  }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray; e.currentTarget.style.color = C.gray; }}
  >{children}</button>
);

// ── Section Header pattern from Figma ────────────────────────────────────────
const SectionHeader = ({ bigLabel, bigAccent, smallLabel, smallBold, reverse }) => (
  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 72 }}>
    {!reverse ? (
      <>
        <div>
          <div style={{ fontSize: 56, fontWeight: 700, color: C.black, lineHeight: "74px" }}>
            {bigLabel} <span style={{ color: C.secondary }}>{bigAccent}</span>
          </div>
          <div style={{ height: 1, background: C.grayTone, marginTop: 8, width: 760 }} />
        </div>
        <div style={{ fontSize: 48, fontWeight: 600, color: "rgba(24,24,27,.15)", lineHeight: "64px", textAlign: "right" }}>
          {smallLabel}<br /><span style={{ fontSize: 60, fontWeight: 700 }}>{smallBold}</span>
        </div>
      </>
    ) : (
      <>
        <div style={{ fontSize: 48, fontWeight: 600, color: "rgba(24,24,27,.15)", lineHeight: "64px" }}>
          {smallLabel}<br /><span style={{ fontSize: 60, fontWeight: 700 }}>{smallBold}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: C.black, lineHeight: "74px" }}>
            {bigLabel} <span style={{ color: C.secondary }}>{bigAccent}</span>
          </div>
          <div style={{ height: 1, background: C.grayTone, marginTop: 8 }} />
        </div>
      </>
    )}
  </div>
);

// ── Sections ──────────────────────────────────────────────────────────────────

function Navbar({ active, setActive }) {
  const links = ["Home", "Services", "About", "Appointment"];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,.97)", backdropFilter: "blur(8px)",
      borderBottom: `1px solid ${C.grayTone}`,
      padding: "0 108px", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 80,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 48, height: 48, background: C.primary, borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24
        }}>🦷</div>
        <span style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 32, fontWeight: 500, color: C.black }}>Dentics</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 64 }}>
        <div style={{ display: "flex", gap: 40 }}>
          {links.map(l => (
            <span key={l} onClick={() => setActive(l)} style={{
              fontSize: active === l ? 18 : 16, fontWeight: active === l ? 600 : 400,
              color: active === l ? C.primary : C.gray, cursor: "pointer", transition: "all .2s"
            }}>{l}</span>
          ))}
        </div>
        <BtnPrimary>Get Started</BtnPrimary>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ display: "flex", alignItems: "center", gap: 48, padding: "80px 108px 104px", background: C.white, minHeight: 665 }}>
      {/* Left content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 56, maxWidth: 650 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1 style={{ fontSize: 56, fontWeight: 700, lineHeight: "74px", color: C.black, margin: 0 }}>
            We Provide High Quality{" "}
            <span style={{ color: C.secondary }}>Dental</span>{" "}
            Services
          </h1>
          <p style={{ fontSize: 20, color: C.grayLight, lineHeight: "34px", maxWidth: 512, margin: 0 }}>
            Appropriately embrace transparent materials via turnkey niche markets.
          </p>
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          <BtnPrimary>Get Started</BtnPrimary>
          <BtnOutline>Learn More</BtnOutline>
        </div>
      </div>

      {/* Right illustration */}
      <div style={{ position: "relative", width: 600, height: 520, flexShrink: 0 }}>
        <img src={ASSETS.heroSmile} alt="Smiling patient"
          style={{ position: "absolute", top: 0, right: 0, width: 424, height: 488, borderRadius: 24, objectFit: "cover", boxShadow: `0 20px 60px rgba(81,110,255,.15)` }} />
        <Badge num="300k+" label={"Tooth\nGot Fixed"} style={{ top: 60, right: 8 }} />
        <Badge num="200K+" label={"Happy\nCustomer"} style={{ top: 250, left: 0, background: C.grayLight }} />
        <Badge num="30+" label={"Expert\nDentist"}   style={{ bottom: 60, left: 20 }} />
      </div>
    </section>
  );
}

function HowTo() {
  const steps = [
    { icon: "📞", label: "Call for\nappointment" },
    { icon: "📅", label: "Get a\nDate & Serial" },
    { icon: "🩺", label: "Consult\nYour dentist" },
  ];
  return (
    <div style={{ background: C.primary, padding: "64px 108px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 172 }}>
        <div>
          <h2 style={{ fontSize: 42, fontWeight: 600, color: C.white, lineHeight: "46px", maxWidth: 500, marginBottom: 16 }}>
            How to get our service?
          </h2>
          <p style={{ fontSize: 22, color: "rgba(255,255,255,.85)", fontWeight: 500 }}>Just follow these simple steps</p>
        </div>
        <div style={{ display: "flex", gap: 48 }}>
          {steps.map(s => (
            <div key={s.label} style={{
              background: C.white, borderRadius: 16, padding: "24px 32px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 16, minWidth: 160
            }}>
              <span style={{ fontSize: 32 }}>{s.icon}</span>
              <p style={{ fontSize: 18, fontWeight: 600, color: C.gray, textAlign: "center", lineHeight: "24px", whiteSpace: "pre" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KeyServices() {
  const leftServices  = ["Check ups", "Cosmetic dentistry", "Orthodontics", "Preventative checks"];
  const rightServices = ["Emergencies", "Dental implants", "Children's dentistry", "Telephone consultations"];
  return (
    <div style={{ display: "flex" }}>
      {/* Left panel */}
      <div style={{
        background: C.bg, padding: "104px 0 104px 108px", borderBottomRightRadius: 136,
        flexShrink: 0, display: "flex", flexDirection: "column", gap: 48, width: 666
      }}>
        <div style={{
          borderBottom: `2px solid ${C.primary}`, paddingBottom: 40, paddingRight: 32
        }}>
          <h2 style={{ fontSize: 48, fontWeight: 600, lineHeight: "64px", color: C.black, margin: 0 }}>
            Always <span style={{ color: C.secondary, fontSize: 60, fontWeight: 800 }}>Laugh</span> Whenever Its Possible
          </h2>
        </div>
        <img src={ASSETS.servicesImg} alt="Dental services" style={{ width: 496, height: 328, borderRadius: 20, objectFit: "cover" }} />
      </div>

      {/* Right panel */}
      <div style={{ padding: "104px 108px 104px 0", flex: 1, display: "flex", flexDirection: "column", gap: 48 }}>
        <div style={{ borderBottom: `1px solid rgba(82,82,91,.25)`, padding: "32px 0 56px 72px" }}>
          <p style={{ fontSize: 20, color: C.grayLight, lineHeight: "34px", maxWidth: 666, margin: 0 }}>
            We also offer treatments that improve the appearance of your smile giving you the confidence boost you deserve. The process of our treatment below.
          </p>
        </div>
        <div style={{ paddingLeft: 72 }}>
          <p style={{ fontSize: 24, fontWeight: 500, marginBottom: 32 }}>WHAT WE PROVIDE</p>
          <div style={{ display: "flex", gap: 80 }}>
            {[leftServices, rightServices].map((col, ci) => (
              <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {col.map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, fontWeight: 500 }}>
                    <ShieldIcon />{s}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { img: ASSETS.feat1, title: "Laser Technology",    desc: "World's most advanced Diode Laser. Relaxing & smooth treatment experience." },
  { img: ASSETS.feat2, title: "Expert Specialists",  desc: "Highly qualified specialists providing personalised dental care for every patient." },
  { img: ASSETS.feat3, title: "Sterilized Equipment",desc: "Highest hygiene standards with fully sterilized tools and workspaces." },
  { img: ASSETS.feat4, title: "Painless Procedures", desc: "Modern anesthesia and comfort-first techniques ensure zero stress." },
  { img: ASSETS.feat5, title: "Digital X-Rays",      desc: "Instant digital imaging for accurate diagnosis with minimal radiation." },
  { img: ASSETS.feat6, title: "Cosmetic Excellence", desc: "Smile makeovers, veneers & whitening for the perfect confident smile." },
];

function Features() {
  return (
    <section style={{ padding: "128px 108px", background: C.white }}>
      <SectionHeader bigLabel="KEY" bigAccent="FEATURE" smallLabel="What Makes Us More" smallBold="Special" reverse />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 72 }}>
        {FEATURES.map(f => (
          <div key={f.title} style={{
            background: C.bg, border: "1px solid rgba(82,82,91,.1)", borderRadius: 16,
            padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center",
            gap: 24, textAlign: "center", transition: "transform .2s, box-shadow .2s", cursor: "default"
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(81,110,255,.12)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)";    e.currentTarget.style.boxShadow = "none"; }}
          >
            <img src={f.img} alt={f.title} style={{ width: 112, height: 112 }} />
            <h3 style={{ fontSize: 24, fontWeight: 500, color: C.black, margin: 0 }}>{f.title}</h3>
            <p style={{ fontSize: 16, color: C.grayLight, lineHeight: "26px", margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <div style={{
      background: C.primary, textAlign: "center",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 32,
      padding: "88px 168px"
    }}>
      <h2 style={{ fontSize: 42, fontWeight: 400, color: C.white, maxWidth: 600, margin: 0 }}>
        Let Us Brighten <span style={{ fontWeight: 700, fontSize: 48 }}>Your Smile!</span>
      </h2>
      <p style={{ fontSize: 18, color: "rgba(255,255,255,.85)", maxWidth: 904, lineHeight: "30px", margin: 0 }}>
        Helping patients achieve good dental health & beautiful smile is a privilege & responsibility.
        For over 30 years, we proudly provided the best dental experience in New York.
        Our comfort-first approach is designed to meet the needs of you & your entire family.
      </p>
      <button style={{
        border: "2px solid white", color: C.white, background: "transparent",
        borderRadius: 16, padding: "20px 48px", fontSize: 20, cursor: "pointer", transition: "all .2s"
      }}
        onMouseEnter={e => { e.currentTarget.style.background = C.white; e.currentTarget.style.color = C.primary; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.white; }}
      >Make An Appointment</button>
    </div>
  );
}

function WhoWeAre() {
  return (
    <section id="about" style={{ padding: "128px 108px", background: C.white }}>
      <SectionHeader bigLabel="WHO" bigAccent="WE ARE" smallLabel="Our Glorious" smallBold="History" />
      <div style={{ display: "flex", gap: 96, alignItems: "flex-start" }}>
        {/* Image stack */}
        <div style={{ position: "relative", width: 534, height: 348, flexShrink: 0 }}>
          <div style={{ position: "absolute", left: 0, top: 40, width: 122, height: 308, background: C.primary, borderRadius: 12 }} />
          <img src={ASSETS.whoImg} alt="Patient smiling"
            style={{ position: "absolute", left: 40, top: 0, width: 462, height: 308, borderRadius: 16, objectFit: "cover", boxShadow: "0 8px 24px rgba(34,48,114,.07)" }} />
        </div>
        {/* Text card */}
        <div style={{
          background: C.bg, border: "1px solid rgba(82,82,91,.1)", borderRadius: 16, padding: 48, flex: 1
        }}>
          <h3 style={{ fontSize: 24, fontWeight: 500, marginBottom: 20, color: C.black }}>Our history</h3>
          <p style={{ fontSize: 16, color: C.grayLight, lineHeight: "34px", letterSpacing: ".64px", margin: 0 }}>
            Dentics is a well-known name in dental and oral care in New York. The journey of this institution started
            in 1990 under the hands of Dr. Jonathon Doe, Gold Medalist of Harvard University. Dentics dental center
            has been leading the way in dental treatment in USA for more than 30 years in keeping with the evolution
            of time and the modernization of the era.
          </p>
        </div>
      </div>
    </section>
  );
}

const DOCTORS = [
  { img: ASSETS.doctor1, name: "Dr. Jeanette Hoff",    spec: "Orthodontic Treatment", school: "Yale Medical School" },
  { img: ASSETS.doctor2, name: "Dr. David Ambrose",    spec: "Orthodontic Treatment", school: "Harvard Medical School" },
  { img: ASSETS.doctor3, name: "Dr. Jenelia Breton",   spec: "Orthodontic Treatment", school: "Oxford Medical School" },
  { img: ASSETS.doctor4, name: "Dr. Jagajeet Aurora",  spec: "Orthodontic Treatment", school: "Harvard Medical School" },
];

function Team() {
  return (
    <section style={{ padding: "128px 108px 144px", background: C.bg }}>
      <SectionHeader bigLabel="MEET OUR" bigAccent="DOCTORS" smallLabel="Meet Some of Our" smallBold="Brains" reverse />
      <div style={{ display: "flex", gap: 40, overflowX: "auto", paddingBottom: 8 }}>
        {DOCTORS.map(d => (
          <div key={d.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, flexShrink: 0, width: 248 }}>
            <img src={d.img} alt={d.name} style={{
              width: 216, height: 216, borderRadius: "50%", objectFit: "cover",
              border: `3px solid ${C.white}`, boxShadow: "0 4px 20px rgba(0,0,0,.1)"
            }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center" }}>
              <p style={{ fontSize: 20, color: C.black, lineHeight: "34px", margin: 0, fontWeight: 500 }}>{d.name}</p>
              <p style={{ fontSize: 16, color: C.grayLight, lineHeight: "24px", margin: 0 }}>{d.spec}</p>
              <p style={{ fontSize: 16, color: C.grayLight, lineHeight: "24px", margin: 0 }}>{d.school}</p>
            </div>
            <button style={{
              border: `1.5px solid ${C.primary}`, color: C.primary, background: "transparent",
              borderRadius: 8, padding: "12px 40px", fontSize: 16, cursor: "pointer", transition: "all .2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = C.white; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.primary; }}
            >Appointment</button>
          </div>
        ))}
      </div>
    </section>
  );
}

const REVIEWS = [
  { img: ASSETS.doctor1, name: "Sarah Johnson",  text: "Dentics completely transformed my dental experience. The team is incredibly professional and the results are amazing. Best dental care in New York!" },
  { img: ASSETS.doctor2, name: "Michael Chen",   text: "State-of-the-art equipment and caring staff. My procedure was painless and the entire team made me feel at ease throughout. Highly recommend!" },
  { img: ASSETS.doctor3, name: "Emma Williams",  text: "After years of anxiety about dentists, Dentics changed everything. The comfort-first approach is real — I actually look forward to my check-ups now." },
];

function ClientReview() {
  const [active, setActive] = useState(0);
  const r = REVIEWS[active];
  return (
    <section style={{ background: C.white, padding: "96px 208px" }}>
      <div style={{ display: "flex", gap: 72, alignItems: "center" }}>
        {/* Image side */}
        <div style={{ position: "relative", width: 318, flexShrink: 0, height: 470 }}>
          <div style={{ position: "absolute", left: 43, top: 0, width: 232, height: 470, background: C.primary, borderRadius: 16, opacity: .12 }} />
          <img src={r.img} alt={r.name} style={{
            position: "relative", display: "block", width: 238, height: 238, borderRadius: 16, objectFit: "cover",
            margin: "40px auto 0", boxShadow: "0 8px 24px rgba(34,48,114,.1)"
          }} />
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 20, fontWeight: 600, color: C.black }}>{r.name}</p>
          <p style={{ textAlign: "center", marginTop: 8, color: C.secondary, fontSize: 20, letterSpacing: 2 }}>★★★★★</p>
        </div>

        {/* Review text */}
        <div style={{ flex: 1 }}>
          <div style={{ borderTop: "2px solid rgba(82,82,91,.15)", paddingTop: 32, marginBottom: 32 }}>
            <h2 style={{ fontSize: 36, fontWeight: 600, lineHeight: "52px", color: C.black, maxWidth: 503, margin: 0 }}>
              What our client says about us
            </h2>
          </div>
          <div style={{ fontSize: 48, color: C.primary, lineHeight: 1, marginBottom: 16 }}>"</div>
          <p style={{ fontSize: 18, color: C.grayLight, lineHeight: "30px", fontStyle: "italic", margin: 0 }}>{r.text}</p>
          <div style={{ display: "flex", gap: 24, marginTop: 32 }}>
            {REVIEWS.map((_, i) => (
              <div key={i} onClick={() => setActive(i)} style={{
                width: 12, height: 12, borderRadius: "50%",
                background: i === active ? C.primary : C.grayTone, cursor: "pointer", transition: "background .2s"
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Appointment() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", doctor: "Dr. Jeanette Hoff", message: "", agreed: false });
  const [submitted, setSubmitted] = useState(false);
  const inp = (field) => ({
    value: form[field],
    onChange: e => setForm(f => ({ ...f, [field]: e.target.value })),
    style: {
      border: `1px solid ${C.grayTone}`, borderRadius: 8, padding: "14px 20px",
      fontSize: 16, fontFamily: "inherit", color: C.black, outline: "none",
      background: C.white, width: "100%", boxSizing: "border-box", transition: "border-color .2s"
    },
    onFocus: e => e.target.style.borderColor = C.primary,
    onBlur:  e => e.target.style.borderColor = C.grayTone,
  });

  return (
    <section id="appointment" style={{ padding: "128px 108px", background: C.bg }}>
      <SectionHeader bigLabel="MAKE AN" bigAccent="APPOINTMENT" smallLabel="Consult with our" smallBold="Doctor" />
      <div style={{ display: "flex", gap: 48 }}>
        {/* Image stack */}
        <div style={{ position: "relative", width: 496, height: 636, flexShrink: 0 }}>
          <div style={{ position: "absolute", left: 0, top: 48, width: 380, height: 588, background: C.primary, borderRadius: 24, opacity: .12 }} />
          <img src={ASSETS.whoImg} alt="Appointment"
            style={{ position: "absolute", left: 48, top: 0, width: 448, height: 588, borderRadius: 24, objectFit: "cover", boxShadow: "0 20px 48px rgba(34,48,114,.12)" }} />
        </div>

        {/* Form */}
        <div style={{ flex: 1, padding: "48px 0 48px 48px" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: 64 }}>✅</div>
              <h3 style={{ fontSize: 28, marginTop: 24, color: C.black }}>Appointment Booked!</h3>
              <p style={{ color: C.grayLight, marginTop: 12 }}>We'll contact you shortly to confirm your appointment.</p>
              <BtnPrimary style={{ marginTop: 32 }} onClick={() => setSubmitted(false)}>Book Another</BtnPrimary>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 600, color: C.gray, display: "block", marginBottom: 8 }}>First Name</label>
                  <input type="text" placeholder="Your first name" {...inp("name")} />
                </div>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 600, color: C.gray, display: "block", marginBottom: 8 }}>Phone Number</label>
                  <input type="tel" placeholder="+1 (000) 000-0000" {...inp("phone")} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 600, color: C.gray, display: "block", marginBottom: 8 }}>Preferred Date</label>
                  <input type="date" {...inp("date")} />
                </div>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 600, color: C.gray, display: "block", marginBottom: 8 }}>Select Doctor</label>
                  <select {...inp("doctor")} style={{ ...inp("doctor").style }}>
                    {DOCTORS.map(d => <option key={d.name}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 14, fontWeight: 600, color: C.gray, display: "block", marginBottom: 8 }}>Message</label>
                <textarea rows={5} placeholder="Describe your concern…" {...inp("message")} style={{ ...inp("message").style, resize: "vertical" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <input type="checkbox" checked={form.agreed} onChange={e => setForm(f => ({ ...f, agreed: e.target.checked }))}
                  style={{ width: 20, height: 20, accentColor: C.primary }} />
                <span style={{ fontSize: 14, color: C.gray }}>I agree to the Terms & Conditions and Privacy Policy</span>
              </div>
              <button
                onClick={() => form.agreed && setSubmitted(true)}
                style={{
                  width: "100%", background: form.agreed ? C.primary : C.grayTone,
                  color: C.white, border: "none", borderRadius: 8, padding: 18,
                  fontSize: 18, fontWeight: 600, cursor: form.agreed ? "pointer" : "not-allowed", transition: "opacity .2s"
                }}>
                Book Appointment
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div style={{ background: C.white, padding: "96px 108px" }}>
      <div style={{ background: C.bg, borderRadius: 24, padding: "82px 80px", display: "flex", alignItems: "center", gap: 64 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 32, fontWeight: 700, color: C.black, lineHeight: "44px", marginBottom: 32 }}>
            Subscribe to get our latest updates & dental tips
          </h3>
          {done ? (
            <p style={{ fontSize: 18, color: C.primary, fontWeight: 600 }}>✅ Thanks for subscribing!</p>
          ) : (
            <div style={{ display: "flex", gap: 16 }}>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="First name"
                style={{ flex: 1, border: `1px solid ${C.grayTone}`, borderRadius: 8, padding: "14px 20px", fontSize: 16, fontFamily: "inherit", outline: "none" }} />
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email"
                style={{ flex: 1, border: `1px solid ${C.grayTone}`, borderRadius: 8, padding: "14px 20px", fontSize: 16, fontFamily: "inherit", outline: "none" }} />
              <BtnPrimary onClick={() => email && setDone(true)}>Subscribe Now</BtnPrimary>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const links = [["Facebook", "Twitter", "Instagram"], ["Career", "Support", "Privacy Policy"]];
  return (
    <footer style={{ background: C.black, color: C.white, padding: "104px 108px 0" }}>
      <div style={{ display: "flex", gap: 48, paddingBottom: 80, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
        {/* Brand */}
        <div style={{ flex: 1.2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 40, height: 40, background: C.primary, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🦷</div>
            <span style={{ fontFamily: "'Ubuntu', sans-serif", fontSize: 28, fontWeight: 500 }}>Dentics</span>
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: "26px" }}>
            Dentics is a well-known name in dental and oral care in New York. The journey of this institution started in 1990.
          </p>
        </div>
        <div style={{ width: 1, background: "rgba(255,255,255,.1)", flexShrink: 0 }} />

        {/* Hours */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.4)", marginBottom: 24, textTransform: "uppercase", letterSpacing: 1 }}>We Are Welcoming You</p>
          <p style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>Want to visit our clinic?</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", lineHeight: "28px" }}>Saturday – Thursday</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)" }}>10 am – 9 pm</p>
        </div>
        <div style={{ width: 1, background: "rgba(255,255,255,.1)", flexShrink: 0 }} />

        {/* Links */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.4)", marginBottom: 24, textTransform: "uppercase", letterSpacing: 1 }}>Important Links</p>
          <div style={{ display: "flex", gap: 32 }}>
            {links.map((col, ci) => (
              <ul key={ci} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, padding: 0, margin: 0 }}>
                {col.map(l => <li key={l}><a href="#" style={{ textDecoration: "none", color: "rgba(255,255,255,.65)", fontSize: 15 }}>{l}</a></li>)}
              </ul>
            ))}
          </div>
        </div>
        <div style={{ width: 1, background: "rgba(255,255,255,.1)", flexShrink: 0 }} />

        {/* Contact */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.4)", marginBottom: 24, textTransform: "uppercase", letterSpacing: 1 }}>Say Hello To Us</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", marginBottom: 24 }}>hello@reallygreatsite.com</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", marginBottom: 8 }}>Address</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", lineHeight: "28px" }}>123 Anywhere St., Any City, NY 39200</p>
        </div>
      </div>
      <div style={{ padding: "24px 0", textAlign: "center", fontSize: 14, color: "rgba(255,255,255,.3)" }}>
        © 2000–2024, All rights reserved — Dentics Dental Clinic
      </div>
    </footer>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────────
export default function DenticsLanding() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Ubuntu:wght@500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: C.black, background: C.white, minWidth: 1200 }}>
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <HowTo />
      <KeyServices />
      <Features />
      <CTA />
      <WhoWeAre />
      <Team />
      <ClientReview />
      <Appointment />
      <Newsletter />
      <Footer />
    </div>
  );
}
