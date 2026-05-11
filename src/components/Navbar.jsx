import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const linkBase = 'font-sans text-xs uppercase tracking-[0.18em] transition-colors';

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
          isTransparent
            ? 'bg-transparent border-b border-transparent'
            : scrolled
              ? 'bg-background border-b border-rule'
              : 'bg-background border-b border-transparent'
        }`}
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 md:px-12 py-5">
          <NavLink
            to="/"
            className={`text-2xl font-garamond font-bold tracking-tight ${
              isTransparent ? 'text-white' : 'text-ink'
            }`}
          >
            Charles Radtke
          </NavLink>

          <nav className="hidden md:flex items-center gap-10">
            {['work', 'about', 'media'].map((path) => (
              <NavLink
                key={path}
                to={`/${path}`}
                className={({ isActive }) =>
                  `${linkBase} ${
                    isTransparent
                      ? `text-white/70 hover:text-white ${isActive ? 'text-white' : ''}`
                      : `text-textMuted hover:text-ink ${isActive ? 'text-ink' : ''}`
                  }`
                }
              >
                {path}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <NavLink
              to="/contact"
              state={{ tab: 'commission' }}
              className={`border px-5 py-2 font-sans text-xs uppercase tracking-[0.18em] transition-colors ${
                isTransparent
                  ? 'border-white text-white hover:bg-white hover:text-ink'
                  : 'border-ink text-ink hover:bg-ink hover:text-white'
              }`}
            >
              Contact
            </NavLink>
          </div>

          <button
            className={`md:hidden transition-colors ${
              isTransparent ? 'text-white' : 'text-ink'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-background flex flex-col items-center justify-center pt-24 pb-12 px-6 pointer-events-auto">
          <nav className="flex flex-col items-center gap-10 mb-16">
            <NavLink to="/work" className="font-display font-light text-5xl text-ink">Work</NavLink>
            <NavLink to="/about" className="font-display font-light text-5xl text-ink">About</NavLink>
            <NavLink to="/media" className="font-display font-light text-5xl text-ink">Media</NavLink>
          </nav>
          <NavLink
            to="/contact"
            state={{ tab: 'commission' }}
            className="border border-ink text-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-white transition-colors"
          >
            Contact
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Navbar;
