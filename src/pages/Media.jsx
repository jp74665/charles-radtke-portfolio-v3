import { NavLink } from 'react-router-dom';
import { MEDIA } from '../data/media';

const Media = () => {
  return (
    <div className="w-full pt-32 pb-24 px-6 md:px-12 xl:px-24 min-h-screen">

      {/* Editorial list — divided by horizontal rules */}
      <div className="max-w-4xl mx-auto border-t border-rule">
        {MEDIA.map((item) => (
          <article
            key={item.id}
            className="grid grid-cols-12 gap-6 py-10 border-b border-rule"
          >
            <div className="col-span-12 md:col-span-3">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-textMuted">
                {item.type}
              </span>
              {item.publication && (
                <p className="font-sans text-xs text-textMuted leading-[1.6] mt-2">
                  {item.publication}
                </p>
              )}
            </div>

            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-light text-2xl md:text-3xl text-ink leading-[1.1] mb-3">
                {item.title}
              </h2>

              {item.excerpt && (
                <p className="font-sans text-base text-ink leading-[1.75] mb-6 max-w-2xl">
                  {item.excerpt}
                </p>
              )}

              <div className="flex justify-between items-center">
                <span className="font-sans text-xs uppercase tracking-[0.18em] text-textMuted">
                  {item.date}
                </span>

                {item.type === 'press' && item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-sans text-xs uppercase tracking-[0.18em] text-ink hover:opacity-60 transition-opacity inline-flex items-center gap-2"
                  >
                    Read <span>→</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Press inquiry footer */}
      <div className="max-w-4xl mx-auto mt-32 text-center">
        <div className="border-t border-rule pt-16">
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-textMuted mb-6">
            For press inquiries
          </p>
          <NavLink
            to="/contact"
            state={{ tab: 'press' }}
            className="inline-block border border-ink text-ink px-8 py-3 font-sans text-xs uppercase tracking-[0.18em] hover:bg-ink hover:text-white transition-colors"
          >
            Contact
          </NavLink>
        </div>
      </div>

    </div>
  );
};

export default Media;
