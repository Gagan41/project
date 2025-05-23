"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Script from "next/script";
import {
  createPaymentOrder,
  verifyPayment,
  type RazorpayResponseType,
} from "@/app/api/razorpay/actions";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";

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
    <div
      className={`relative p-6 rounded-xl border ${
        isPopular
          ? "border-purple-500 bg-gray-800"
          : "border-gray-700 bg-gray-800"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
            Most Popular
          </span>
        </div>
      )}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="text-3xl font-bold text-white mb-6">{price}</div>
      <button
        onClick={() => onPurchase(plan)}
        className={`w-full py-3 rounded-md font-medium transition-colors ${
          isPopular
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-gray-700 text-white hover:bg-gray-600"
        }`}
      >
        {buttonText}
      </button>
    </div>
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
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="bg-gray-900 rounded-xl p-6 max-w-4xl w-full">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-purple-400 hover:text-white transition mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Choose Your Plan
          </h2>
          <p className="text-gray-400">
            Select the plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
};

export default PaymentDialog;
