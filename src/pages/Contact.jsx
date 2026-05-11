import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

const FloatingInput = ({ label, type = 'text', textarea = false }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  const isActive = focused || value.length > 0;

  return (
    <div className="relative w-full mb-8 pt-4">
      <label
        className={`absolute left-0 transition-all duration-300 pointer-events-none font-sans ${
          isActive
            ? 'top-0 text-[10px] uppercase tracking-[0.2em] text-ink'
            : 'top-4 text-sm text-textMuted'
        }`}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          className="w-full bg-transparent border-b border-rule focus:border-ink outline-none py-2 text-ink font-sans resize-y min-h-[100px] transition-colors"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          required
        />
      ) : (
        <input
          type={type}
          className="w-full bg-transparent border-b border-rule focus:border-ink outline-none py-2 text-ink font-sans transition-colors"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          required
        />
      )}
    </div>
  );
};

const SubmitButton = ({ children }) => (
  <button
    type="submit"
    className="w-full mt-8 border border-ink text-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-white transition-colors"
  >
    {children}
  </button>
);

const Contact = () => {
  const location = useLocation();
  const initialTab = location.state?.tab === 'commission' ? 'commission' : 'commission';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [submitted, setSubmitted] = useState(false);

  const formContainerRef = useRef(null);
  const submitRef = useRef(null);

  const tabs = [
    { id: 'commission', label: 'Commission' },
    { id: 'institutions', label: 'Institutions' },
    { id: 'press', label: 'Press' },
    { id: 'general', label: 'General' },
    { id: 'newsletter', label: 'Newsletter' }
  ];

  useEffect(() => {
    if (!formContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(formContainerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, [activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Form submitted for: ${activeTab}`);

    const ctx = gsap.context(() => {
      gsap.to(formContainerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        onComplete: () => {
          setSubmitted(true);
          gsap.fromTo(submitRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6 }
          );
        }
      });
    });
  };

  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 xl:px-24 min-h-screen flex flex-col items-center">

      <div className="w-full max-w-2xl">

        {/* Tabs — flat, underline-on-active */}
        {!submitted && (
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 border-b border-rule mb-16 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 font-sans text-xs uppercase tracking-[0.18em] transition-colors ${
                  activeTab === tab.id
                    ? 'text-ink border-b-2 border-ink -mb-px'
                    : 'text-textMuted hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="relative min-h-[400px]">

          {submitted ? (
            <div ref={submitRef} className="absolute inset-0 flex items-center justify-center text-center">
              <h2 className="font-display font-light text-3xl md:text-4xl text-ink leading-[1.1]">
                Thank you. I'll be in touch.
              </h2>
            </div>
          ) : (
            <form ref={formContainerRef} onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">

              {activeTab === 'commission' && (
                <>
                  <FloatingInput label="Name" />
                  <FloatingInput label="Email" type="email" />
                  <FloatingInput label="Type of piece in mind" />
                  <FloatingInput label="Approximate timeline" />
                  <FloatingInput label="Tell me about the space it's going into" textarea />
                  <FloatingInput label="How did you find Charles? (Optional)" />
                  <SubmitButton>Send Inquiry</SubmitButton>
                </>
              )}

              {activeTab === 'institutions' && (
                <>
                  <FloatingInput label="Institution Name" />
                  <FloatingInput label="Contact Name" />
                  <FloatingInput label="Email" type="email" />
                  <FloatingInput label="Nature of inquiry (exhibition, acquisition, etc.)" textarea />
                  <SubmitButton>Send</SubmitButton>
                </>
              )}

              {activeTab === 'press' && (
                <>
                  <FloatingInput label="Publication or Outlet" />
                  <FloatingInput label="Contact Name" />
                  <FloatingInput label="Email" type="email" />
                  <FloatingInput label="Deadline (Optional)" type="date" />
                  <FloatingInput label="Details" textarea />
                  <SubmitButton>Send</SubmitButton>
                </>
              )}

              {activeTab === 'general' && (
                <>
                  <FloatingInput label="Name" />
                  <FloatingInput label="Email" type="email" />
                  <FloatingInput label="Message" textarea />
                  <SubmitButton>Send</SubmitButton>
                </>
              )}

              {activeTab === 'newsletter' && (
                <>
                  <FloatingInput label="Name" />
                  <FloatingInput label="Email" type="email" />
                  <SubmitButton>Subscribe</SubmitButton>
                </>
              )}

            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default Contact;
