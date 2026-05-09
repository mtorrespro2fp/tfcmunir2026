"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.95, 1] : [1.05, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], isMobile ? [10, 0] : [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -30] : [0, -100]);

  return (
    <div
      className="h-[42rem] md:h-[55rem] flex flex-col items-center justify-center relative p-2 md:p-20 mt-10 md:mt-0"
      ref={containerRef}
    >
      <div className="py-10 md:py-16 w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) => (
  <motion.div style={{ translateY: translate }} className="max-w-5xl mx-auto text-center px-4">
    {titleComponent}
  </motion.div>
);

export const Card = ({
  rotate, scale, children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow:
        "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
    }}
    className="max-w-5xl md:-mt-12 mt-10 mx-auto h-[28rem] md:h-[40rem] w-full border-2 md:border-4 border-primary/30 p-2 md:p-6 bg-card rounded-[20px] md:rounded-[30px] shadow-2xl relative z-10"
  >
    <div className="h-full w-full overflow-hidden rounded-2xl bg-background md:rounded-2xl md:p-2">
      {children}
    </div>
  </motion.div>
);
