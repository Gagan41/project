import { toast } from "react-hot-toast";

export type PaymentVerificationError = {
  type: "AUTH_ERROR" | "PAYMENT_ERROR" | "NETWORK_ERROR" | "UNKNOWN_ERROR";
  message: string;
};

export async function verifyPaymentAccess(token: string): Promise<boolean> {
  try {
    const response = await fetch("/api/user/payment-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw {
          type: "AUTH_ERROR",
          message: "Your session has expired. Please log in again.",
        };
      }

      if (response.status === 403) {
        throw {
          type: "PAYMENT_ERROR",
          message: "You need to complete the payment to access this content.",
        };
      }

      throw {
        type: "NETWORK_ERROR",
        message: "Failed to verify payment status. Please try again.",
      };
    }

    const { hasActivePayment } = await response.json();

    if (!hasActivePayment) {
      throw {
        type: "PAYMENT_ERROR",
        message: "You need to complete the payment to access this content.",
      };
    }

    return true;
  } catch (error) {
    const paymentError = error as PaymentVerificationError;

    switch (paymentError.type) {
      case "AUTH_ERROR":
        toast.error(paymentError.message);
        window.location.href = "/login-portal";
        break;
      case "PAYMENT_ERROR":
        toast.error(paymentError.message);
        window.location.href = "/payment";
        break;
      case "NETWORK_ERROR":
        toast.error(paymentError.message);
        break;
      default:
        toast.error("An unexpected error occurred. Please try again.");
    }

    return false;
  }
}
