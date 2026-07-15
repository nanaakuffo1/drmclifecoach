import { useEffect } from 'react';
import { Heart, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Cal.com integration - loads the embed script once
function useCalEmbed() {
  useEffect(() => {
    // Only load once
    if ((window as any).Cal) return;

    const script = document.createElement('script');
    script.src = 'https://app.cal.com/embed/embed.js';
    script.async = true;
    script.onload = () => {
      const Cal = (window as any).Cal;
      if (!Cal) return;

      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;

      // Discovery Call namespace
      Cal("init", "discovery-call", { origin: "https://app.cal.com" });
      Cal.ns["discovery-call"]("floatingButton", {
        calLink: "dr.-margaret-cyprian-c5ownd/discovery-call",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        buttonText: "Book Your Free Discovery Call",
        buttonColor: "#B8860B"
      });
      Cal.ns["discovery-call"]("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#0E3B3F" }, dark: { "cal-brand": "#F3E6C9" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      // Package 1: Clarity
      Cal("init", "spirit-led-coaching-session", { origin: "https://app.cal.com" });
      Cal.ns["spirit-led-coaching-session"]("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#0E3B3F" }, dark: { "cal-brand": "#F3E6C9" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      // Package 2: Transform
      Cal("init", "transform", { origin: "https://app.cal.com" });
      Cal.ns.transform("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#0E3B3F" }, dark: { "cal-brand": "#F3E6C9" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      // Package 3: Thrive
      Cal("init", "thrive", { origin: "https://app.cal.com" });
      Cal.ns.thrive("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#0E3B3F" }, dark: { "cal-brand": "#F3E6C9" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    };
    document.head.appendChild(script);
  }, []);
}

// Opens Cal.com popup for a given namespace and calLink.
// Falls back to opening the Cal.com booking page directly in a new tab
// if the embed script hasn't finished loading yet (or fails to load at all),
// so the booking button always works.
function openCalPopup(namespace: string, calLink: string) {
  const Cal = (window as any).Cal;
  if (Cal && Cal.ns && Cal.ns[namespace]) {
    Cal.ns[namespace]("modal", {
      calLink,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" }
    });
    return;
  }

  // Fallback 1: Cal object exists but this namespace isn't ready yet — retry briefly.
  if (Cal) {
    let attempts = 0;
    const retry = setInterval(() => {
      attempts++;
      const CalNow = (window as any).Cal;
      if (CalNow && CalNow.ns && CalNow.ns[namespace]) {
        clearInterval(retry);
        CalNow.ns[namespace]("modal", {
          calLink,
          config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" }
        });
      } else if (attempts >= 10) {
        clearInterval(retry);
        window.open(`https://cal.com/${calLink}`, "_blank", "noopener,noreferrer");
      }
    }, 200);
    return;
  }

  // Fallback 2: Cal script hasn't loaded at all yet — open the booking page directly.
  window.open(`https://cal.com/${calLink}`, "_blank", "noopener,noreferrer");
}

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/1347093/2026-07-14/spfnvlicaiyq/hero-banner-peaceful-path.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-[#F3E6C9]/80" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-[#0E3B3F] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          Honoring Who You Are, Embracing Who You're Becoming
        </h1>
        <div className="space-y-5 text-base md:text-lg text-[#0E3B3F]/80 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <p>
            Life transitions can feel overwhelming, uncertain, and sometimes lonely. Yet they also hold the potential for profound growth and transformation.
          </p>
          <p>
            At DrMC Spirit-Led Life Coaching, you'll find a supportive space to gain clarity, rediscover your strengths, and move forward with confidence and purpose.
          </p>
          <p>
            Whether you're navigating an empty nest, a career change, relationship challenges, or a new season of life, you don't have to walk the journey alone.
          </p>
          <p>
            Together, we'll explore what's next and create a path that reflects your values, goals, and unique story.
          </p>
        </div>
        <p className="mt-10 text-xl md:text-2xl font-heading italic text-[#0E3B3F] font-bold animate-in fade-in duration-700 delay-500">
          "You Don't Have to Have It All Figured Out. You simply need a place to begin."
        </p>
        <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-700">
          <Button
            size="lg"
            onClick={() => openCalPopup("discovery-call", "dr.-margaret-cyprian-c5ownd/discovery-call")}
            className="bg-[#B8860B] hover:bg-[#9A7209] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            Book Your Free Discovery Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm md:text-base text-[#0E3B3F]/70">
            <Globe className="h-4 w-4 text-[#B8860B]" />
            Sessions held virtually — serving clients worldwide
          </p>
        </div>
      </div>
    </section>
  );
}

function ScriptureSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/1347093/2026-07-14/spfnwgicaizq/scripture-bg-watercolor-sage.png)' }}
      />
      <div className="absolute inset-0 bg-[#F3E6C9]/80" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <Sparkles className="h-8 w-8 text-[#B8860B] mx-auto mb-6" />
        <blockquote className="text-2xl md:text-3xl font-heading italic text-[#0E3B3F] leading-relaxed">
          "Be transformed by the renewing of your mind…"
        </blockquote>
        <p className="mt-4 text-lg font-semibold text-[#0E3B3F]">— Romans 12:2</p>
        <p className="mt-6 text-[#0E3B3F]/70 text-base md:text-lg max-w-2xl mx-auto">
          Since our coaching is faith-informed, this verse beautifully captures the heart of transformation.
        </p>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start gap-12">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl border-4 border-[#F3E6C9] flex-shrink-0 mx-auto md:mx-0">
            <img
              src="/assets/profile-picture.png"
              alt="Dr. Margaret Cyprian - Life Coach"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-[#0E3B3F] mb-6">About Your Coach</h2>
            <div className="text-[#0E3B3F]/70 text-lg leading-relaxed space-y-5">
              <p>
                Dr. Margaret Cyprian is the founder of DrMC Spirit-Led Life Coaching, where she walks alongside women navigating life's most significant transitions — motherhood, career change, identity shifts, empty nesting, and seasons of personal growth.
              </p>
              <p>
                Her own journey has been shaped by transition. Born and raised in Ghana, she pursued higher education in Europe, where she became a mother at 22 while completing her degree far from home. She went on to earn her Master's in Economics and build a successful banking career across Ghana and the United States, later relocating to the U.S. as a single mother of two to build a new life for her family. In God's timing, she experienced deep restoration — reuniting with her partner and entering a marriage now in its twelfth year, and today delighting in her role as grandmother.
              </p>
              <p>
                Each season taught her something about resilience, surrender, and faith as a foundation — leading her to pursue professional coaching and earn a Doctorate in Theology from Family Bible College in Houston, Texas. Her coaching is rooted in her Christian faith and Catholic values, and she warmly welcomes women of all backgrounds seeking clarity, peace, and purpose.
              </p>
              <p>
                Her guiding Scripture, and the heart of her coaching philosophy, is Proverbs 3:5–6:
              </p>
              <blockquote className="italic border-l-2 border-[#B8860B] pl-4">
                "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to Him, and He will make your paths straight."
              </blockquote>
              <p>
                Dr. Cyprian's mission is simple: to help every woman she works with leave feeling hopeful, empowered, and confident that her best days are still ahead.
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 text-base font-semibold text-[#0E3B3F]">
                <Globe className="h-5 w-5 text-[#B8860B]" />
                Coaching sessions are held virtually, so Dr. Cyprian works with women wherever they are in the world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PackageCardProps {
  title: string;
  description: string;
  scripture: string;
  scriptureRef: string;
  includes: string[];
  namespace: string;
  calLink: string;
}

function PackageCard({ title, description, scripture, scriptureRef, includes, namespace, calLink }: PackageCardProps) {
  return (
    <Card className="bg-white border border-[#F3E6C9] shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <h3 className="text-xl font-heading text-[#0E3B3F] mb-4">{title}</h3>
        <p className="text-[#0E3B3F]/70 leading-relaxed mb-5">{description}</p>
        <blockquote className="italic text-[#0E3B3F]/80 text-sm border-l-2 border-[#B8860B] pl-4 mb-5">
          <p>{scripture}</p>
          <cite className="not-italic font-semibold text-[#0E3B3F] text-xs mt-1 block">{scriptureRef}</cite>
        </blockquote>
        <div className="mb-6 flex-grow">
          <p className="font-semibold text-[#0E3B3F] mb-3">Includes:</p>
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[#0E3B3F]/70">
                <Heart className="h-4 w-4 text-[#B8860B] mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={() => openCalPopup(namespace, calLink)}
          className="w-full bg-[#B8860B] hover:bg-[#9A7209] text-white rounded-full cursor-pointer transition-all duration-300 mt-auto"
        >
          Book This Package
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function PackagesSection() {
  const packages: PackageCardProps[] = [
    {
      title: "Clarity: 6 Sessions",
      description: "This package is designed to help you move from uncertainty to clarity. We'll begin with an initial assessment to understand where you are, then work together to set meaningful goals and build personalized action steps you can put into practice right away.",
      scripture: "\"For I know the plans I have for you,\" declares the Lord, \"plans to prosper you and not to harm you, plans to give you hope and a future.\"",
      scriptureRef: "— Jeremiah 29:11",
      includes: ["Initial assessment", "Goal-setting session", "Focused work sessions", "Personalized action steps", "Graduation session"],
      namespace: "spirit-led-coaching-session",
      calLink: "dr.-margaret-cyprian-c5ownd/spirit-led-coaching-session",
    },
    {
      title: "Transform: 8 Sessions",
      description: "Transform is for those ready to go beyond a single goal and into real, lasting change. Over eight sessions, we'll dig into a comprehensive life assessment, build a personalized growth plan, and walk through it together with consistent accountability and support.",
      scripture: "\"Do not conform to the pattern of this world, but be transformed by the renewing of your mind.\"",
      scriptureRef: "— Romans 12:2",
      includes: ["Comprehensive life assessment", "Eight coaching sessions", "Accountability support", "Personalized growth plan"],
      namespace: "transform",
      calLink: "dr.-margaret-cyprian-c5ownd/transform",
    },
    {
      title: "Thrive: 12 Sessions",
      description: "Thrive is built for significant seasons of change — a career shift, an empty nest, a relationship transition, or any moment where the old path no longer fits. Across twelve sessions, we'll explore your vision and purpose, build a customized roadmap for your transition, and provide ongoing accountability every step of the way.",
      scripture: "\"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.\"",
      scriptureRef: "— Proverbs 3:5-6",
      includes: ["Twelve coaching sessions", "Vision and purpose exploration", "Accountability and support", "Customized transition roadmap"],
      namespace: "thrive",
      calLink: "dr.-margaret-cyprian-c5ownd/thrive",
    },
  ];

  return (
    <section className="py-20 bg-[#F3E6C9]/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[#0E3B3F] mb-4">Session Packages</h2>
          <p className="text-[#0E3B3F]/70 text-lg max-w-2xl mx-auto">
            Choose the path that feels right for where you are in your journey.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <PackageCard key={i} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DiscoveryCallSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(https://mgx-backend-cdn.metadl.com/generate/images/1347093/2026-07-14/spfnwtacai2q/cta-bg-sunrise-water.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E3B3F]/10 to-[#B8860B]/10" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-[#0E3B3F] mb-6">Not sure where to start?</h2>
        <p className="text-xl text-[#0E3B3F]/70 mb-8">
          Book a free 20-minute Discovery Call.
        </p>
        <Button
          size="lg"
          onClick={() => openCalPopup("discovery-call", "dr.-margaret-cyprian-c5ownd/discovery-call")}
          className="bg-[#B8860B] hover:bg-[#9A7209] text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          Book Your Free Discovery Call
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0E3B3F] text-white py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-heading text-white mb-2">
              DrMC Spirit-Led Life Coaching
            </h3>
          </div>
          <div className="text-center md:text-right">
            <p className="text-white/60 italic text-sm font-heading mb-2">
              "Be transformed by the renewing of your mind…" — Romans 12:2
            </p>
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} DrMC Spirit-Led Life Coaching. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  useCalEmbed();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ScriptureSection />
      <AboutSection />
      <PackagesSection />
      <DiscoveryCallSection />
      <Footer />
    </div>
  );
}