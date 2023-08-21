import { motion } from "framer-motion";
import { formatPercentage } from "../ultils/helpers";

const Results = ({
  errors,
  accuracyPercentage,
  total,
  className = "",
}: {
  errors: number;
  accuracyPercentage: number;
  total: number;
  className?: string;
}) => {
  let wpm = Math.floor(total / 5);

  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  return (
    <motion.ul
      className={`flex flex-col items-center text-purple space-y-3 ${className}`}
    >
      <motion.li
        initial= {initial}
        animate= {animate}
        className="text-xl font semibold"
        transition={{...duration, delay: 0 }}
       >Results</motion.li>
      <motion.li
        initial= {initial}
        animate= {animate}
        transition={{...duration, delay: 0.5 }}
      >Accuracy: {formatPercentage(accuracyPercentage)}</motion.li>
      <motion.li
        initial= {initial}
        animate= {animate}
        transition={{...duration, delay: 1 }}
        className="text-red">Errors : {errors}</motion.li>
      <motion.li
        initial= {initial}
        animate= {animate}
        transition={{...duration, delay: 1.5 }}
        className="text-xl text-green">WPM: {wpm}</motion.li>
    </motion.ul>
  );
};

export default Results;
