export const COMMISSION_STATUS = 'open'; // 'open' | 'waitlist' | 'closed'

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/charlesradtke_furnituremaker/' },
  { label: 'Facebook', href: 'http://facebook.com/charlesradtkeartist/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/charles-radtke-29706a3/' },
];

const Footer = () => {
  return (
    <footer className="mt-32 pt-16 pb-12 px-6 md:px-12 bg-background text-ink w-full mt-auto border-t border-rule">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="col-span-1" />

        <div className="col-span-1 flex md:justify-end gap-10">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs uppercase tracking-[0.18em] text-textMuted hover:text-ink transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-rule flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-textMuted">
          © {new Date().getFullYear()} Charles Radtke. All rights reserved.
        </p>
        <a href="#" className="font-sans text-xs uppercase tracking-[0.18em] text-textMuted hover:text-ink transition-colors">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
