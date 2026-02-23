import { cn } from '../../utils/cn';

interface CategoryCardProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  href?: string;
  className?: string;
}

export function CategoryCard({ image, imageAlt, title, subtitle, href, className }: CategoryCardProps) {
  const content = (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg bg-[var(--bps-gray-100)]',
        'border border-[var(--bps-gray-200)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-200 cursor-pointer',
        className,
      )}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-white font-bold text-base leading-tight drop-shadow">{title}</h3>
        {subtitle && <p className="text-white/80 text-xs mt-0.5">{subtitle}</p>}
        <span className="inline-block mt-1.5 text-[var(--bps-gold)] text-xs font-semibold uppercase tracking-wide group-hover:underline">
          Shop Now →
        </span>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block no-underline">{content}</a>;
  }
  return content;
}
