"use client";

import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 overflow-y-auto">
      {/* Main heading */}
      <h1 className="text-4xl font-bold mb-10 text-yellow-400">
        Terms of Service
      </h1>

      <div className="space-y-8 leading-relaxed text-sm md:text-base">
        {/* Term 1 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Bold Voice Systems, you agree to comply with
            and be bound by these Terms of Service. If you do not agree, you may
            not use our services.
          </p>
        </section>

        {/* Term 2 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            2. Eligibility
          </h2>
          <p>
            You must be at least 18 years old or have parental/guardian consent
            to use our services. By using our platform, you represent that you
            meet this requirement.
          </p>
        </section>

        {/* Term 3 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            3. Purchases & Payments
          </h2>
          <p>
            All purchases are final. You are responsible for ensuring payment
            details are accurate. Refunds are not provided unless required by
            law or explicitly stated.
          </p>
        </section>

        {/* Term 4 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            4. User Responsibilities
          </h2>
          <p>
            You agree not to misuse our services, attempt unauthorized access,
            or violate applicable laws while using Bold Voice Systems.
          </p>
        </section>

        {/* Term 5 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            5. Intellectual Property
          </h2>
          <p>
            All content, including text, graphics, logos, and course materials,
            is owned by Bold Voice Systems and protected under copyright laws.
          </p>
        </section>

        {/* Term 6 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            6. Privacy Policy
          </h2>
          <p>
            Your use of our services is also governed by our Privacy Policy,
            which explains how we collect and use your data.
          </p>
        </section>

        {/* Term 7 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            7. Limitation of Liability
          </h2>
          <p>
            Bold Voice Systems is not liable for any indirect, incidental, or
            consequential damages arising from your use of our services.
          </p>
        </section>

        {/* Term 8 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            8. Termination
          </h2>
          <p>
            We reserve the right to suspend or terminate your account if you
            violate these Terms of Service or engage in harmful behavior.
          </p>
        </section>

        {/* Term 9 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            9. Modifications
          </h2>
          <p>
            We may update or modify these Terms at any time. Continued use of
            our services after changes means you accept the updated terms.
          </p>
        </section>

        {/* Term 10 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            10. Contact Us
          </h2>
          <p>
            If you have any questions about these Terms, please contact us at:{" "}
            <br />
            <strong>Email:</strong> boldvoicesystems@gmail.com <br />
            <strong>Location:</strong> Bangalore, India
          </p>
        </section>
      </div>

      {/* Back to Home button */}
      <div className="mt-12">
        <Link
          href="/"
          className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
