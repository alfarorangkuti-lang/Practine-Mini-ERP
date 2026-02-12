import { motion, AnimatePresence } from "framer-motion";

export default function Spinner({ show = false, text = "Loading..." }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-4 px-8 py-6 rounded-3xl bg-white/80 shadow-2xl border border-white/40"
          >
            {/* Spinner */}
            <div className="relative w-14 h-14">
              <span className="absolute inset-0 rounded-full border-4 border-slate-200"></span>
              <span className="absolute inset-0 rounded-full border-4 border-black border-t-transparent text-black animate-spin"></span>
            </div>

            {/* Text */}
            <p className="text-sm font-medium text-slate-700 tracking-tight">
              {text}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
