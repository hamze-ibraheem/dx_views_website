import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Star, Eye, ShieldCheck, Cpu, Sparkles, MapPin, 
  Send, Phone, Calendar, Clock, ChevronLeft, ChevronRight, ChevronDown, 
  Tv, Compass, Coffee, Award, Headphones, Swords, DollarSign,
  Laptop, Gamepad2, ArrowRight, CheckCircle2, Languages, Instagram, Twitter, Search, MessageSquare, X, Minimize2, Moon
} from 'lucide-react';

import IndustryHeadlines from './components/IndustryHeadlines';

// ==========================================
// TRANSLATION DICTIONARY
// ==========================================
const TRANSLATIONS = {
  ar: {
    navHome: "الرئيسية",
    navAbout: "عن دكس",
    navPackages: "الباقات",
    navGallery: "الصالات",
    navReviews: "الآراء",
    navFAQ: "الأسئلة",
    navStaff: "الطاقم",
    navNews: "الأخبار",
    navBook: "احجز الآن",
    
    heroTitle: "الألعاب على مستوى آخر",
    heroSubtitle: "تجربة الألعاب الأكثر سينمائية واحترافية في الرياض للأفراد والعائلات.",
    heroCtaBook: "احجز مقعدك الآن",
    heroCtaPackages: "عرض باقات كبار الشخصيات",
    
    statsViews: "مشاهدة على قوقل ماب",
    statsReviews: "تقييم 5 نجوم",
    statsVip: "باقات كبار الشخصيات VIP",
    statsFamily: "بيئة عائلية آمنة ومريحة",
    
    whyTitle: "لماذا تختار دكس فيوز؟",
    whySubtitle: "نهتم بالتفاصيل لنقدم لك تجربة لعب تليق بشغفك وتنافسيتك",
    
    why1Title: "أجهزة خارقة وأداء سلس للغاية",
    why1Desc: "أحدث بطاقات الرسومات RTX وقدرة معالجة مع شاشات 240Hz+ مهيأة بالكامل للعبة روكيت ليغ والرياضات الإلكترونية.",
    
    why2Title: "بيئة نظيفة ومعقمة بشكل فائق",
    why2Desc: "تعقيم دوري مستمر للأجهزة والمقاعد والسماعات لنضمن لك مكاناً مريحاً يعجبك ويعزز تركيزك.",
    
    why3Title: "طاقم عمل ودود واحترافي فوق الخيال",
    why3Desc: "خدمة استثنائية من موظفينا المميزين (سانديب، أطور، وأمين) الذين يشيد بهم زوارنا دائماً لمساعدتهم السريعة.",
    
    why4Title: "أسعار ممتازة وتنافسية جداً",
    why4Desc: "قيمة استثنائية للعب الفردي والجماعي مع باقات توفير تقدم لك أفضل جودة مقابل السعر بالرياض.",
    
    why5Title: "بيئة عائلية آمنة ومناسبة للأطفال",
    why5Desc: "مكان معتمد ومحترم يرحب بجميع الأعمار، يمنح الطمأنينة الكاملة للأهالي بفضل المراقبة والمناخ النظيف.",
    
    why6Title: "جلسات فاخرة وتجهيزات متكاملة",
    why6Desc: "سماعات عازلة للضوضاء، كابلات ألياف فائقة السرعة للاتصال، مع خيار استئجار يد بلايستيشن DualSense.",
    
    packagesTitle: "اختر جبهتك اللعبيّة",
    packagesSubtitle: "سواء كنت تبحث عن اختبار سريع أو ماراثون لعب أسطوري يمتد لنصف يوم، ستجد باقتك هنا",
    packagesPopular: "الأكثر طلباً بالرياض",
    packagesBuy: "احجز هذه الباقة",
    packagesHour: "ساعة",
    packagesHours: "ساعات",
    starterTitle: "باقة البداية (Starter)",
    gamerTitle: "باقة النخبة (Gamer Setup)",
    vipTitle: "الباقة الأسطورية (VIP 12-Hour)",
    starterDesc: "مثالية لجلسة ترفيهية سريعة وتجربة أداء الأجهزة الجبارة وسرعة الاتصال اللحظية.",
    gamerDesc: "خيار لاعبي روكيت ليغ الأساسي. مثالية للتنافس والتحدي ورفع تصنيفك بمرفقة عصير طاقة منعش.",
    vipDesc: "12 ساعة متكاملة من الاندماج واللعب المطلق. تشمل مواصفات VIP خاصة، مع مشروب وهار بارتيشن خاص ومكان فخم.",
    
    testimonialsTitle: "شهادات جليلة من مجتمعنا",
    testimonialsSubtitle: "نحن فخورون بالحب والتقدير الذي يمنحه لنا أصدقاء دكس فيوز على وسائل التواصل وقوقل",
    
    teamTitle: "فريق خدمات النخبة",
    teamSubtitle: "موظفونا هم ركيزة الأجواء الفريدة وشغفنا اليومي لتقديم أفضل رعاية لك",
    teamSandeepRole: "أخصائي الدعم التقني والأنظمة والشبكات",
    teamAtourRole: "مشرف الصالة ومسؤول خدمة وتجربة اللاعبين",
    teamAminRole: "منسق حجوزات باقات كبار الشخصيات وجلسات النخبة",
    teamSandeepQuote: "\"سانديب مهندس حقيقي يضمن بقاء أجهزتنا بأعلى معدل إطارات وبدون أي لاق.\"",
    teamAtourQuote: "\"أطور يجعلك تشعر وكأنك في بيتك مع ترحيبه الحار والذوق العالي.\"",
    teamAminQuote: "\"أمين مهتم بأدق تفاصيل الجلسة والضيافة، يخدمك بكرم لا ينتهي وبابتسامة.\"",
    
    galleryTitle: "أبعاد الأجواء السينمائية",
    gallerySubtitle: "تجول في المعلم الترفيهي الفخم للرياض وصالاتنا المصممة بجاذبية فائقة",
    
    galleryVip: "منطقة مواجهات كبار الشخصيات VIP",
    galleryMain: "الصالة المركزية للكمبيوتر الشخصي",
    galleryPs: "رعيل ركن الـ PlayStation المنصي",
    galleryLounge: "ردهة الاسترخاء الفخم والمشروبات والقهوة المختصة",
    galleryBattle: "حلبة البطولات الاحترافية الرسمية",
    galleryStreams: "حجيرات البث وصناعة المحتوى الغامرة",
    galleryCafe: "بار الإسبريسو والضيافة المفتوحة",
    galleryCozy: "زون الأصدقاء وجلسات التحدي الثلاثية",
    
    bookTitle: "احجز مقعدك للملحمة القادمة",
    bookSubtitle: "أنشئ حجزك الفوري الآن لتوفير جهازك المخصص وتحديد الباقة المرجوة فور وصولك",
    bookFormName: "الاسم الكريم",
    bookFormPhone: "رقم الجوال السعودي",
    bookFormDate: "التاريخ ووقت الوصول المفضل",
    bookFormPackage: "اختر الباقة لربطها",
    bookFormSubmit: "تأكيد جولة اللعب الفخمة",
    bookSuccess: "تم تأكيد طلب حجزك بنجاح! تم حفظ طلبك وإرسال التذكرة لك. نحن بانتظار تشريفك قريباً في دكس فيوز بالرياض.",
    
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "إجابات سريعة لأهم استفسارات مجتمعنا حول سياسات الصالة والمواصفات",
    faq1Question: "هل هناك قيود عمرية لدخول الصالة؟",
    faq1Answer: "نرحب باللاعبين من جميع الأعمار. الأطفال الأقل من 12 عاماً نفضل مرافقتهم بشخص بالغ لضمان راحتهم، ونتيح بيئة عائلية آمنة ومراقبة تماماً.",
    faq2Question: "ما هي مواصفات الأجهزة (البي سي) المتاحة؟",
    faq2Answer: "نستخدم أجهزة بمعالجات حديثة وبطاقات رسومات RTX الفائقة مع شاشات بمعدل تحديث عالي 240Hz+ ومستلزمات احترافية لضمان أفضل أداء خالي من التقطيع.",
    faq3Question: "هل يمكنني حجز مقاعد لمجموعة من الأصدقاء؟",
    faq3Answer: "بالتأكيد! نوفر باقات وتجهيزات مخصصة للمجموعات مع إمكانية جلوسكم معاً في المناطق المخصصة أو غرف الـ VIP مع أفضلية الحجز المسبق.",
    faqSearchPlaceholder: "ابحث في الأسئلة الشائعة...",
    faqNoResults: "لم يتم العثور على نتائج تطابق بحثك.",
    
    chatTitle: "الدعم المباشر",
    chatSubtitle: "تحدث مع طاقم دكس فيوز",
    chatPlaceholder: "اكتب رسالتك هنا...",
    chatInitialBot: "مرحباً! كيف يمكننا مساعدتك اليوم؟",
    chatSend: "إرسال",
    
    footerRights: "جميع الحقوق محفوظة لصالح دكس فيوز (DXViews) © 2026. الرياض، المملكة العربية السعودية."
  },
  en: {
    navHome: "Home",
    navAbout: "About DX",
    navPackages: "Packages",
    navGallery: "Gallery",
    navReviews: "Reviews",
    navFAQ: "FAQ",
    navStaff: "Staff",
    navNews: "News",
    navBook: "Book Now",
    
    heroTitle: "Gaming on Another Level",
    heroSubtitle: "Riyadh's most cinematic, safe, and elite gaming café experience for families & pro gamers.",
    heroCtaBook: "Book Your Slot Now",
    heroCtaPackages: "View VIP Packages",
    
    statsViews: "Google Maps Views",
    statsReviews: "5★ Verified Reviews",
    statsVip: "VIP 12-Hour Marathons",
    statsFamily: "Family Safe Area",
    
    whyTitle: "Why Choose DXViews?",
    whySubtitle: "We craft every single element to deliver the ultimate atmospheric gaming escape",
    
    why1Title: "Extreme Specs & Smooth Gameplay",
    why1Desc: "High-end RTX GPUs coupled with ultra-refresh 240Hz monitors optimized for flawless Rocket League gameplay.",
    
    why2Title: "Pristine & Ultra-Clean Setup",
    why2Desc: "Continuous deep sanitization of all gaming gear, high-end headsets, and premium seat fabrics.",
    
    why3Title: "Stellar & Attentive Staff Team",
    why3Desc: "Exceptional assistance from Atour, Sandeep, and Amin, highly praised for hospitality and speed.",
    
    why4Title: "Unbeatable Competitive Prices",
    why4Desc: "Extreme local value with flexible plans, gaming rates, and heavy multi-hour bundle savings.",
    
    why5Title: "Family-Friendly & Child Safe",
    why5Desc: "A robust, cozy environment thoroughly approved by parents to host children safely.",
    
    why6Title: "Luxury Seating & Top-Grade Gear",
    why6Desc: "Noise-cancelling professional headsets, high-speed fiber pipes, and premium PlayStation DualSense controller rentals.",
    
    packagesTitle: "Select Your Battle Plan",
    packagesSubtitle: "Pick the ultimate tier, from a short tactical session to a premium half-day marathon",
    packagesPopular: "Most Popular in Riyadh",
    packagesBuy: "Book This Deck Now",
    packagesHour: "Hour",
    packagesHours: "Hours",
    starterTitle: "Starter Session",
    gamerTitle: "Gamer Blueprint",
    vipTitle: "VIP Legend (12-Hour)",
    starterDesc: "Perfect for testing elite gaming hardware, comfortable setups, and blazing-fast response rates.",
    gamerDesc: "The prime layout for competitive gamers. Lock in for a serious team session with complimentary energy fuel.",
    vipDesc: "12 full hours of uninhibited gaming nirvana at a private VIP station, free premium hot coffee, and comfort gear.",
    
    testimonialsTitle: "Loved By Riyadh's Community",
    testimonialsSubtitle: "Real reviews from real gamers who drive from neighborhoods across Riyadh for DXViews",
    
    teamTitle: "Our Spotlight Team",
    teamSubtitle: "The incredible professionals praised in hundreds of reviews for making DXViews warm & responsive",
    teamSandeepRole: "Systems Network Architect",
    teamAtourRole: "General Operations Director",
    teamAminRole: "Concierge & VIP Experience Specialist",
    teamSandeepQuote: "\"Sandeep is a pure genius at tuning our hardware so latency is absolutely zero.\"",
    teamAtourQuote: "\"Atour's hospitality makes you feel right at home with outstanding care every time.\"",
    teamAminQuote: "\"Amin was absolutely outstanding. He arranged the VIP rooms for our guild flawlessly.\"",
    
    galleryTitle: "Through The Looking Glass",
    gallerySubtitle: "Check out our premium atmospheric interior styled with modern neon accents",
    
    galleryVip: "VIP Private Deck",
    galleryMain: "Main PC Battle Arena",
    galleryPs: "DualSense PlayStation Arcade",
    galleryLounge: "Espresso & Gaming Lounge",
    galleryBattle: "Esports Tournament Hub",
    galleryStreams: "Immersive Streaming Capsule",
    galleryCafe: "Specialty Espresso Bar",
    galleryCozy: "Cozy Friends Basecamp",
    
    bookTitle: "Ready to Join the Grid?",
    bookSubtitle: "Instantly draft your attendance request to secure your extreme computer desk today",
    bookFormName: "Your Full Name",
    bookFormPhone: "Saudi Mobile Number",
    bookFormDate: "Target Session Date & Time",
    bookFormPackage: "Preferred Entry Package",
    bookFormSubmit: "Deploy Luxury Seat Order",
    bookSuccess: "Your premium booking request has been successfully registered! We are eager to host you soon at DXViews.",
    
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Quick answers to common inquiries regarding age limits, tech specs, and group rules",
    faq1Question: "Are there any age restrictions for entry?",
    faq1Answer: "We welcome gamers of all ages. For children under 12, we recommend adult accompaniment to ensure maximum comfort, backed by our fully family-safe and monitored environment.",
    faq2Question: "What are the exact PC hardware specifications?",
    faq2Answer: "Our rigs are powered by high-end processors and top-tier RTX GPUs, paired with 240Hz+ high-refresh-rate monitors and professional peripherals for zero-lag performance.",
    faq3Question: "Can I book a section for a squad or a group of friends?",
    faq3Answer: "Absolutely! We offer custom group bookings and multiplayer zones so your squad can sit together, including private VIP rooms. Advance booking is recommended.",
    faqSearchPlaceholder: "Search frequently asked questions...",
    faqNoResults: "No results matched your search.",
    
    chatTitle: "Live Support",
    chatSubtitle: "Chat with DXViews Staff",
    chatPlaceholder: "Type your message...",
    chatInitialBot: "Hello! How can we assist you today?",
    chatSend: "Send",
    
    footerRights: "All Rights Reserved for DXViews Gaming Café © 2026. Riyadh, Kingdom of Saudi Arabia."
  }
};

// ==========================================
// BACKGROUND CANVAS PARTICLES (Interactive Ambient Orb Effect)
// ==========================================
function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      flickerSpeed: number;
      glowColor: 'blue' | 'gold' | 'cyan';
    }> = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.getBoundingClientRect().height || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Create particles
    const colorTypes: Array<'blue' | 'gold' | 'cyan'> = ['blue', 'gold', 'cyan'];
    const count = 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.8,
        vx: (Math.random() * 0.3 - 0.15),
        vy: (Math.random() * 0.3 - 0.15),
        baseAlpha: Math.random() * 0.4 + 0.15,
        flickerSpeed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        glowColor: colorTypes[Math.floor(Math.random() * colorTypes.length)]
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render 2 huge ambient back-glow blobs representing the specified design language:
      // Electric blue (#0066ff) and deep gold (#f0a500)
      const grad1 = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.25, 10,
        canvas.width * 0.15, canvas.height * 0.25, Math.max(canvas.width, canvas.height) * 0.35
      );
      grad1.addColorStop(0, 'rgba(0, 102, 255, 0.07)');
      grad1.addColorStop(1, 'rgba(7, 7, 10, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const grad2 = ctx.createRadialGradient(
        canvas.width * 0.85, canvas.height * 0.7, 10,
        canvas.width * 0.85, canvas.height * 0.7, Math.max(canvas.width, canvas.height) * 0.38
      );
      grad2.addColorStop(0, 'rgba(240, 165, 0, 0.05)');
      grad2.addColorStop(1, 'rgba(7, 7, 10, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render particle cluster structure
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.baseAlpha += p.flickerSpeed;

        if (p.baseAlpha < 0.1 || p.baseAlpha > 0.6) {
          p.flickerSpeed = -p.flickerSpeed;
        }

        // Screen boundary wraps
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Dynamic mouse interactivity
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const mDist = Math.sqrt(dx * dx + dy * dy);
        let finalSize = p.size;
        let finalAlpha = p.baseAlpha;

        if (mDist < 180) {
          const force = (180 - mDist) / 180;
          // Subtly repel or pull
          p.x += (dx / mDist) * force * 1.2;
          p.y += (dy / mDist) * force * 1.2;
          finalSize = p.size * (1 + force * 1.5);
          finalAlpha = Math.min(0.9, p.baseAlpha + force * 0.4);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, finalSize, 0, Math.PI * 2);

        let rgb = '0, 102, 255'; // blue
        if (p.glowColor === 'gold') rgb = '240, 165, 0';
        else if (p.glowColor === 'cyan') rgb = '0, 240, 255';

        ctx.fillStyle = `rgba(${rgb}, ${finalAlpha})`;
        ctx.shadowBlur = finalSize * 3;
        ctx.shadowColor = `rgb(${rgb})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connections to close-by particles
        for (let j = idx + 1; j < particles.length; j++) {
          const other = particles[j];
          const ldx = p.x - other.x;
          const ldy = p.y - other.y;
          const lDist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (lDist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            const lineAlpha = (1 - lDist / 120) * 0.05 * Math.min(finalAlpha, other.baseAlpha);
            ctx.strokeStyle = `rgba(100, 160, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-x-0 top-0 w-full pointer-events-none opacity-80 mix-blend-screen -z-10" 
    />
  );
}

// ==========================================
// TESTIMONIAL QUOTES
// ==========================================
const TESTIMONIALS = [
  {
    ar: "من أفضل محلات بي سي دخلته في حياتي، نظافة الأجهزة والتعامل الراقي يصنع الفارق.",
    en: "One of the best PC cafés I've ever visited in my life. The cleanliness of the gear and the elite service make all the difference.",
    author: "Riyadh Gamer",
    rating: 5,
    date: "1 month ago",
    badge: "Verified Local Guide"
  },
  {
    ar: "المكان آمن جداً للأطفال ومناسب للعوائل. تمنيت لو أعرف هذا المكان الجميل من قبل.",
    en: "The place is extremely safe for children and family-friendly. I wish I had discovered this beautiful gem earlier.",
    author: "Abu Fahad",
    rating: 5,
    date: "2 weeks ago",
    badge: "Parent Elite reviewer"
  },
  {
    ar: "لعبت روكيت ليغ هنا والتجربة كانت أسطورية. الأجهزة جبارة والأداء سلس وخالي من التقطيع واللاق.",
    en: "Rocket League here was amazing — the PCs are powerful and run smoothly.",
    author: "Mubarak A.",
    rating: 5,
    date: "3 days ago",
    badge: "Rocket League Pro"
  },
  {
    ar: "أسعار ممتازة جداً جداً مقابل كواليتي الأجهزة الموفرة وسرعة النت الفائقة.",
    en: "Prices are excellent, very very competitive for the high refresh rate setups and lightning-fast fiber speeds.",
    author: "Khaled Al-Harbi",
    rating: 5,
    date: "1 month ago",
    badge: "Riyadh Tech Reviewer"
  },
  {
    ar: "الموظف أطور والله ماقصر معي خدوم وبشوش، والمكان هادي ونظيف وكل شيء فيه متكامل.",
    en: "Atour never let me down! Visited far and he is exceptionally helpful and friendly. The environment is spotless and perfectly equipped.",
    author: "Abdulrahman Q.",
    rating: 5,
    date: "3 weeks ago",
    badge: "Regular Visitor"
  },
  {
    ar: "الموظفين مافي أجمل من تعاملهم، خصوصاً سانديب وأمين وأطور. خدومين وأخلاقهم عالية.",
    en: "The staff's customer treatment is unparalleled, especially Sandeep, Amin, and Atour. Super helpful and extremely highly professional.",
    author: "Mishaal",
    rating: 5,
    date: "2 months ago",
    badge: "Pro Level Reviewer"
  }
];

// ==========================================
// STATIC CONSTANTS FOR GALLERY ITEMS
// ==========================================
const GALLERY_ITEMS = [
  { id: 'vip', labelKey: 'galleryVip', grad: 'from-blue-900/40 via-purple-900/20 to-zinc-950', border: 'border-blue-500/25', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop' },
  { id: 'main', labelKey: 'galleryMain', grad: 'from-indigo-950/40 via-blue-950/20 to-zinc-950', border: 'border-indigo-500/20', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop' },
  { id: 'ps', labelKey: 'galleryPs', grad: 'from-blue-950/50 via-zinc-900/30 to-zinc-950', border: 'border-blue-400/20', image: 'https://images.unsplash.com/photo-1606144042851-9ef2136e05ad?q=80&w=2070&auto=format&fit=crop' },
  { id: 'lounge', labelKey: 'galleryLounge', grad: 'from-amber-950/40 via-yellow-950/20 to-zinc-950', border: 'border-amber-500/20', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop' },
  { id: 'battle', labelKey: 'galleryBattle', grad: 'from-cyan-950/40 via-blue-900/20 to-zinc-950', border: 'border-cyan-500/25', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop&sepia=50' },
  { id: 'streams', labelKey: 'galleryStreams', grad: 'from-purple-950/40 via-red-900/10 to-zinc-950', border: 'border-purple-500/20', image: 'https://images.unsplash.com/photo-1588701968800-47b74bd2b6fb?q=80&w=2070&auto=format&fit=crop' },
  { id: 'cafe', labelKey: 'galleryCafe', grad: 'from-amber-900/30 via-stone-900/30 to-zinc-950', border: 'border-amber-600/15', image: 'https://images.unsplash.com/photo-1605809708605-728f32ac6be1?q=80&w=2070&auto=format&fit=crop' },
  { id: 'cozy', labelKey: 'galleryCozy', grad: 'from-zinc-900 via-blue-950/20 to-zinc-950', border: 'border-zinc-700/30', image: 'https://images.unsplash.com/photo-1629429408209-1fec9a1f2868?q=80&w=2070&auto=format&fit=crop' }
];

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [midnightMode, setMidnightMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const HERO_SLIDES = [
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Chat State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{sender: 'bot' | 'user', text: string}[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  // Lightbox State
  const [lightboxItem, setLightboxItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  // Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    dateTime: '',
    packageId: 'vip'
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Auto Scroll Reviews Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  // Sticky header transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const text = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  useEffect(() => {
    if (chatOpen && chatMessages.length === 0) {
      setChatMessages([{ sender: 'bot', text: text.chatInitialBot }]);
    }
  }, [chatOpen, lang, text.chatInitialBot, chatMessages.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    
    const newMsg = currentMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: newMsg }]);
    setCurrentMessage('');
    
    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/962780691315?text=${encodeURIComponent(newMsg)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: lang === 'ar' ? 'جاري تحويلك إلى واتساب لاستكمال المحادثة...' : 'Redirecting you to WhatsApp to continue the conversation...'
      }]);
    }, 500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.dateTime) {
      alert(lang === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }
    
    setSubmitting(true);
    
    const message = lang === 'ar' 
      ? `طلب حجز جديد:
- الاسم: ${bookingForm.name}
- رقم الهاتف: ${bookingForm.phone}
- الموعد: ${bookingForm.dateTime}
- الباقة: ${bookingForm.packageId}`
      : `New Booking Order:
- Name: ${bookingForm.name}
- Phone: ${bookingForm.phone}
- Date/Time: ${bookingForm.dateTime}
- Package: ${bookingForm.packageId}`;

    const whatsappUrl = `https://wa.me/962780691315?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Simulate high-end server ticket placement
    setTimeout(() => {
      setSubmitting(false);
      setBookingSubmitted(true);
    }, 1500);
  };

  const handleBookNowClick = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewPackagesClick = () => {
    const packagesSection = document.getElementById('packages-section');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className={`min-h-screen font-sans bg-gaming-dark bg-gradient-orb text-gray-100 overflow-x-hidden relative select-none selection:bg-gaming-blue selection:text-white transition-colors duration-700 ${midnightMode ? 'theme-midnight' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
      id="root-container"
    >
      {/* Absolute Cinematic Particle Mesh */}
      <AmbientParticles />

      {/* Retro Cyber Scanline overlay to match the high-end A24 cyber/film mood */}
      <div className="absolute inset-0 pointer-events-none scanlines opacity-5 mix-blend-overlay z-50 rounded-none h-full w-full" />

      {/* ==========================================
          1. STICKY NAV SECTION
          ========================================== */}
      <nav 
        id="navbar"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass-panel py-3 shadow-2xl shadow-[#000000]/80 border-b border-white/5 opacity-100' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo with glowing bracket indicators */}
          <a href="#" className="flex items-center space-x-2 space-x-reverse relative group" id="logo-link">
            <span className="absolute -inset-2 bg-gradient-to-r from-gaming-blue to-gaming-cyan opacity-0 group-hover:opacity-15 blur-lg transition duration-500 rounded-lg"></span>
            <div className="flex flex-col items-start leading-none">
              <span className="font-display font-extrabold text-2xl tracking-widest bg-gradient-to-r from-white via-blue-100 to-gaming-blue bg-clip-text text-transparent transform transition group-hover:scale-102">
                دكس فيوز <span className="text-gaming-cyan">|</span> DXViews
              </span>
              <span className="text-[9px] text-gaming-gold tracking-[0.25em] font-mono mt-0.5 uppercase">
                Riyadh Elite Hub
              </span>
            </div>
          </a>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse" id="nav-desktop-links">
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-gaming-cyan hover:glow-text-blue transition-all duration-200">{text.navHome}</a>
            <a href="#about-section" className="text-sm font-medium text-gray-300 hover:text-gaming-cyan hover:glow-text-blue transition-all duration-200">{text.navAbout}</a>
            <a href="#packages-section" className="text-sm font-medium text-gray-300 hover:text-gaming-cyan hover:glow-text-blue transition-all duration-200">{text.navPackages}</a>
            <a href="#reviews-section" className="text-sm font-medium text-gray-300 hover:text-gaming-cyan hover:glow-text-blue transition-all duration-200">{text.navReviews}</a>
            <a href="#faq-section" className="text-sm font-medium text-gray-300 hover:text-gaming-cyan hover:glow-text-blue transition-all duration-200">{text.navFAQ}</a>
            <a href="#staff-section" className="text-sm font-medium text-gray-300 hover:text-gaming-cyan hover:glow-text-blue transition-all duration-200">{text.navStaff}</a>
            <a href="#headlines-section" className="text-sm font-medium text-gray-300 hover:text-gaming-cyan hover:glow-text-blue transition-all duration-200">{text.navNews}</a>
            <a href="#gallery-section" className="text-sm font-medium text-gray-300 hover:text-gaming-cyan hover:glow-text-blue transition-all duration-200">{text.navGallery}</a>
            
            {/* Quick Action Button */}
            <button 
              onClick={handleBookNowClick}
              id="sticky-nav-book-btn"
              className="px-5 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-gaming-blue to-indigo-700 text-white hover:shadow-lg hover:shadow-gaming-blue/30 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-blue-400/20 active:border-blue-400"
            >
              {text.navBook}
            </button>

            {/* Midnight Mode Toggle */}
            <button 
              onClick={() => setMidnightMode(!midnightMode)}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${midnightMode ? 'bg-purple-900/30 border-purple-500/50 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-white/10 background-rgba(255,255,255,0.02) text-gray-400 hover:border-gaming-blue hover:text-gaming-cyan'}`}
              title={midnightMode ? "Disable Midnight Mode" : "Enable Midnight Mode"}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            
            {/* Language Switcher Button with custom glass-ring toggle styling */}
            <button 
              onClick={toggleLanguage}
              id="lang-toggle-btn"
              className="p-2 rounded-full border border-white/10 background-rgba(255,255,255,0.02) text-xs font-semibold hover:border-gaming-blue hover:text-gaming-cyan transition-colors duration-200 flex items-center space-x-1 space-x-reverse"
              title={lang === 'ar' ? "Switch to English" : "تحويل إلى العربية"}
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px] font-bold">{lang === 'ar' ? "EN" : "العربية"}</span>
            </button>
          </div>

          {/* Mobile hamburger button + mobile lang selector */}
          <div className="flex md:hidden items-center space-x-3 space-x-reverse" id="nav-mobile-controls">
            <button 
              onClick={() => setMidnightMode(!midnightMode)}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${midnightMode ? 'bg-purple-900/30 border-purple-500/50 text-purple-400' : 'border-white/10 bg-white/5 text-gray-400'}`}
            >
              <Moon className="w-3 h-3" />
            </button>
            
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-full border border-white/10 bg-white/5 text-xs text-gaming-cyan"
            >
              <span className="font-mono font-bold text-[10px]">{lang === 'ar' ? "EN" : "AR"}</span>
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/10 bg-[#0c0c14]/80 text-[#f3f4f6] focus:outline-none"
              id="mobile-menu-hamburger"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center">
                <span className={`h-0.5 w-full bg-white rounded-full transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`h-0.5 w-full bg-white rounded-full transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`h-0.5 w-full bg-white rounded-full transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile expandable drawer menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden glass-panel backdrop-blur-2xl bg-[#08080c]/90 border-t border-white/10 overflow-hidden w-full absolute top-full left-0 shadow-3xl"
              id="mobile-navbar-drawer"
            >
              <div className="px-5 py-8 grid grid-cols-2 gap-3">
                <a 
                  href="#" 
                  className="flex items-center justify-center text-base font-bold py-4 px-4 bg-white/5 hover:bg-white/10 active:bg-gaming-blue/20 border border-white/5 rounded-2xl text-gray-100 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.navHome}
                </a>
                <a 
                  href="#about-section" 
                  className="flex items-center justify-center text-base font-bold py-4 px-4 bg-white/5 hover:bg-white/10 active:bg-gaming-blue/20 border border-white/5 rounded-2xl text-gray-100 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.navAbout}
                </a>
                <a 
                  href="#packages-section" 
                  className="flex items-center justify-center text-base font-bold py-4 px-4 bg-white/5 hover:bg-white/10 active:bg-gaming-blue/20 border border-white/5 rounded-2xl text-gray-100 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.navPackages}
                </a>
                <a 
                  href="#reviews-section" 
                  className="flex items-center justify-center text-base font-bold py-4 px-4 bg-white/5 hover:bg-white/10 active:bg-gaming-blue/20 border border-white/5 rounded-2xl text-gray-100 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.navReviews}
                </a>
                <a 
                  href="#faq-section" 
                  className="flex items-center justify-center text-base font-bold py-4 px-4 bg-white/5 hover:bg-white/10 active:bg-gaming-blue/20 border border-white/5 rounded-2xl text-gray-100 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.navFAQ}
                </a>
                <a 
                  href="#staff-section" 
                  className="flex items-center justify-center text-base font-bold py-4 px-4 bg-white/5 hover:bg-white/10 active:bg-gaming-blue/20 border border-white/5 rounded-2xl text-gray-100 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.navStaff}
                </a>
                <a 
                  href="#headlines-section" 
                  className="flex items-center justify-center text-base font-bold py-4 px-4 bg-white/5 hover:bg-white/10 active:bg-gaming-blue/20 border border-white/5 rounded-2xl text-gray-100 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.navNews}
                </a>
                <a 
                  href="#gallery-section" 
                  className="flex items-center justify-center text-base font-bold py-4 px-4 bg-white/5 hover:bg-white/10 active:bg-gaming-blue/20 border border-white/5 rounded-2xl text-gray-100 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.navGallery}
                </a>
                
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleBookNowClick();
                  }}
                  className="col-span-2 mt-2 w-full py-4 bg-gradient-to-r from-gaming-blue to-indigo-700 text-white font-black rounded-2xl shadow-lg shadow-gaming-blue/20 text-base text-center transform active:scale-[0.98] transition-all duration-300"
                >
                  {text.navBook}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==========================================
          2. HERO SECTION
          ========================================== */}
      <section 
        id="hero-section"
        className="min-h-screen relative flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden border-b border-white/5"
      >
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentHeroSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={HERO_SLIDES[currentHeroSlide]} 
                alt="Gaming Lounge" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040406] via-[#040406]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#040406] via-transparent to-transparent opacity-80"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="max-w-5xl mx-auto text-center z-10 relative flex flex-col items-center">
          
          {/* Top aesthetic label: "Premium Gaming Lounge In Riyadh" */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center space-x-2 space-x-reverse px-4 py-1.5 rounded-full border border-gaming-blue/30 bg-gaming-blue/10 backdrop-blur-md"
            id="hero-micro-badge"
          >
            <Sparkles className="w-3.5 h-3.5 text-gaming-cyan animate-pulse" />
            <span className="text-xs font-semibold text-gaming-cyan tracking-wider font-mono uppercase">
              {lang === 'ar' ? "تجربة كافية النخبة بالرياض" : "Riyadh's Premier Lounge Sandbox"}
            </span>
          </motion.div>

          {/* Epic Bilingual Display Heading */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="leading-none mb-6 relative tracking-tight max-w-4xl"
            id="hero-main-heading"
          >
            <span className="block font-display font-extrabold text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-100 to-gray-400 leading-[1.05]">
              الألعاب على مستوى آخر
            </span>
            <span className="block text-2xl md:text-4xl font-display font-bold text-gaming-cyan mt-4 tracking-wider uppercase glow-text-blue">
              Gaming on Another Level
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 font-sans text-base md:text-xl max-w-2xl mb-12 leading-relaxed"
            id="hero-subphrase"
          >
            {text.heroSubtitle}
          </motion.p>

          {/* Intersecting Action Buttons with unique pulsings */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            id="hero-cta-buttons"
          >
            <button 
              onClick={handleBookNowClick}
              className="w-full sm:w-auto relative px-8 py-4 rounded-xl bg-gaming-blue text-white font-bold tracking-wider text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 border border-gaming-blue/50 group overflow-hidden shadow-2xl shadow-gaming-blue/20 cursor-pointer"
              id="hero-primary-book-btn"
            >
              {/* Outer button glowing laser pulse */}
              <span className="absolute inset-0 bg-gradient-to-r from-gaming-blue to-indigo-600 opacity-100 transition duration-300"></span>
              <span className="absolute -inset-3 bg-gradient-to-r from-gaming-cyan to-gaming-blue opacity-50 blur-lg rounded-xl transition duration-300 group-hover:opacity-75"></span>
              <span className="relative flex items-center justify-center gap-2">
                {text.heroCtaBook}
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:scale-110 transition-transform" />
              </span>
            </button>

            <button 
              onClick={handleViewPackagesClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent text-gray-200 font-bold tracking-wider text-sm hover:text-white transition-all duration-300 border border-white/10 hover:border-gaming-blue/60 backdrop-blur-sm cursor-pointer hover:shadow-xl hover:shadow-gaming-blue/5"
              id="hero-secondary-packages-btn"
            >
              {text.heroCtaCtaPackages || text.heroCtaPackages}
            </button>
          </motion.div>

          {/* Floating Luxury Mouse Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute bottom-6 md:bottom-12 flex flex-col items-center cursor-pointer pb-8"
            onClick={() => {
              const statsBar = document.getElementById('stats-bar-section');
              if (statsBar) statsBar.scrollIntoView({ behavior: 'smooth' });
            }}
            id="scroll-indicator"
          >
            <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mb-2">
              {lang === 'ar' ? "مرر لأسفل" : "SCROLL DOWN"}
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-slate-600/60 p-1 flex justify-center">
              <div className="w-1 h-2 bg-gaming-cyan rounded-full animate-bounce" />
            </div>
          </motion.div>

          {/* Slider Indicators */}
          <div className="absolute bottom-4 flex justify-center w-full space-x-2 space-x-reverse" id="hero-slider-dots">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentHeroSlide === idx ? 'bg-gaming-cyan w-6' : 'bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          3. STATS BAR SECTION
          ========================================== */}
      <section 
        id="stats-bar-section"
        className="py-12 bg-gaming-dark/60 border-y border-white/8 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats-grid">
            
            {/* Stat Item 1 (54,200+ Views) */}
            <div className="glass-panel stat-card-accent p-6 rounded-xl flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-transform shadow-lg border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gaming-blue/10 rounded-full blur-2xl -z-10 group-hover:bg-gaming-blue/20 transition-all duration-300" />
              <div className="p-3 bg-gaming-blue/15 rounded-xl text-gaming-cyan mb-3 glow-blue-sm">
                <Eye className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-3xl md:text-4xl text-white tracking-wider">
                54,200+
              </span>
              <span className="text-gray-400 text-xs md:text-sm font-medium mt-1">
                {text.statsViews}
              </span>
            </div>

            {/* Stat Item 2 (5★ Reviews) */}
            <div className="glass-panel stat-card-accent p-6 rounded-xl flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-transform shadow-lg border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#f0a500]/5 rounded-full blur-2xl -z-10 group-hover:bg-[#f0a500]/15 transition-all duration-300" />
              <div className="p-3 bg-gaming-gold/15 rounded-xl text-gaming-gold mb-3 relative">
                <div className="absolute inset-0 bg-gaming-gold/10 rounded-xl blur-sm" />
                <Star className="w-5 h-5 fill-gaming-gold" />
              </div>
              <span className="font-display font-black text-3xl md:text-4xl text-gaming-gold tracking-wider glow-text-gold">
                5.0 ★
              </span>
              <span className="text-gray-400 text-xs md:text-sm font-medium mt-1">
                {text.statsReviews}
              </span>
            </div>

            {/* Stat Item 3 (VIP 12-HR Packages) */}
            <div className="glass-panel stat-card-accent p-6 rounded-xl flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-transform shadow-lg border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gaming-cyan/10 rounded-full blur-2xl -z-10 group-hover:bg-gaming-cyan/20 transition-all duration-300" />
              <div className="p-3 bg-gaming-cyan/15 rounded-xl text-gaming-cyan mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-3xl md:text-4xl text-white tracking-wider">
                12-HR
              </span>
              <span className="text-gray-400 text-xs md:text-sm font-medium mt-1">
                {text.statsVip}
              </span>
            </div>

            {/* Stat Item 4 (Family Safe Environment) */}
            <div className="glass-panel stat-card-accent p-6 rounded-xl flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-transform shadow-lg border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-2xl -z-10" />
              <div className="p-3 bg-green-500/15 rounded-xl text-green-400 mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-display font-black text-3xl md:text-4xl text-green-400 tracking-wider">
                100%
              </span>
              <span className="text-gray-400 text-xs md:text-sm font-medium mt-1">
                {text.statsFamily}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          4. WHY CHOOSE US
          ========================================== */}
      <section 
        id="about-section"
        className="py-24 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Headers */}
          <div className="text-center mb-16 flex flex-col items-center" id="why-headers">
            <span className="px-4 py-1 rounded-full border border-gaming-blue/30 bg-gaming-blue/5 text-gaming-cyan text-xs font-mono uppercase tracking-widest mb-4">
              {lang === 'ar' ? "مواصفتنا الاستثنائية" : "OUR HIGH-END BLUEPRINT"}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-none mb-4">
              {text.whyTitle}
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
              {text.whySubtitle}
            </p>
          </div>

          {/* Feature Cards Grid (6 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="why-grid-layout">
            
            {/* Card 1: Powerful PCs */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 glass-panel-hover flex flex-col relative group overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gaming-blue/10 rounded-full blur-2xl group-hover:bg-gaming-blue/20 transition-all duration-300" />
              <div className="p-4 bg-gaming-blue/10 border border-gaming-blue/20 rounded-2xl text-gaming-cyan w-fit mb-6 glow-blue-sm">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                {text.why1Title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {text.why1Desc}
              </p>
            </div>

            {/* Card 2: Crystal-Clean Environment */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 glass-panel-hover flex flex-col relative group overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gaming-cyan/10 rounded-full blur-2xl group-hover:bg-gaming-cyan/20 transition-all duration-300" />
              <div className="p-4 bg-gaming-cyan/10 border border-gaming-cyan/20 rounded-2xl text-gaming-cyan w-fit mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                {text.why2Title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {text.why2Desc}
              </p>
            </div>

            {/* Card 3: Friendly Staff */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 glass-panel-hover flex flex-col relative group overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-gaming-gold/10 rounded-full blur-2xl group-hover:bg-gaming-gold/20 transition-all duration-300" />
              <div className="p-4 bg-gaming-gold/10 border border-gaming-gold/20 rounded-2xl text-gaming-gold w-fit mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                {text.why3Title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {text.why3Desc}
              </p>
            </div>

            {/* Card 4: Unbeatable Prices */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 glass-panel-hover flex flex-col relative group overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/15 transition-all duration-300" />
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 w-fit mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                {text.why4Title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {text.why4Desc}
              </p>
            </div>

            {/* Card 5: Family & Child Safe */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 glass-panel-hover flex flex-col relative group overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/15 transition-all duration-300" />
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 w-fit mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                {text.why5Title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {text.why5Desc}
              </p>
            </div>

            {/* Card 6: Premium Seating & Gear */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 glass-panel-hover flex flex-col relative group overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all duration-300" />
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 w-fit mb-6">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                {text.why6Title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {text.why6Desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          5. PACKAGES SECTION
          ========================================== */}
      <section 
        id="packages-section"
        className="py-24 bg-[#090910] scroll-mt-12 border-y border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Headers */}
          <div className="text-center mb-16 flex flex-col items-center" id="package-headers">
            <span className="px-4 py-1 rounded-full border border-gaming-gold/30 bg-gaming-gold/5 text-gaming-gold text-xs font-mono uppercase tracking-widest mb-4">
              {lang === 'ar' ? "الأسعار والباقات التوفيرية" : "THE ARMORY & PASS RATES"}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-none mb-4">
              {text.packagesTitle}
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
              {text.packagesSubtitle}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" id="pricing-tiers">
            
            {/* Tier 1: Starter */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between transform hover:scale-[1.01] transition-all duration-300 relative group">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase block mb-2">Tier 01</span>
                <h3 className="text-2xl font-bold text-white mb-4">{text.starterTitle}</h3>
                
                {/* Visual price label */}
                <div className="flex items-baseline space-x-2 space-x-reverse mb-6">
                  <span className="text-5xl font-display font-black text-white">15</span>
                  <span className="text-xs text-gray-400 font-mono">SAR / {text.packagesHour}</span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {text.starterDesc}
                </p>

                <div className="border-t border-white/5 pt-6 space-y-3.5 mb-8" id="starter-features">
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gaming-cyan flex-shrink-0" />
                    <span>{lang === 'ar' ? "الولوج لجميع الأجهزة الأساسية" : "Standard gaming PC desk role"}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-slate-700 flex-shrink-0" />
                    <span>{lang === 'ar' ? "مشروب ساخن مجاني (غير شامل)" : "Complimentary elite brews (N/A)"}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gaming-cyan flex-shrink-0" />
                    <span>{lang === 'ar' ? "أجهزة طرفية وسماعات معقمة" : "Deeply sanitized headset & gear"}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setBookingForm({ ...bookingForm, packageId: 'starter' });
                  handleBookNowClick();
                }}
                className="w-full py-3.5 rounded-xl border border-white/10 hover:border-gaming-blue hover:bg-gaming-blue/5 text-gray-200 hover:text-white font-bold text-sm tracking-wider transition-all duration-300"
              >
                {text.packagesBuy}
              </button>
            </div>

            {/* Tier 2: Gamer (Highlighted) */}
            <div className="glass-panel p-8 rounded-3xl border border-gaming-blue/30 lg:-translate-y-2 flex flex-col justify-between transform hover:scale-[1.01] transition-all duration-300 relative group shadow-2xl shadow-gaming-blue/10">
              <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-gaming-blue text-white text-[11px] font-black tracking-widest uppercase">
                {lang === 'ar' ? "الأكثر تداولاً" : "BEST MULTIPLAYER RATE"}
              </div>
              <div className="absolute -inset-px bg-gradient-to-b from-gaming-blue/20 to-transparent rounded-3xl -z-10 pointer-events-none" />
              
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-gaming-cyan uppercase block mb-2">Tier 02</span>
                <h3 className="text-2xl font-bold text-white mb-4">{text.gamerTitle}</h3>
                
                {/* Visual price label */}
                <div className="flex items-baseline space-x-2 space-x-reverse mb-6">
                  <span className="text-5xl font-display font-black text-white">35</span>
                  <span className="text-xs text-gaming-cyan font-mono">SAR / 3 {text.packagesHours}</span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                  {text.gamerDesc}
                </p>

                <div className="border-t border-white/5 pt-6 space-y-3.5 mb-8" id="gamer-features">
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gaming-cyan flex-shrink-0" />
                    <span>{lang === 'ar' ? "جلسة 3 ساعات متواصلة (توفير 10 SAR)" : "3 continuous hours of gameplay"}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gaming-cyan flex-shrink-0" />
                    <span>{lang === 'ar' ? "مشروب طاقة بارد مجاني" : "Free complementary energy beverage"}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gaming-cyan flex-shrink-0" />
                    <span>{lang === 'ar' ? "مثالية لتحديات روكيت ليغ" : "Optimized for high-latency systems"}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setBookingForm({ ...bookingForm, packageId: 'gamer' });
                  handleBookNowClick();
                }}
                className="w-full py-3.5 rounded-xl bg-gaming-blue hover:bg-opacity-90 text-white font-bold text-sm tracking-wider shadow-lg shadow-gaming-blue/20 transition-all duration-300 hover:glow-blue"
              >
                {text.packagesBuy}
              </button>
            </div>

            {/* Tier 3: VIP 12-HR (Extreme Gold Light Border) */}
            <div className="glass-panel p-8 rounded-3xl border border-gaming-gold/40 flex flex-col justify-between transform hover:scale-[1.01] transition-all duration-300 relative group glow-gold">
              <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-gaming-gold text-black text-[11px] font-black tracking-widest uppercase shadow-md">
                {text.packagesPopular}
              </div>
              <div className="absolute -inset-px bg-gradient-to-b from-gaming-gold/20 to-transparent rounded-3xl -z-10 pointer-events-none" />

              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-gaming-gold uppercase block mb-2">VIP ELITE</span>
                <h3 className="text-2xl font-bold text-white mb-4 glow-text-gold">{text.vipTitle}</h3>
                
                {/* Visual price label */}
                <div className="flex items-baseline space-x-2 space-x-reverse mb-6">
                  <span className="text-5xl font-display font-black text-gaming-gold glow-text-gold">99</span>
                  <span className="text-xs text-gaming-gold font-mono">SAR / 12 {text.packagesHours}</span>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {text.vipDesc}
                </p>

                <div className="border-t border-white/5 pt-6 space-y-3.5 mb-8" id="vip-features">
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-gaming-gold flex-shrink-0" />
                    <span className="font-semibold">{lang === 'ar' ? "ماراثون 12 ساعة كاملة (توفير هائل)" : "12-hour continuous extreme access"}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-gaming-gold flex-shrink-0" />
                    <span>{lang === 'ar' ? "حجز مقعد VIP وذراع PlayStation اختياري" : "Premium VIP seat reservation & rental"}</span>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-gaming-gold flex-shrink-0" />
                    <span>{lang === 'ar' ? "قهوة مختصة أو شاي مجاني متكرر" : "Unlimited coffee or high-end tea"}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setBookingForm({ ...bookingForm, packageId: 'vip' });
                  handleBookNowClick();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gaming-gold to-amber-600 hover:opacity-90 text-black font-extrabold text-sm tracking-widest transition-all duration-300 shadow-md shadow-gaming-gold/10"
              >
                {text.packagesBuy}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          6. TESTIMONIALS CAROUSEL
          ========================================== */}
      <section 
        id="reviews-section"
        className="py-24 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-6 relative">
          
          {/* Section Headers */}
          <div className="text-center mb-16 flex flex-col items-center" id="reviews-headers">
            <span className="px-4 py-1 rounded-full border border-gaming-blue/30 bg-gaming-blue/5 text-gaming-cyan text-xs font-mono uppercase tracking-widest mb-4">
              {lang === 'ar' ? "ماذا يقول شركاء النجاح؟" : "VERIFIED RIYADH VOICES"}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-none mb-4">
              {text.testimonialsTitle}
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
              {text.testimonialsSubtitle}
            </p>
          </div>

          {/* Testimonial Active Display Window */}
          <div className="relative min-h-[300px] flex items-center justify-center" id="carousel-viewport">
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeReview}
                initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 30 : -30 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative shadow-2xl relative w-full text-center"
              >
                {/* Massive quote mark indicator */}
                <div className="absolute top-6 left-8 text-7xl font-serif text-slate-800 pointer-events-none select-none select-none">“</div>
                
                {/* Stars Indicator */}
                <div className="flex justify-center mb-6 space-x-1 space-x-reverse" id="review-stars-layout">
                  {[...Array(TESTIMONIALS[activeReview].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gaming-gold text-gaming-gold" />
                  ))}
                </div>

                {/* Main Quote Content */}
                <p className="text-lg md:text-2xl font-serif italic text-gray-200 mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
                  {lang === 'ar' ? TESTIMONIALS[activeReview].ar : TESTIMONIALS[activeReview].en}
                </p>

                {/* Subtitle / Original Translation fallback toggle display */}
                {lang === 'en' && TESTIMONIALS[activeReview].ar !== TESTIMONIALS[activeReview].en && (
                  <p className="text-xs text-slate-500 font-medium mb-6 animate-pulse">
                    Original Review: "{TESTIMONIALS[activeReview].ar}"
                  </p>
                )}
                {lang === 'ar' && TESTIMONIALS[activeReview].ar !== TESTIMONIALS[activeReview].en && (
                  <p className="text-xs text-slate-500 font-medium mb-6">
                    English translation: "{TESTIMONIALS[activeReview].en}"
                  </p>
                )}

                {/* Author Credentials */}
                <div className="flex flex-col items-center">
                  <h4 className="text-white font-bold text-base">{TESTIMONIALS[activeReview].author}</h4>
                  <span className="text-gaming-cyan text-xs font-mono uppercase mt-1">
                    {TESTIMONIALS[activeReview].badge} · {TESTIMONIALS[activeReview].date}
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Manual navigation keys with hover glows */}
            <div className="absolute inset-y-0 -inset-x-4 md:-inset-x-16 flex items-center justify-between pointer-events-none z-15" id="carousel-arrows">
              <button 
                onClick={() => setActiveReview(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-12 h-12 rounded-full glass-panel border border-white/10 text-white flex items-center justify-center hover:bg-gaming-blue hover:text-white transition-all duration-200 pointer-events-auto shadow-md"
                id="carousel-arrow-prev"
              >
                {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
              </button>
              <button 
                onClick={() => setActiveReview(prev => (prev + 1) % TESTIMONIALS.length)}
                className="w-12 h-12 rounded-full glass-panel border border-white/10 text-white flex items-center justify-center hover:bg-gaming-blue hover:text-white transition-all duration-200 pointer-events-auto shadow-md"
                id="carousel-arrow-next"
              >
                {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </button>
            </div>

          </div>

          {/* Carousel dots indices indicator */}
          <div className="flex justify-center mt-6 space-x-1.5 space-x-reverse" id="carousel-indicator-dots">
            {TESTIMONIALS.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveReview(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeReview === idx ? 'w-8 bg-gaming-blue' : 'w-2.5 bg-slate-700/60'}`}
                title={`Review ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          FAQ SECTION
          ========================================== */}
      <section 
        id="faq-section"
        className="py-20 relative bg-gaming-dark/60 border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-mono uppercase tracking-widest mb-4">
              {lang === 'ar' ? "إرشادات النظام" : "SYSTEM GUIDELINES"}
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tight leading-none mb-4">
              {text.faqTitle}
            </h2>
            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
              {text.faqSubtitle}
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-10 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="w-full bg-[#0a0a0f]/80 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-gaming-blue focus:ring-1 focus:ring-gaming-blue/50 transition-all text-sm font-medium"
              placeholder={text.faqSearchPlaceholder}
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              style={{ paddingRight: lang === 'ar' ? '3rem' : '1rem', paddingLeft: lang === 'ar' ? '1rem' : '3rem' }}
            />
            {lang === 'ar' && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    { question: text.faq1Question, answer: text.faq1Answer },
                    { question: text.faq2Question, answer: text.faq2Answer },
                    { question: text.faq3Question, answer: text.faq3Answer },
                  ].map((faq) => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": faq.answer
                    }
                  }))
                })
              }}
            />
            {[
              { question: text.faq1Question, answer: text.faq1Answer },
              { question: text.faq2Question, answer: text.faq2Answer },
              { question: text.faq3Question, answer: text.faq3Answer },
            ].filter(faq => faq.question.toLowerCase().includes(faqSearch.toLowerCase()) || faq.answer.toLowerCase().includes(faqSearch.toLowerCase())).length === 0 ? (
              <div className="text-center py-10 text-gray-500 font-medium">
                {text.faqNoResults}
              </div>
            ) : (
              [
                { question: text.faq1Question, answer: text.faq1Answer },
                { question: text.faq2Question, answer: text.faq2Answer },
                { question: text.faq3Question, answer: text.faq3Answer },
              ].filter(faq => faq.question.toLowerCase().includes(faqSearch.toLowerCase()) || faq.answer.toLowerCase().includes(faqSearch.toLowerCase())).map((faq, idx) => (
                <div 
                  key={idx} 
                  className="glass-panel hover:bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <span className={`font-bold text-lg transition-colors ${activeFaq === idx ? 'text-gaming-blue' : 'text-white'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 flex-shrink-0 mr-4 ${lang === 'ar' ? 'mr-0 ml-4' : 'mr-4 ml-0'} ${activeFaq === idx ? 'rotate-180 bg-gaming-blue border-gaming-blue text-white shadow-lg shadow-gaming-blue/30' : 'text-gray-400'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. STAFF SPOTLIGHT SECTION
          ========================================== */}
      <section 
        id="staff-section"
        className="py-20 relative bg-[#090910] border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Headers */}
          <div className="text-center mb-16 flex flex-col items-center" id="staff-headers">
            <span className="px-4 py-1 rounded-full border border-gaming-cyan/30 bg-gaming-cyan/5 text-gaming-cyan text-xs font-mono uppercase tracking-widest mb-4">
              {lang === 'ar' ? "فريق عمل استثنائي" : "OUR LUMINARIES"}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-none mb-4">
              {text.teamTitle}
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
              {text.teamSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="staff-spotlight-cards">
            
            {/* Staff Card 1: Sandeep */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 text-center relative group overflow-hidden flex flex-col items-center hover:border-gaming-blue/30 transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -inset-px bg-gradient-to-b from-gaming-blue/5 to-transparent rounded-3xl -z-10" />
              
              {/* Profile Ring Glowing Avatar frame */}
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-gaming-blue via-gaming-cyan to-indigo-900 mb-6 flex items-center justify-center shadow-lg relative glow-blue-sm">
                <div className="w-full h-full rounded-full bg-[#0a0a0f] text-white flex items-center justify-center font-bold font-display text-4xl">
                  S
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">Sandeep</h3>
              <span className="text-gaming-cyan text-xs font-mono font-bold tracking-wider uppercase mb-4 block">
                {text.teamSandeepRole}
              </span>
              
              <p className="text-slate-400 text-sm leading-relaxed italic border-t border-white/5 pt-4">
                {text.teamSandeepQuote}
              </p>
            </div>

            {/* Staff Card 2: Atour */}
            <div className="glass-panel p-8 rounded-3xl border border-gaming-cyan/30 text-center relative group overflow-hidden flex flex-col items-center hover:border-gaming-cyan/50 transform hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-gaming-cyan/5">
              <div className="absolute -inset-px bg-gradient-to-b from-gaming-cyan/5 to-transparent rounded-3xl -z-10" />
              
              {/* Profile Ring Glowing Avatar frame */}
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-gaming-cyan via-gaming-blue to-teal-400 mb-6 flex items-center justify-center shadow-lg relative">
                <div className="absolute -inset-1.5 bg-gaming-cyan/20 rounded-full blur-md"></div>
                <div className="w-full h-full rounded-full bg-[#0a0a0f] text-white flex items-center justify-center font-bold font-display text-4xl relative z-10">
                  A
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">Atour</h3>
              <span className="text-gaming-cyan text-xs font-mono font-bold tracking-wider uppercase mb-4 block">
                {text.teamAtourRole}
              </span>
              
              <p className="text-slate-350 text-sm leading-relaxed italic border-t border-white/5 pt-4">
                {text.teamAtourQuote}
              </p>
            </div>

            {/* Staff Card 3: Amin */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 text-center relative group overflow-hidden flex flex-col items-center hover:border-gaming-gold/30 transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -inset-px bg-gradient-to-b from-gaming-gold/5 to-transparent rounded-3xl -z-10" />
              
              {/* Profile Ring Glowing Avatar frame */}
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-gaming-gold via-amber-400 to-yellow-600 mb-6 flex items-center justify-center shadow-lg relative">
                <div className="w-full h-full rounded-full bg-[#0a0a0f] text-white flex items-center justify-center font-bold font-display text-4xl">
                  A
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">Amin</h3>
              <span className="text-gaming-gold text-xs font-mono font-bold tracking-wider uppercase mb-4 block">
                {text.teamAminRole}
              </span>
              
              <p className="text-slate-400 text-sm leading-relaxed italic border-t border-white/5 pt-4">
                {text.teamAminQuote}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          7.5 HEADLINES SECTION
          ========================================== */}
      <IndustryHeadlines lang={lang} />

      {/* ==========================================
          8. GALLERY GRID SECTION
          ========================================== */}
      <section 
        id="gallery-section"
        className="py-24 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Headers */}
          <div className="text-center mb-16 flex flex-col items-center" id="gallery-headers">
            <span className="px-4 py-1 rounded-full border border-gaming-blue/30 bg-gaming-blue/5 text-gaming-cyan text-xs font-mono uppercase tracking-widest mb-4">
              {lang === 'ar' ? "صالاتنا ومرافقنا الفاخرة" : "THE SANCTUARY GRID"}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-none mb-4">
              {text.galleryTitle}
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
              {text.gallerySubtitle}
            </p>
          </div>

          {/* Bento-style Luxury Grid layout of 8 placeholder boxes styled with CSS gradients/ambient glows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="bento-gallery">
            {GALLERY_ITEMS.map((item, idx) => {
              const label = text[item.labelKey];
              const spanClass = idx === 0 || idx === 4 ? 'sm:col-span-2' : '';
              
              return (
                <div 
                  key={item.id}
                  onClick={() => setLightboxItem(item)}
                  className={`h-64 rounded-2xl border ${item.border} bg-gradient-to-b ${item.grad} p-6 relative flex flex-col justify-end overflow-hidden group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 shadow-xl cursor-pointer ${spanClass}`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={item.image} 
                      alt={label} 
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-b ${item.grad}`} />
                  </div>

                  {/* Outer lighting flare */}
                  <div className="absolute top-0 left-0 w-full h-full bg-[#ffff00]/[0.015] pointer-events-none group-hover:bg-[#00ffff]/[0.035] transition-all duration-300 z-10" />
                  
                  {/* Futuristic scope target marks inside corners */}
                  <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-white/20 group-hover:border-gaming-cyan transition-colors z-10" />
                  <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-white/20 group-hover:border-gaming-cyan transition-colors z-10" />
                  <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-white/20 group-hover:border-gaming-cyan transition-colors z-10" />
                  <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-white/20 group-hover:border-gaming-cyan transition-colors z-10" />

                  {/* High-tech scanner line animation */}
                  <div className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gaming-cyan/30 to-transparent top-0 opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-1000 ease-in-out pointer-events-none z-10" />

                  <span className="font-mono text-[10px] text-gaming-cyan tracking-[0.2em] font-bold uppercase mb-1 z-10 relative">
                    [ DX-DECK 0{idx + 1} ]
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-wide z-10 relative">
                    {label}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 relative">
                    LATENCY: 0.1ms · VERIFIED PRO ENVIRONMENT
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==========================================
          9. BOOKING / CTA SECTION (Luxury Booking Form)
          ========================================== */}
      <section 
        id="booking-section"
        className="py-24 bg-gradient-to-b from-[#07070a] to-[#040406] border-t border-white/5 scroll-mt-12 relative"
      >
        <div className="max-w-4xl mx-auto px-6 relative">
          
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gaming-blue/15 rounded-full blur-3xl pointer-events-none" />

          {/* Headers */}
          <div className="text-center mb-12 flex flex-col items-center" id="booking-headers">
            <span className="px-4 py-1 rounded-full border border-gaming-blue/30 bg-gaming-blue/5 text-gaming-cyan text-xs font-mono uppercase tracking-widest mb-4">
              {lang === 'ar' ? "حجز مكاني مسبق" : "GRID RESERVATIONS"}
            </span>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white uppercase tracking-tight leading-none mb-4 glow-text-blue">
              {text.bookTitle}
            </h2>
            <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed">
              {text.bookSubtitle}
            </p>
          </div>

          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative shadow-2xl overflow-hidden" id="booking-widget-box">
            
            <AnimatePresence mode="wait">
              {!bookingSubmitted ? (
                <motion.form 
                  key="booking-form"
                  onSubmit={handleBookingSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="booking-fields-layout">
                    
                    {/* Name Input */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-300 tracking-wider mb-2 flex items-center gap-1.5">
                        {text.bookFormName}
                        <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required 
                          value={bookingForm.name} 
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          className={`w-full bg-[#0a0a0f]/80 border border-white/10 rounded-xl py-3.5 cursor-pointer text-white placeholder-slate-600 focus:outline-none focus:border-gaming-blue transition-colors text-sm font-medium px-5`}
                          placeholder={lang === 'ar' ? "مثال: فيصل الحربي" : "e.g., Faisal Al-Harbi"}
                        />
                      </div>
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-300 tracking-wider mb-2 flex items-center gap-1.5">
                        {text.bookFormPhone}
                        <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="tel" 
                          required
                          value={bookingForm.phone} 
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className={`w-full bg-[#0a0a0f]/80 border border-white/10 rounded-xl py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-gaming-blue transition-colors text-sm font-medium px-5`}
                          placeholder="e.g., +966 50 000 0000"
                        />
                      </div>
                    </div>

                    {/* Date picker */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-300 tracking-wider mb-2 flex items-center gap-1.5">
                        {text.bookFormDate}
                        <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="datetime-local" 
                          required
                          value={bookingForm.dateTime} 
                          onClick={(e) => {
                            if ('showPicker' in HTMLInputElement.prototype) {
                              try {
                                (e.target as HTMLInputElement).showPicker();
                              } catch (err) {}
                            }
                          }}
                          onChange={(e) => setBookingForm({ ...bookingForm, dateTime: e.target.value })}
                          className={`w-full bg-[#0a0a0f]/80 border border-white/10 rounded-xl py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-gaming-blue transition-colors text-sm font-medium px-5`}
                          style={{ colorScheme: 'dark' }}
                        />
                      </div>
                    </div>

                    {/* Package selection dropdown */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-gray-300 tracking-wider mb-2 flex items-center gap-1.5">
                        {text.bookFormPackage}
                      </label>
                      <div className="relative">
                        <select 
                          value={bookingForm.packageId} 
                          onChange={(e) => setBookingForm({ ...bookingForm, packageId: e.target.value })}
                          className={`w-full bg-[#0a0a0f]/80 border border-white/10 rounded-xl py-3.5 text-white focus:outline-none focus:border-gaming-blue transition-colors text-sm font-medium appearance-none px-5`}
                        >
                          <option value="starter">{lang === 'ar' ? "باقة البداية (1 ساعة) - 15 SAR" : "Starter Session (1 Hour) - 15 SAR"}</option>
                          <option value="gamer">{lang === 'ar' ? "باقة النخبة (3 ساعات) - 35 SAR" : "Gamer Setup (3 Hours) - 35 SAR"}</option>
                          <option value="vip">{lang === 'ar' ? "الباقة الأسطورية (12 ساعة) - 99 SAR" : "VIP Legend (12 Hours) - 99 SAR"}</option>
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Submission with laser hover effect */}
                  <div className="pt-4" id="submit-wrapper">
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full relative py-4 bg-gradient-to-r from-gaming-blue to-indigo-700 hover:shadow-2xl hover:shadow-gaming-blue/30 text-white font-extrabold text-sm tracking-widest uppercase rounded-xl transition-all duration-300 transform active:scale-97 flex items-center justify-center gap-2 border border-blue-400/20 shadow-md cursor-pointer"
                    >
                      {submitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          {text.bookFormSubmit}
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 flex flex-col items-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gaming-blue/15 text-gaming-cyan border border-gaming-cyan/30 flex items-center justify-center mb-6 glow-blue">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-3xl font-display font-black text-white mb-4 uppercase">
                    {lang === 'ar' ? "بوابتك مفتوحة" : "ACCESS GRANTED"}
                  </h3>
                  
                  <p className="text-gray-300 max-w-md mx-auto mb-8 text-sm leading-relaxed">
                    {text.bookSuccess}
                  </p>

                  <div className="glass-panel p-6 rounded-2xl border border-white/5 w-full max-w-sm mb-8 text-left text-xs space-y-3 font-mono">
                    <div className="text-gaming-cyan font-bold block mb-2 text-center text-[10px] tracking-[0.25em]">[ SECURE SYSTEM PASS ]</div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-500">GAMER ID:</span>
                      <span className="text-white font-bold font-sans">{bookingForm.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-500">PHONE COORD:</span>
                      <span className="text-white font-sans">{bookingForm.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-500">GRID TIME:</span>
                      <span className="text-white font-sans">{bookingForm.dateTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">SYSTEM TIER:</span>
                      <span className="text-gaming-gold font-bold uppercase">{bookingForm.packageId} PASS</span>
                    </div>
                  </div>

                  <button 
                  onClick={() => setBookingSubmitted(false)}
                  className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-xs text-gray-400 hover:text-white transition-all duration-200"
                  >
                    {lang === 'ar' ? "حجز تذكرة أخرى" : "Draft Another Pass"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* ==========================================
          10. FOOTER
          ========================================== */}
      <footer 
        id="footer-section"
        className="py-16 bg-[#040406] border-t border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12" id="footer-columns">
            
            {/* Logo Column */}
            <div className="lg:col-span-2 space-y-4">
              <span className="font-display font-black text-2xl tracking-widest text-white block">
                دكس فيوز <span className="text-gaming-cyan opacity-80">|</span> DXViews
              </span>
              
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                {lang === 'ar' 
                  ? "كافيه وصالة الألعاب الأرقى في الرياض. أجهزة خارقة، خدمات VIP للأفراد والعائلات، ومناخ آمن نظيف تماماً لممارسة الألعاب باحترافية."
                  : "Riyadh's signature high-end gaming sanctuary. Combining ultimate state-of-the-art PCs with absolute kid safety and luxury VIP amenities."
                }
              </p>

              {/* Verified Badge */}
              <div className="flex items-center space-x-2 space-x-reverse text-xs text-gaming-gold">
                <Award className="w-4 h-4" />
                <span className="font-mono tracking-wider">[ 54,200+ GOOGLE MAPS VIEWS ]</span>
              </div>
            </div>

            {/* Address / Location Coordinate Column */}
            <div className="space-y-4 lg:col-span-1">
              <h4 className="text-xs font-mono font-extrabold text-gaming-cyan tracking-[0.25em] uppercase">
                {lang === 'ar' ? "إحداثيات الصالة" : "LOCATIONS & COORDS"}
              </h4>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=DXViews+Riyadh"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative overflow-hidden rounded-xl border border-white/5 hover:border-gaming-blue/50 transition-colors bg-[#08080c] shadow-lg"
              >
                <div className="h-28 w-full bg-[#11111a] relative">
                  <iframe 
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3623.6391443657784!2d46.738586!3d24.713600!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh!5e0!3m2!1sen!2ssa!4v1714421132800!5m2!1sen!2ssa"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, opacity: 0.7, pointerEvents: 'none' }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-transparent to-transparent"></div>
                  <div className="absolute inset-0 group-hover:bg-gaming-blue/10 transition-colors duration-300"></div>
                </div>
                <div className="p-4 flex items-start space-x-2.5 space-x-reverse text-xs text-gray-400 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 text-gaming-blue flex-shrink-0 group-hover:scale-110 group-hover:text-gaming-cyan transition-all duration-300" />
                  <span className="leading-relaxed">
                    {lang === 'ar' 
                      ? "الرياض، المملكة العربية السعودية. (انقر هنا لفتح الموقع والملاحة)" 
                      : "Riyadh, Kingdom of Saudi Arabia. Click to open navigation."
                    }
                  </span>
                </div>
              </a>
            </div>

            {/* Socials Connection */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-extrabold text-[#f0a500] tracking-[0.25em] uppercase">
                {lang === 'ar' ? "الاتصال بالنظام" : "INTELLIGENCE GRID"}
              </h4>
              
              {/* Links to mock/real snap/insta/twitter coordinates */}
              <div className="flex items-center gap-3">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 bg-[#0c0c14] hover:border-gaming-blue hover:text-gaming-cyan flex items-center justify-center transition"
                  title="DXViews Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 bg-[#0c0c14] hover:border-gaming-blue hover:text-gaming-cyan flex items-center justify-center transition"
                  title="DXViews Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                
                {/* Snapchat Custom SVG icon as required */}
                <a 
                  href="https://snapchat.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/5 bg-[#0c0c14] hover:border-gaming-gold hover:text-gaming-gold flex items-center justify-center transition"
                  title="DXViews Snapchat"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12,2A2.88,2.88,0,0,0,9.15,4.91a4.24,4.24,0,0,0,.08.76c0,.13-.19.26-.43.34A5.46,5.46,0,0,0,7,7.1a5.61,5.61,0,0,0-.31,1.93,2.44,2.44,0,0,0,1,1.94,2,2,0,0,0-.1.2c-.39.73-.78,1.46-1.12,2.21a4.89,4.89,0,0,0,1.52,5.55c1,.76,2.22,1,3.46,1a14.71,14.71,0,0,0,1.83-.11,2,2,0,0,1,.13-.44c-.1-.08-.19-.17-.28-.27a3.47,3.47,0,0,1-.46-.66,4,4,0,0,1,2.07.64,12.26,12.26,0,0,0,3,1c.92.17,1.88.29,2.81-.07A3,3,0,0,0,22,12.4a6.5,6.5,0,0,0-1.29-3.41c-.24-.31-.48-.61-.74-.91V7.91a4.1,4.1,0,0,0-1-2.61,3.4,3.4,0,0,0-2.43-1.07c0-.23,0-.47,0-.7A3.3,3.3,0,0,0,13.62,2H12Z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-4 lg:col-span-1">
              <h4 className="text-xs font-mono font-extrabold text-gaming-blue tracking-[0.25em] uppercase">
                {lang === 'ar' ? "تنبيهات البطولات" : "TOURNAMENT ALERTS"}
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                {lang === 'ar' ? "اشترك لتلقي أحدث التحديثات عن فعاليات الرياضات الإلكترونية المُقامة في دكس فيوز." : "Subscribe for updates on upcoming eSports events hosted at DXViews."}
              </p>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(lang === 'ar' ? "تم التسجيل بنجاح في تنبيهات البطولات!" : "Successfully subscribed to Tournament Alerts!");
                  (e.target as HTMLFormElement).reset();
                }}
                className="flex items-stretch w-full mt-2"
              >
                <input 
                  type="email" 
                  required 
                  placeholder={lang === 'ar' ? "أدخل بريدك الإلكتروني" : "Enter your email"}
                  className="flex-1 bg-[#0c0c14] border border-white/10 rtl:rounded-r-lg rtl:rounded-l-none ltr:rounded-l-lg rounded-l-lg py-2.5 px-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gaming-blue transition-colors"
                  style={lang === 'ar' ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' } : { borderTopRightRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}
                />
                <button 
                  type="submit"
                  className="px-4 bg-gaming-blue border border-gaming-blue hover:bg-blue-600 flex items-center justify-center transition-colors text-white"
                  style={lang === 'ar' ? { borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem', borderTopRightRadius: 0, borderBottomRightRadius: 0 } : { borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  <Send className={`w-3.5 h-3.5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </button>
              </form>
            </div>

          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-4" id="footer-bottom">
            <span>
              {text.footerRights}
            </span>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-slate-600">[ RIYADH, SAUDI ARABIA ]</span>
              <span className="text-gaming-cyan font-bold">● ONLINE GRID v4.1.1</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ==========================================
          LIVE CHAT SUPPORT
          ========================================== */}
      <AnimatePresence>
        {!chatOpen ? (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gaming-blue hover:bg-blue-600 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center justify-center text-white z-50 transition-colors"
          >
            <MessageSquare className="w-8 h-8" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] bg-[#0f0f15] border border-white/10 shadow-2xl rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gaming-blue/10 p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 rounded-full bg-gaming-blue flex items-center justify-center text-white">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{text.chatTitle}</h4>
                  <p className="text-xs text-gaming-blue font-mono">{text.chatSubtitle}</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 h-[300px] overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 ${msg.sender === 'user' ? 'bg-gaming-blue text-white rounded-br-none' : 'bg-white/5 text-gray-200 border border-white/10 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-[#0a0a0f] flex items-center gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={text.chatPlaceholder}
                dir={isRTL ? 'rtl' : 'ltr'}
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-gaming-blue/50"
              />
              <button
                type="submit"
                disabled={!currentMessage.trim()}
                className="w-10 h-10 rounded-full bg-gaming-blue flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                title={text.chatSend || 'Send'}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          GALLERY LIGHTBOX
          ========================================== */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm cursor-pointer"
          >
            {/* Close Button */}
            <button 
              onClick={() => setLightboxItem(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/50 hover:bg-black rounded-full p-2 transition-all z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Immersive View */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-6xl aspect-video rounded-3xl border ${lightboxItem.border} bg-gradient-to-br ${lightboxItem.grad} relative flex flex-col justify-end overflow-hidden shadow-2xl shadow-black cursor-default`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Immersive Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={lightboxItem.image} 
                  alt={text[lightboxItem.labelKey]} 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${lightboxItem.grad} opacity-80`} />
              </div>

              {/* Inner ambient flare */}
              <div className="absolute inset-0 bg-[#00ffff]/[0.02] pointer-events-none z-10" />
              
              {/* Scanner Line */}
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-10" 
              />

              {/* Scope Marks */}
              <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-white/30 z-10" />
              <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-white/30 z-10" />
              <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-white/30 z-10" />
              <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-white/30 z-10" />

              <div className="p-8 sm:p-12 relative z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <span className="font-mono text-sm sm:text-base text-gaming-cyan tracking-[0.3em] font-bold uppercase mb-2 block">
                  [ IMMERSIVE PREVIEW ACTIVE ]
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-white tracking-wider uppercase mb-4 shadow-black drop-shadow-lg">
                  {text[lightboxItem.labelKey]}
                </h3>
                <p className="text-sm sm:text-lg text-slate-300 font-mono tracking-wide max-w-2xl">
                  {lang === 'ar' 
                    ? "اختبر الفخامة والأداء في بيئة خالية من التقطيع ومجهزة بأفضل عتاد للاعبين المحترفين." 
                    : "Experience ultimate luxury and performance in a zero-lag environment equipped with absolute top-tier gear."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
