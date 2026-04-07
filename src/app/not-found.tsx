import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-green-900 text-white pt-[80px] min-h-[calc(100vh-80px)] flex items-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,.55) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(22,178,74,.32), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 container-wide py-24 text-center">
        <Eyebrow tone="white" className="mb-6 mx-auto">
          Error 404
        </Eyebrow>
        <div className="text-[clamp(120px,18vw,260px)] font-extrabold leading-[0.85] tracking-[-0.04em] text-white/15 mb-2">
          404
        </div>
        <h1 className="!text-white mb-6">Page not found</h1>
        <p className="mx-auto max-w-xl text-[19px] text-white/80 leading-[1.65] mb-12">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          Try one of the links below — or get in touch and we&rsquo;ll point
          you in the right direction.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/courses" variant="white" size="large" trailingArrow>
            Browse courses
          </Button>
          <Button href="/" variant="ghost" size="large">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
