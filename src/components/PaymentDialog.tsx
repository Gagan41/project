"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Check, Zap } from "lucide-react";
import Script from "next/script";
import {
  createPaymentOrder,
  verifyPayment,
  type RazorpayResponseType,
} from "@/app/api/razorpay/actions";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useState } from "react";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  buttonText: string;
  isPopular?: boolean;
  plan: "one-time";
  onPurchase: (plan: "one-time") => Promise<void>;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  buttonText,
  isPopular = false,
  plan,
  onPurchase,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
      <div
        className={`relative p-8 rounded-xl border ${
          isPopular
            ? "border-gray-800 bg-gray-900/80 backdrop-blur-xl"
            : "border-gray-700/50 bg-gray-900/80 backdrop-blur-xl"
        }`}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg shadow-gray-900/25">
              Most Popular
            </span>
          </div>
        )}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-400 text-lg">{description}</p>
          <div className="text-4xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            {price}
          </div>
          <button
            onClick={() => onPurchase(plan)}
            className="w-full px-8 py-4 bg-white text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25"
          >
            <span className="flex items-center justify-center gap-2">
              {buttonText}
              <Zap className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const PaymentDialog: React.FC = () => {
  const router = useRouter();
  const { user, token } = useContext(AuthContext);

  const handlePurchase = async (plan: "one-time") => {
    if (!user || !token) {
      toast.error("Please login to purchase a plan");
      router.push("/login-portal");
      return;
    }

    try {
      const paymentData = await createPaymentOrder(plan, token);

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: "INR",
        name: "CourseSite",
        description: `${plan} Plan`,
        order_id: paymentData.orderId,
        handler: async function (response: RazorpayResponseType) {
          try {
            const success = await verifyPayment(
              paymentData.paymentId,
              response
            );
            if (success) {
              toast.success("Payment successful!");
              router.push("/course-info");
            } else {
              toast.error("Payment verification failed");
            }
          } catch {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#10B981",
          backdrop_color: "#ECFDF5",
        },
      };

      // @ts-expect-error Razorpay types
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Failed to initiate payment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="relative max-w-5xl w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(75,85,99,0.1),transparent_50%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gray-800/10 blur-3xl" />
        </div>

        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl p-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.push("/")}
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="text-lg">Back to Home</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-300">
              Select the plan that best fits your needs
            </p>
          </motion.div>

          {/* Single Plan Centered */}
          <div className="flex justify-center">
            <PricingCard
              title="Course Only Purchase"
              description="Pay once and access the course forever."
              price="₹9,733"
              buttonText="Get Started"
              plan="one-time"
              onPurchase={handlePurchase}
            />
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-gray-400" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-gray-400" />
                <span>Instant Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export const FloatingGuidancePayment: React.FC = () => {
  const { user, token } = useContext(AuthContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Only show on home page
  if (pathname !== "/") return null;

  const handleGuidancePayment = async () => {
    if (!user || !token) {
      toast.error("Please login to purchase guidance plan");
      router.push("/login-portal");
      return;
    }
    setLoading(true);
    try {
      const paymentData = await createPaymentOrder("one-time", token);
      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: "INR",
        name: "CourseSite",
        description: "Guidance Plan",
        order_id: paymentData.orderId,
        handler: async function (response: RazorpayResponseType) {
          try {
            const success = await verifyPayment(
              paymentData.paymentId,
              response
            );
            if (success) {
              toast.success("Payment successful!");
              router.push("/course-info");
            } else {
              toast.error("Payment verification failed");
            }
          } catch {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: "#10B981",
          backdrop_color: "#ECFDF5",
        },
      };
      // @ts-expect-error Razorpay types
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-2 left-1/2 z-50 -translate-x-1/2 flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 bg-gray-900/95 border border-gray-800 rounded-lg shadow-lg px-2 py-2 sm:px-4 sm:py-2 max-w-xs w-[95vw] sm:max-w-md sm:w-auto backdrop-blur-xl">
      <div className="flex flex-col items-center sm:items-start mr-0 sm:mr-2 w-full sm:w-auto">
        <span className="text-[9px] sm:text-[10px] text-gray-400 mb-0.5 sm:mb-1 text-center sm:text-left leading-tight">
          Limited Time Offer
        </span>
        <span className="text-[11px] sm:text-xs text-gray-400 line-through mb-0.5 sm:mb-1">
          ₹18,000
        </span>
        <div className="w-5 sm:w-6 border-b border-dotted border-gray-500 mb-0.5 sm:mb-1" />
        <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
          ₹9,733
        </span>
      </div>
      <button
        onClick={handleGuidancePayment}
        disabled={loading}
        className="w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-400 text-black font-semibold text-sm sm:text-base rounded-md sm:rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Join Now"}
      </button>
    </div>
  );
};

export default PaymentDialog;
