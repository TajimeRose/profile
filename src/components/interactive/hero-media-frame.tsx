import Image from "next/image";
import type { ReactNode } from "react";

type HeroMediaFrameProps = {
  isReady?: boolean;
  children?: ReactNode;
  control: ReactNode;
};

export function HeroMediaFrame({ isReady = false, children, control }: HeroMediaFrameProps) {
  return (
    <figure className="hero-media-surface relative size-full overflow-hidden bg-smoke-900">
      <picture
        className={`absolute inset-0 block transition-opacity duration-500 ${isReady ? "opacity-0" : "opacity-100"}`}
      >
        <source
          media="(max-width: 767px)"
          srcSet="/media/hero/tajimerose-hero-mobile.webp"
        />
        <Image
          src="/media/hero/tajimerose-hero.webp"
          alt="Wongsathon Witthayakhom in a graphic studio portrait."
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </picture>

      {children}

      <div className="hero-media-control absolute top-[6.5rem] right-4 z-20 sm:top-[7.25rem] sm:right-8 lg:top-[7.75rem] lg:right-12">
        {control}
      </div>

    </figure>
  );
}
