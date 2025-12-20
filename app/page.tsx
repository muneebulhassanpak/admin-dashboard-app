import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Home",
  description: "AI Tutor Admin Portal - Comprehensive management dashboard for your AI-powered educational platform.",
};

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}