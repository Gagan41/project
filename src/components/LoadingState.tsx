import { motion } from "framer-motion";

export default function LoadingState() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 p-6 rounded-xl shadow-lg text-white text-center"
      >
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold mb-2">Verifying Access</h3>
        <p className="text-gray-400">
          Please wait while we check your payment status...
        </p>
      </motion.div>
    </div>
  );
}
