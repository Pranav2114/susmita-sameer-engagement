import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Flower2,
  Heart,
  MapPin,
  Music2,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useRef, useState } from "react";

const MAPS_URL = "https://maps.app.goo.gl/1bAdVapiLEBMX594A?g_st=ic";
const EVENT_DATE = new Date("2026-11-15T13:00:00.000Z");
const eventDetails = [
  "Susmita (MD) & Sameer (MTech)",
  "Engagement Ceremony",
  "15 November 2026 | 6:30 PM onwards",
  "Bhosale Garden Executive",
  "Karnal Road, Sangli",
].join("\n");

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: "easeOut" as const } },
};

function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg className={`floral-corner ${className}`} viewBox="0 0 220 220" aria-hidden="true">
      <path d="M5 210C56 171 78 132 93 84 106 45 144 19 207 8M38 183c-3-31 6-52 28-68m-8 43c-28-4-43-16-52-38m94-65c24-1 44-12 57-34m-49 57c25 8 44 5 61-10m-77 38c27-3 44 4 57 20" />
      <path d="M64 133c-17-12-24-28-22-47 20 8 31 22 32 42m51-56c4-19 17-32 37-39 1 21-7 36-26 46m-2 42c17-9 34-8 52 3-13 15-29 20-48 12" />
      <circle cx="92" cy="82" r="13" /><circle cx="92" cy="82" r="5" />
    </svg>
  );
}

function OpeningAnimation({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);
  const [visible, setVisible] = useState(true);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="opening-screen" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.8 } }}>
          <FloralCorner className="opening-floral opening-floral-left" />
          <FloralCorner className="opening-floral opening-floral-right" />
          <motion.div className="opening-card" initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <p className="eyebrow">A little note from our hearts</p>
            <div className={`envelope ${opened ? "envelope-open" : ""}`}>
              <div className="envelope-letter">
                <span className="letter-kicker">Together Forever</span>
                <span className="letter-names">Susmita <i>&</i> Sameer</span>
              </div>
              <div className="envelope-back" />
              <div className="envelope-flap" />
              <div className="wax-seal"><Heart size={20} fill="currentColor" /></div>
            </div>
            <h1 className="opening-title">A celebration of love</h1>
            <p className="opening-copy">An invitation to witness the beginning of our forever.</p>
            <button className="button button-primary opening-button" onClick={() => {
              if (opened) return;
              setOpened(true);
              window.setTimeout(() => {
                onOpen();
                setVisible(false);
              }, 850);
            }}>
              Open Invitation <Heart size={15} />
            </button>
            <span className="opening-date">15 · 11 · 2026</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CountdownTimer() {
  const [remaining, setRemaining] = useState(() => Math.max(0, EVENT_DATE.getTime() - Date.now()));
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, EVENT_DATE.getTime() - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (remaining <= 0) {
    return <div className="celebration-message"><Sparkles size={24} /> The celebration has begun. Let love shine! <Sparkles size={24} /></div>;
  }

  const units = [
    { label: "Days", value: Math.floor(remaining / 86_400_000) },
    { label: "Hours", value: Math.floor((remaining / 3_600_000) % 24) },
    { label: "Minutes", value: Math.floor((remaining / 60_000) % 60) },
    { label: "Seconds", value: Math.floor((remaining / 1000) % 60) },
  ];
  return (
    <div className="countdown" role="timer" aria-label="Time remaining until the engagement">
      {units.map(({ label, value }) => (
        <div className="countdown-unit" key={label}>
          <span className="countdown-number">{String(value).padStart(2, "0")}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div className="section-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div className="heading-flourish"><span /><Heart size={14} fill="currentColor" /><span /></div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-frame">
        <FloralCorner className="hero-floral hero-floral-top" />
        <FloralCorner className="hero-floral hero-floral-bottom" />
        <div className="hero-sparkle sparkle-one">✦</div><div className="hero-sparkle sparkle-two">✧</div>
        <motion.div className="hero-content" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.18 } } }}>
          <motion.span className="eyebrow" variants={fadeUp}>Together Forever</motion.span>
          <motion.p className="hero-invitation" variants={fadeUp}>You are cordially invited to the</motion.p>
          <motion.h1 className="hero-names" variants={fadeUp}>Susmita <span>&</span> Sameer</motion.h1>
          <motion.p className="hero-qualifications" variants={fadeUp}>Susmita (MD) <span className="dot">·</span> Sameer (MTech)</motion.p>
          <motion.div className="hero-event" variants={fadeUp}>
            <span className="hero-event-script">Engagement</span>
            <span className="hero-event-label">Ceremony</span>
          </motion.div>
          <motion.p className="hero-quote" variants={fadeUp}>“Two hearts, one journey and a lifetime of togetherness...”</motion.p>
          <motion.div className="hero-date" variants={fadeUp}>
            <span>15 November 2026</span><i /> <span>6:30 PM onwards</span>
          </motion.div>
          <motion.a className="scroll-cue" href="#story" aria-label="Scroll to discover"><ArrowDown size={18} /></motion.a>
        </motion.div>
      </div>
      <div className="hero-side-note">A day to remember <span>✦</span> Sangli, Maharashtra</div>
    </section>
  );
}

function CoupleSection() {
  return (
    <section className="section couple-section" id="story">
      <SectionHeading eyebrow="Two hearts, one promise" title="The beginning of forever" subtitle="With full hearts, we invite you to celebrate the next chapter of our story." />
      <motion.div className="couple-card" initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="portrait-placeholder">
          <div className="portrait-orbit orbit-one" /><div className="portrait-orbit orbit-two" />
          <Flower2 size={42} strokeWidth={1} />
          <span>Your favourite moment<br />will live here</span>
          <small>Photo placeholder</small>
        </div>
        <div className="couple-names">
          <span className="couple-name">Susmita <small>(MD)</small></span>
          <span className="couple-heart"><Heart size={24} fill="currentColor" /></span>
          <span className="couple-name">Sameer <small>(MTech)</small></span>
        </div>
        <p className="couple-quote">“Two hearts, one journey<br />and a lifetime of togetherness...”</p>
      </motion.div>
    </section>
  );
}

function EventDetails() {
  const details = [
    { icon: CalendarDays, title: "The day", primary: "15 November 2026", secondary: "Sunday" },
    { icon: Clock3, title: "The time", primary: "6:30 PM onwards", secondary: "We can’t wait to see you" },
    { icon: MapPin, title: "The place", primary: "Bhosale Garden Executive", secondary: "Karnal Road, Sangli" },
  ];
  return (
    <section className="section details-section" id="details">
      <SectionHeading eyebrow="Save the date" title="A day made for memories" subtitle="A little evening of joy, laughter and the people we love most." />
      <div className="detail-grid">
        {details.map(({ icon: Icon, title, primary, secondary }, index) => (
          <motion.article className="detail-card" key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.12 }}>
            <div className="detail-icon"><Icon size={23} strokeWidth={1.4} /></div>
            <span className="eyebrow">{title}</span>
            <h3>{primary}</h3>
            <p>{secondary}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="section location-section" id="location">
      <SectionHeading eyebrow="Find your way to us" title="Meet us in Sangli" subtitle="We’ve saved you a seat. Find the venue and come celebrate with us." />
      <motion.div className="location-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <div className="location-copy">
          <span className="location-pin"><MapPin size={22} /></span>
          <span className="eyebrow">The celebration</span>
          <h3>Bhosale Garden<br />Executive</h3>
          <p>Karnal Road<br />Sangli</p>
          <a className="button button-primary" href={MAPS_URL} target="_blank" rel="noreferrer">Open Google Maps <ArrowRight size={16} /></a>
        </div>
        <div className="qr-card" aria-label="Scannable QR code for the Google Maps location">
          <div className="qr-code"><QRCodeSVG value={MAPS_URL} size={160} level="H" includeMargin bgColor="#fffafd" fgColor="#2d1535" /></div>
          <span className="qr-heart"><Heart size={13} fill="currentColor" /></span>
          <p>Scan for location</p>
        </div>
        <div className="location-botanical"><FloralCorner /></div>
      </motion.div>
    </section>
  );
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<{ context: AudioContext; oscillators: OscillatorNode[]; gain: GainNode; interval: number } | null>(null);
  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    window.clearInterval(audio.interval);
    audio.gain.gain.setTargetAtTime(0, audio.context.currentTime, 0.15);
    window.setTimeout(() => {
      audio.oscillators.forEach((oscillator) => oscillator.stop());
      void audio.context.close();
    }, 500);
    audioRef.current = null;
    setPlaying(false);
  }, []);
  const toggle = async () => {
    if (audioRef.current) {
      stop();
      return;
    }
    const AudioContextConstructor = window.AudioContext;
    if (!AudioContextConstructor) return;
    const context = new AudioContextConstructor();
    await context.resume();
    const gain = context.createGain();
    gain.gain.value = 0.018;
    gain.connect(context.destination);
    const oscillators = [261.63, 329.63, 392, 523.25].map((frequency, index) => {
      const oscillator = context.createOscillator();
      const voiceGain = context.createGain();
      oscillator.type = index === 3 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      voiceGain.gain.value = index === 3 ? 0.18 : 0.28;
      oscillator.connect(voiceGain).connect(gain);
      oscillator.start();
      return oscillator;
    });
    const interval = window.setInterval(() => {
      const notes = [261.63, 293.66, 329.63, 392, 440, 392, 329.63];
      oscillators[0].frequency.setTargetAtTime(notes[Math.floor(Math.random() * notes.length)], context.currentTime, 1.4);
    }, 3200);
    audioRef.current = { context, oscillators, gain, interval };
    setPlaying(true);
  };
  useEffect(() => () => {
    const audio = audioRef.current;
    if (!audio) return;
    window.clearInterval(audio.interval);
    audio.oscillators.forEach((oscillator) => oscillator.stop());
    void audio.context.close();
  }, []);
  return (
    <button className={`music-button ${playing ? "is-playing" : ""}`} onClick={() => void toggle()} aria-label={playing ? "Pause instrumental music" : "Play optional instrumental music"} title={playing ? "Pause music" : "Play gentle instrumental"}>
      {playing ? <Pause size={17} /> : <Play size={17} />}
      <Music2 size={16} />
      <span>{playing ? "Pause music" : "Our little melody"}</span>
      <span className="music-bars" aria-hidden="true"><i /><i /><i /></span>
    </button>
  );
}

function InvitationActions() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(eventDetails);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopyError(true);
    }
  };
  const saveCalendar = () => {
    const calendar = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Susmita and Sameer//Engagement//EN",
      "CALSCALE:GREGORIAN", "BEGIN:VEVENT", "UID:susmita-sameer-engagement-20261115",
      "DTSTAMP:20260101T000000Z", "DTSTART:20261115T130000Z",
      "SUMMARY:Susmita & Sameer — Engagement Ceremony",
      "LOCATION:Bhosale Garden Executive\\, Karnal Road\\, Sangli",
      "DESCRIPTION:15 November 2026 at 6:30 PM onwards. Bhosale Garden Executive\\, Karnal Road\\, Sangli",
      "URL:https://maps.app.goo.gl/1bAdVapiLEBMX594A?g_st=ic", "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const file = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "susmita-and-sameer-engagement.ics";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${eventDetails}\n\nFind the venue: ${MAPS_URL}`)}`;
  return (
    <div className="action-group">
      <button className="button button-primary" onClick={saveCalendar}><CalendarDays size={16} /> Add to calendar</button>
      <a className="button button-outline" href={shareUrl} target="_blank" rel="noreferrer">Share on WhatsApp <ArrowRight size={16} /></a>
      <button className="button button-outline" onClick={() => void copyDetails()}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Details copied" : "Copy event details"}</button>
      {copyError && <p className="copy-error" role="alert">Couldn’t copy automatically. Please select and copy the event details from the invitation.</p>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <FloralCorner className="footer-floral" />
      <span className="eyebrow">With love,</span>
      <p className="footer-names">Susmita <i>&</i> Sameer</p>
      <p className="footer-note">15 November 2026 <span>·</span> Sangli</p>
      <div className="footer-heart"><Heart size={16} fill="currentColor" /></div>
      <p className="footer-thanks">We can’t wait to celebrate with you.</p>
      <a href="#home" className="back-top" aria-label="Back to top"><ArrowUp size={17} /></a>
    </footer>
  );
}

export default function App() {
  const [invitationOpen, setInvitationOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  return (
    <>
      <OpeningAnimation onOpen={() => setInvitationOpen(true)} />
      <main className={invitationOpen ? "invitation invitation-visible" : "invitation"}>
        <HeroSection />
        <CoupleSection />
        <section className="countdown-section" aria-labelledby="countdown-heading">
          <div className="countdown-ornament"><span /><Heart size={13} fill="currentColor" /><span /></div>
          <span className="eyebrow">The day is getting closer</span>
          <h2 id="countdown-heading">Counting down to our forever</h2>
          <CountdownTimer />
        </section>
        <EventDetails />
        <LocationSection />
        <section className="closing-section">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="eyebrow">Save a little room in your heart</span>
            <h2>We’d love to celebrate<br />with you.</h2>
            <p>With joy in our hearts, we invite you to be part of this special day.</p>
            <InvitationActions />
          </motion.div>
        </section>
        <Footer />
      </main>
      <MusicPlayer />
    </>
  );
}
