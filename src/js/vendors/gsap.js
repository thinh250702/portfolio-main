import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins once
gsap.registerPlugin(
  ScrollTrigger, SplitText
);

export {
  gsap,
  ScrollTrigger, SplitText
};