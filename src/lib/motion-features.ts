import { domAnimation } from "motion/react";

// Loaded after the page is interactive, so the animation engine stays out of
// the first-load bundle. domAnimation covers everything the site uses:
// animate, variants, exit, whileInView and whileTap.
export default domAnimation;
