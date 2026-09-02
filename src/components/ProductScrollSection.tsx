"use client";

import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export default function ProductScrollSection() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
              See it in action
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-ink mt-2">
              Your plan, built in seconds,
              <br />
              not guessed at.
            </h2>
          </>
        }
      >
        <Image
          src="/product-preview.png"
          alt="A generated weekly tennis training plan showing session drills and tips"
          height={630}
          width={1568}
          className="mx-auto rounded-2xl object-contain h-full w-full"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
