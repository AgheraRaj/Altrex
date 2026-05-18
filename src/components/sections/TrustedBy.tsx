import LogoLoop from "../LogoLoop";

const techLogos = [
  {
    node: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        alt="React"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "React",
    href: "https://react.dev",
  },

  {
    node: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
        alt="Next.js"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "Next.js",
    href: "https://nextjs.org",
  },

  {
    node: (
      <img
        src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"
        alt="TypeScript"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },

  {
    node: (
      <img
        src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg"
        alt="Tailwind CSS"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },

  {
    node: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
        alt="Figma"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "Figma",
    href: "https://figma.com",
  },

  {
    node: (
      <img
        src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg"
        alt="Docker"
        className="h-14 w-auto object-contain"
      />
    ),
    title: "Docker",
    href: "https://docker.com",
  },
];

const TrustedBy = () => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-600">
            Trusted Infrastructure
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Modern Technology Teams
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Powering scalable realtime applications,
            distributed systems, and next-generation
            infrastructure across modern platforms.
          </p>
        </div>

        {/* Logo Loop */}
        <div className="relative mt-16 overflow-hidden">
          {/* Left Gradient */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />

          {/* Right Gradient */}
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />

          <div className="will-change-transform [transform:translate3d(0,0,0)]">
            <LogoLoop
              logos={techLogos}
              speed={80}
              direction="left"
              logoHeight={60}
              gap={100}
              hoverSpeed={0}
              scaleOnHover={false}
              fadeOut={false}
              ariaLabel="Technology partners"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
