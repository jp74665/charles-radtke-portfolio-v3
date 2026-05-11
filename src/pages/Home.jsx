import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroCabinet from '../assets/hero-cabinet.png';
import aboutMakerPortrait from '../assets/about-maker-portrait.png';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      );

      gsap.fromTo(aboutRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.4, ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      {/* HERO — single static full-bleed image */}
      <section
        ref={heroRef}
        className="relative h-[100dvh] -mt-[80px] pt-[80px] w-full flex items-end justify-center overflow-hidden pb-16 px-6"
      >
        <div className="absolute inset-0 z-0 bg-background">
          <img
            src={heroCabinet}
            alt="Charles Radtke fine furniture studio"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-end h-full">
          <div className="hero-anim">
            <NavLink
              to="/work"
              className="font-sans text-xs uppercase tracking-[0.18em] text-white border-b border-white pb-0.5 hover:opacity-70 transition-opacity"
            >
              View Work
            </NavLink>
          </div>
        </div>
      </section>

      {/* ABOUT TEASE */}
      <section ref={aboutRef} className="relative py-32 px-6 md:px-16 lg:px-24 w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-0 hidden md:flex" aria-hidden="true">
          <div className="w-1/2 bg-paperWarm" />
          <div className="w-1/2 bg-paperCool" />
        </div>
        <div className="absolute inset-0 -z-0 md:hidden bg-paperWarm" aria-hidden="true" />
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col">
          <div className="mb-10">
            <span className="font-sans text-xs uppercase tracking-[0.18em] text-textMuted">
              About the maker
            </span>
            <div className="mt-4 border-b border-rule" />
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-14 lg:gap-16">
            <div className="w-full md:w-[42%] md:max-w-md shrink-0">
              <img
                src={aboutMakerPortrait}
                alt="Charles Radtke in the workshop"
                className="w-full aspect-[3/4] object-cover object-center"
              />
            </div>

            <div className="flex-1 min-w-0 flex flex-col">
              <blockquote className="font-display font-light text-3xl md:text-4xl leading-[1.1] text-terracotta mb-12">
                I begin with the intent to make something of lasting integrity — a cabinet holds things, like secrets.
              </blockquote>

              <p className="font-sans text-base text-ink leading-[1.75] mb-12 max-w-xl">
                Working directly from design concept to execution without making sketches, the journey of building embraces the unknown of the finished work. Pieces are meant to outlive us, crafted patiently with self-harvested lumber to assure their second life is as noble as their first.
              </p>

              <div>
                <NavLink
                  to="/about"
                  className="font-sans text-xs uppercase tracking-[0.18em] text-ink hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                >
                  About Charles <span>→</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
