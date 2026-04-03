import type { Metadata } from "next";
import CoursesClient from "@/components/CoursesClient";

export const metadata: Metadata = {
  title:
    "Six Sigma Courses in South Africa | Training & Certification",
  description:
    "Internationally accredited Six Sigma courses in South Africa. White Belt, Yellow Belt, Green Belt, Black Belt certification training available online, virtually, and in the classroom.",
};

export default function CoursesPage() {
  return <CoursesClient />;
}
