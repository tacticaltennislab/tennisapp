"use client";

import { motion, MotionConfig, type HTMLMotionProps } from "framer-motion";

/**
 * Glass surfaces rise into place once as they enter the viewport: opacity 0 to
 * 1, 24px up, 8px of blur clearing. Siblings stagger through `delay` (about
 * 80ms apart). With reduced motion it is a plain fade.
 */
export default function GlassReveal({
  delay = 0,
  children,
  className = "",
  ...rest
}: { delay?: number; children: React.ReactNode } & Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "transition">) {
  // reducedMotion="user" drops the 24px rise; the blur is cleared in CSS (.glass-reveal),
  // so what remains is a short opacity fade. The initial state is the same on the server
  // and the client, so hydration always matches.
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        {...rest}
        className={`glass-reveal ${className}`}
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
