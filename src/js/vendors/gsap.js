import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Observer } from "gsap/Observer";

// Register plugins once
gsap.registerPlugin(
  ScrollTrigger, SplitText, ScrollSmoother, Observer
);

export {
  gsap,
  ScrollTrigger, SplitText, ScrollSmoother, Observer
};