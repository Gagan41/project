"use client";

import { useRouter } from "next/navigation";
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

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  buttonText: string;
  isPopular?: boolean;
  plan: "one-time" | "3-month" | "monthly";
  onPurchase: (plan: "one-time" | "3-month" | "monthly") => Promise<void>;
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

  const handlePurchase = async (plan: "one-time" | "3-month" | "monthly") => {
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
          } catch (error) {
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
    } catch (error) {
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="One-Time Purchase"
              description="Pay once and access the course forever."
              price="₹2,999"
              buttonText="Get Started"
              plan="one-time"
              onPurchase={handlePurchase}
            />

            <PricingCard
              title="3-Month Access"
              description="Access the course for 3 months."
              price="₹1,199"
              buttonText="Get Started"
              isPopular={true}
              plan="3-month"
              onPurchase={handlePurchase}
            />

            <PricingCard
              title="Monthly Access"
              description="Cancel anytime. Billed monthly."
              price="₹499/mo"
              buttonText="Get Started"
              plan="monthly"
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
                <span>30-Day Money Back</span>
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

export default PaymentDialog;
