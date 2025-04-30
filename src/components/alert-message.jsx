import { motion, AnimatePresence } from "framer-motion";

const alertVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

export const Alert = ({ message, type = "success", onClose }) => {
  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={alertVariants}
          transition={{ duration: 0.4 }}
          className={`${bgColor} text-white px-6 py-3 rounded shadow-md fixed top-5 right-5 z-50`}
        >
          <div className="flex justify-between items-center gap-4">
            <span>{message}</span>
            <button onClick={onClose} className="text-white font-bold">
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
