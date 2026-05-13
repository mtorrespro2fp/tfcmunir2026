"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import chatgptLogo from "../../../public/pngimg.com-chatgpt_PNG2-1.webp";
import claudeLogo from "../../../public/Claude_AI_logo.svg.webp";
import n8nLogo from "../../../public/N8n-logo-new.svg";
import geminiLogo from "../../../public/Google_Gemini_logo_2025.svg.webp";
import antigravityLogo from "../../../public/Google_Antigravity_Logo.webp";
import githubLogo from "../../../public/6477657755c46a6f4965855f_github_large.webp";
import pro2fpLogo from "../../../public/logo pro2fp.webp";
import madridLogo from "../../../public/logo-comunidad-madrid-e1562021779235.webp";
import odsLogo from "../../../public/ods 2030.webp";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Logo {
  id: string;
  description: string;
  image: string;
  href: string;
  className?: string;
}

interface Logos3Props {
  heading?: string;
  logos?: Logo[];
  className?: string;
}

const Logos3 = ({
  heading = "Tecnologías y entidades que impulsan NeoFlow",
  logos = [
    {
      id: "logo-chatgpt",
      description: "ChatGPT",
      image: chatgptLogo,
      href: "https://chatgpt.com/",
      className: "h-10 w-auto object-contain filter brightness-0 invert opacity-100 md:opacity-60 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
    {
      id: "logo-claude",
      description: "Claude AI",
      image: claudeLogo,
      href: "https://claude.ai/",
      className: "h-9 w-auto object-contain filter brightness-0 invert opacity-100 md:opacity-60 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
    {
      id: "logo-n8n",
      description: "n8n",
      image: n8nLogo,
      href: "https://n8n.io/",
      className: "h-9 w-auto object-contain filter brightness-0 invert opacity-100 md:opacity-60 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
    {
      id: "logo-gemini",
      description: "Google Gemini",
      image: geminiLogo,
      href: "https://gemini.google.com/",
      className: "h-9 w-auto object-contain filter brightness-0 invert opacity-100 md:opacity-60 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
    {
      id: "logo-antigravity",
      description: "Google Antigravity",
      image: antigravityLogo,
      href: "https://antigravity.google/",
      className: "h-10 w-auto object-contain filter brightness-0 invert opacity-100 md:opacity-60 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
    {
      id: "logo-github",
      description: "GitHub",
      image: githubLogo,
      href: "https://github.com/",
      className: "h-10 w-auto object-contain filter brightness-0 invert opacity-100 md:opacity-60 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
    {
      id: "logo-pro2fp",
      description: "Pro2FP",
      image: pro2fpLogo,
      href: "https://pro2fp.es/",
      className: "h-10 w-auto object-contain mix-blend-screen opacity-100 md:opacity-80 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
    {
      id: "logo-madrid",
      description: "Comunidad de Madrid",
      image: madridLogo,
      href: "https://www.comunidad.madrid/",
      className: "h-10 w-auto object-contain filter brightness-0 invert opacity-100 md:opacity-60 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
    {
      id: "logo-ods",
      description: "ODS 2030",
      image: odsLogo,
      href: "https://ods.uam.es/agenda-2030-y-ods/",
      className: "h-10 w-auto object-contain filter brightness-0 invert opacity-100 md:opacity-60 md:hover:opacity-100 transition-all drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] md:hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]",
    },
  ],
  className
}: Logos3Props) => {
  return (
    <section className={`py-6 md:py-10 relative overflow-hidden bg-transparent z-20 ${className || ''}`}>
      <div className="container px-4 flex flex-col items-center text-center">
        <h2 className="mb-8 md:mb-12 font-display font-extrabold text-xl md:text-3xl lg:text-4xl tracking-tight text-brand-fg uppercase">
          TECNOLOGÍAS e identidades QUE <span className="text-brand-primary">IMPULSAN</span> NEOFLOW
        </h2>
      </div>
      <div className="pt-2 md:pt-4">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-[1200px] w-full">
          <Carousel
            opts={{ loop: true, dragFree: true, watchDrag: false }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: false })]}
            className="w-full"
          >
            <CarouselContent className="ml-0 flex items-center">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex-[0_0_auto] flex justify-center pl-0"
                >
                  <a 
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-8 md:mx-12 flex shrink-0 items-center justify-center cursor-pointer"
                  >
                    <img
                      src={logo.image}
                      alt={logo.description}
                      className={logo.className}
                    />
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {/* Gradients for smooth fade in/out on the sides */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
