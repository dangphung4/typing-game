import { motion } from "framer-motion";

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
    let wpm = Math.floor(total/5)

    const initial = { opacity: 0 };
    const animate = { opacity: 1 };

  return (
    <ul
      className={`flex flex-col items-center text-purple space-y-3 ${className}`}
    >
        <li className="text-xl font semibold">Results</li>
        <li>Accuracy: {accuracyPercentage}%</li>
        <li className="text-red">Errors : {errors}</li>
        <li className="text-xl text-green">WPM: {wpm}</li>
    </ul>
  );
};

export default Results;
