import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portrait from '../assets/portrait-new.png';
import videoPoster from '../assets/video-poster.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const bioRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(bioRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 75%'
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-ivory pb-32 pt-32">

      {/* BIO */}
      <section className="px-6 w-full max-w-3xl mx-auto mb-24">
        <div ref={bioRef} className="font-sans text-base text-ink leading-[1.75]">
          <img
            src={portrait}
            alt="Charles Radtke"
            className="float-right ml-10 mb-6 w-64 md:w-80 h-auto rounded-none"
          />
          <p className="mb-8">
            When I set out to create a piece of furniture, I begin with the intent to make something of lasting integrity. I work directly from design concept to execution, without making sketches — part of the journey of building is the unknown of the finished work.
          </p>
          <p className="mb-8">
            I consider myself primarily a cabinetmaker. The cabinet is not merely a box to store things; it is a structure built to hold intention. A cabinet holds things, like secrets. The architecture of a piece must honor the materials used, acknowledging that what I cut into boards was once a living system.
          </p>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="px-6 w-full max-w-4xl mx-auto py-16 text-center clear-both">
        <blockquote className="font-display font-light text-4xl md:text-5xl leading-[1.1] text-terracotta">
          In the darkness of the interior, a piece asserts its true purpose.
        </blockquote>
      </section>

      <section className="px-6 w-full max-w-3xl mx-auto mb-24">
        <div className="font-sans text-base text-ink leading-[1.75]">
          <p className="mb-8">
            Over the years I have had the opportunity to harvest much of the lumber I use. It is a humbling process to watch as these large trees, which have stood for hundreds of years, finally die and become lumber. I strive to assure their second life in a piece of furniture is as noble as their first.
          </p>
          <p>
            To build for the ages means rejecting the ease of modern construction. It means using dense, heavy, difficult woods like ebony or centuries-old mahogany. It means embracing the shadows in the design — corners that absorb light and dimensions that create a sense of monumental silence.
          </p>
        </div>
      </section>

      {/* VIDEO */}
      <section className="px-6 w-full max-w-3xl mx-auto mb-32">
        <div className="relative w-full aspect-video overflow-hidden bg-ink">
          {videoPlaying ? (
            <iframe
              src="https://player.vimeo.com/video/1191249013?autoplay=1&title=0&byline=0&portrait=0"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Charles Radtke studio"
            />
          ) : (
            <button
              type="button"
              onClick={() => setVideoPlaying(true)}
              className="absolute inset-0 w-full h-full group cursor-pointer"
              aria-label="Play video"
            >
              <img
                src={videoPoster}
                alt="Charles Radtke in the studio"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-20 h-20 border border-white text-white transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor" aria-hidden="true">
                    <path d="M0 0 L20 11 L0 22 Z" />
                  </svg>
                </span>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* COMMISSION INVITATION */}
      <section className="px-6 w-full max-w-3xl mx-auto text-center">
        <h2 className="font-display font-light text-2xl md:text-3xl text-ink mb-8 leading-[1.2]">
          Every piece begins with a conversation.
        </h2>
        <NavLink
          to="/contact"
          state={{ tab: 'commission' }}
          className="inline-block border border-ink text-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-white transition-colors"
        >
          Start a Commission
        </NavLink>
      </section>
    </div>
  );
};

export default About;
