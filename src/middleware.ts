import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add paths that require payment verification
const PROTECTED_PATHS = ["/course-info", "/courses"];

export async function middleware(request: NextRequest) {
  console.log("Middleware triggered for path:", request.nextUrl.pathname);

  // Get token from cookies
  const token = request.cookies.get("token")?.value;
  console.log("Token present:", !!token);

  // If no token, redirect to login
  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login-portal", request.url));
  }

  // Check if the path requires payment verification
  const path = request.nextUrl.pathname;
  console.log("Checking path:", path);

  if (PROTECTED_PATHS.some((p) => path.startsWith(p))) {
    console.log("Path requires payment verification");
    try {
      // Get user's payment status
      const response = await fetch(
        `${request.nextUrl.origin}/api/user/payment-status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        }
      );

      console.log("Payment status response:", response.status);

      if (!response.ok) {
        console.log("Payment status check failed, redirecting to payment");
        return NextResponse.redirect(new URL("/payment", request.url));
      }

      const { hasActivePayment } = await response.json();
      console.log("Has active payment:", hasActivePayment);

      if (!hasActivePayment) {
        console.log("No active payment found, redirecting to payment");
        return NextResponse.redirect(new URL("/payment", request.url));
      }

      console.log("Payment verified, allowing access");
      return NextResponse.next();
    } catch (error) {
      console.error("Payment verification error:", error);
      return NextResponse.redirect(new URL("/payment", request.url));
    }
  }

  console.log("Path does not require payment verification");
  return NextResponse.next();
}

// Update the matcher to be more specific
export const config = {
  matcher: [
    "/course-info",
    "/course-info/:path*",
    "/courses",
    "/courses/:path*",
  ],
};
