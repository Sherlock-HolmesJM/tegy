import { useEffect, useState } from "react";
import { gsap } from "gsap";
import styled from "@emotion/styled";
import { media } from "@/shared/styles";
import { useMobileNav } from "../hooks/useMoileNav";
import { headerClasses } from "../constants";

const classes = {
  menu: "header-menu",
};

export const MenuIcon = () => {
  const { data, mutate } = useMobileNav();

  useMenuToggle(data);

  return (
    <Wrapper onClick={() => mutate(!data)} className={headerClasses.item}>
      <svg
        width="44"
        height="45"
        viewBox="0 0 44 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classes.menu}
      >
        <rect width="44" height="44" transform="translate(0 0.5)" fill="var(--black3)" />
        <line className="line1" x1="6" y1="12.5" x2="38" y2="12.5" stroke="white" strokeWidth="3" />
        <line className="line2" x1="6" y1="22.5" x2="38" y2="22.5" stroke="white" strokeWidth="3" />
        <line className="line3" x1="6" y1="32.5" x2="38" y2="32.5" stroke="white" strokeWidth="3" />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: none;

  ${media.md} {
    overflow: hidden;
    position: relative;
    min-width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
  }

  & > * {
    position: absolute;
  }
`;

// ###### Hooks Below ###########
// ###### Hooks Below ###########

const useMenuToggle = (data?: boolean) => {
  // const { setSelectedDD } = useSelectedHugeDD()
  const tl = useMenuToggleEffect();

  useEffect(() => {
    if (!tl) return;

    if (data) tl.play();
    else tl.reverse();

    // setSelectedDD(undefined)

    // eslint-disable-next-line
  }, [data]);
};

const useMenuToggleEffect = () => {
  const [tl, setTl] = useState<gsap.core.Timeline | undefined>();

  useEffect(() => {
    const line1 = `.${classes.menu} .line1`;
    const line2 = `.${classes.menu} .line2`;
    const line3 = `.${classes.menu} .line3`;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true, defaults: { ease: "back" } });

      timeline
        .to(line2, { scaleX: 0, opacity: 0 })
        .to([line1, line3], { rotate: gsap.utils.wrap([40, -40]) }, 0.1)
        .to([line1, line2, line3], { x: 3 }, 0);

      // timeline
      //   .to(line2, { scaleY: 0 })
      //   .to([line1, line3], { rotate: gsap.utils.wrap([40, -40]) }, 0)

      // timeline
      //   .to(line2, { scaleY: 0 })
      //   .to([line1, line3], { y: gsap.utils.wrap([10, -10]) }, 0)
      //   .to([line1, line3], { rotate: 360 })
      //   .to([line1, line3], {
      //     rotate: gsap.utils.wrap([40, -40]),
      //     transformOrigin: "center center",
      //   })

      setTl(timeline);
    });

    return () => ctx.revert();

    // eslint-disable-next-line
  }, []);

  return tl;
};
