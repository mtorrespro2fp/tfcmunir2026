"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import chatgptLogo from "../../../public/pngimg.com-chatgpt_PNG2-1.png";
import claudeLogo from "../../../public/Claude_AI_logo.svg.png";
import n8nLogo from "../../../public/N8n-logo-new.svg";
import geminiLogo from "../../../public/Google_Gemini_logo_2025.svg.png";
import githubLogo from "../../../public/6477657755c46a6f4965855f_github_large.png";
import pro2fpLogo from "../../../public/logo pro2fp.png";
import madridLogo from "../../../public/logo-comunidad-madrid-e1562021779235.png";
import odsLogo from "../../../public/ods 2030.png";

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
      className: "h-12 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "logo-claude",
      description: "Claude AI",
      image: claudeLogo,
      href: "https://claude.ai/",
      className: "h-10 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "logo-n8n",
      description: "n8n",
      image: n8nLogo,
      href: "https://n8n.io/",
      className: "h-10 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "logo-gemini",
      description: "Google Gemini",
      image: geminiLogo,
      href: "https://gemini.google.com/",
      className: "h-10 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "logo-github",
      description: "GitHub",
      image: githubLogo,
      href: "https://github.com/",
      className: "h-12 w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all",
    },
    {
      id: "logo-pro2fp",
      description: "Pro2FP",
      image: pro2fpLogo,
      href: "https://pro2fp.es/",
      className: "h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-all",
    },
    {
      id: "logo-madrid",
      description: "Comunidad de Madrid",
      image: madridLogo,
      href: "https://www.comunidad.madrid/",
      className: "h-12 w-auto object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-all",
    },
    {
      id: "logo-ods",
      description: "ODS 2030",
      image: odsLogo,
      href: "https://ods.uam.es/agenda-2030-y-ods/",
      className: "h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-all rounded-sm filter grayscale hover:grayscale-0",
    },
  ],
  className
}: Logos3Props) => {
  return (
    <section className={`py-6 md:py-10 relative overflow-hidden bg-brand-bg z-20 ${className || ''}`}>
      <div className="container flex flex-col items-center text-center">
        <h2 className="mb-6 font-mono text-sm tracking-widest text-brand-primary uppercase">
          {heading}
        </h2>
      </div>
      <div className="pt-2 md:pt-4">
        <div className="relative mx-auto flex items-center justify-center lg:max-w-[1200px] w-full">
          <Carousel
            opts={{ loop: true, dragFree: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 1.5, stopOnInteraction: false, stopOnMouseEnter: false })]}
            className="w-full"
          >
            <CarouselContent className="ml-0 flex items-center">
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <a 
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-6 flex shrink-0 items-center justify-center cursor-pointer"
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
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export { Logos3 };
