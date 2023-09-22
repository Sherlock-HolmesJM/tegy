import { useEffect } from "react";
import { gsap } from "gsap";
import { AnimationMedia } from "@/shared/styles";

const useClassToggleOnScroll = () => {
  useEffect(() => {
    const header = document.querySelector(".finna-header-element");
    const scrollerTarget = document.querySelector("#header-scroll-toggle-threshod");

    const media = AnimationMedia;

    if (!header || !scrollerTarget) return;

    const mm = gsap.matchMedia();

    mm.add({ lg: media.lg_only, md: media.md_only, sm: media.sm_only }, (ctx) => {
      const { lg, md } = ctx.conditions ?? {
        lg: false,
        md: false,
        sm: false,
      };

      gsap.to(scrollerTarget, {
        scrollTrigger: {
          trigger: scrollerTarget,
          start: "top 80px",
          onEnter: () => header.classList.add("page-scrolled"),
          onLeaveBack: () => header.classList.remove("page-scrolled"),
          markers: false,
        },
      });
    });

    return () => mm.revert();
  }, []);
};
