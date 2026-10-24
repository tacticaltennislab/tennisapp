import React from "react";

/** Device frame for a product visual, with a headline above it. Static on
 * purpose: tilting or scaling text while scrolling made the report blurry
 * and left large empty gaps around it. */
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="container-x">
      <div className="max-w-5xl mx-auto text-center">{titleComponent}</div>
      <div className="mt-10 max-w-5xl mx-auto border border-cream/25 bg-brand-900 p-2 sm:p-4 rounded-2xl shadow-2xl">
        <div className="w-full overflow-hidden rounded-lg">{children}</div>
      </div>
    </div>
  );
};
