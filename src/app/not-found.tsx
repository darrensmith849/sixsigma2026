import Link from "next/link";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="pt-[80px]">
      <div className="container py-24 md:py-32 text-center">
        <p className="text-green font-semibold text-[20px] mb-4">404</p>
        <h1 className="mb-6">Page not found</h1>
        <p className="text-body text-[21px] leading-relaxed max-w-[600px] mx-auto mb-10">
          The page you are looking for doesn&rsquo;t exist or has moved. Try one
          of the links below, or{" "}
          <Link href="/contact">get in touch</Link> and we&rsquo;ll point you in
          the right direction.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button href="/courses" variant="filled" size="large">
            View our courses
          </Button>
          <Button href="/" variant="outline" size="large">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
