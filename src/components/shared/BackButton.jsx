"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const BackButton = ({ href }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => href ? router.push(href) : router.back()}
      variant="ghost"
      className="w-fit border border-primary/20 hover:bg-primary/60 hover:text-purple-400"
    >
      <ArrowLeft className="w-4 h-4" />
      Volver
    </Button>
  );
};
