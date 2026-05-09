"use client";
import { motion, DynamicAnimationOptions } from "framer-motion";
import React from "react";

interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
  as?: string;
  customVariants?: any;
  animationNum?: number;
  timelineRef?: React.RefObject<any>;
}

export const TimelineContent = ({
  children,
  className,
  as = "div",
  customVariants,
  animationNum = 0,
  timelineRef,
}: TimelineContentProps) => {
  const Component = (motion as any)[as] || motion.div;
  
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, root: timelineRef, margin: "-50px" }}
      variants={customVariants}
      custom={animationNum}
    >
      {children}
    </Component>
  );
};
