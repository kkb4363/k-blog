import { motion } from "framer-motion";

export default function Container({ children, ...rest }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.5 }}
      variants={pageEffect}
      {...rest}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

const pageEffect = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};
