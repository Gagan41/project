"use client";

import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10 overflow-y-auto">
      {/* Main heading */}
      <h1 className="text-4xl font-bold mb-10 text-yellow-400">
        Privacy Policy
      </h1>

      <div className="space-y-8 leading-relaxed text-sm md:text-base">
        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            1. Information We Collect
          </h2>
          <p>
            We collect only the data necessary to deliver and improve our
            services:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>
              <strong>Account Information:</strong> such as your name, email,
              and login credentials when you register.
            </li>
            <li>
              <strong>Payment Data:</strong> processed securely by third-party
              payment providers; we do not store full payment details.
            </li>
            <li>
              <strong>Technical Data:</strong> including browser type, IP
              address, device identifiers, and access times.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            2. How We Use Your Data
          </h2>
          <p>Your data is used for:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Providing and personalizing our services.</li>
            <li>Ensuring secure login and fraud prevention.</li>
            <li>Improving site performance and user experience.</li>
            <li>Sending service updates and important notices.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            3. Data Retention
          </h2>
          <p>
            We retain your information only as long as necessary for legitimate
            business purposes or legal obligations. You may request deletion of
            your data at any time.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            4. Security Measures
          </h2>
          <p>
            We use encryption, firewalls, and strict access controls to protect
            your data. While we strive for full security, no online system is
            100% risk-free.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            5. Cookies and Tracking
          </h2>
          <p>
            Cookies help us remember your preferences and analyze usage trends.
            You may disable cookies in your browser, but some features may not
            work properly.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            6. Third-Party Services
          </h2>
          <p>
            We may share necessary data with trusted partners like payment
            gateways, analytics providers, or cloud hosting services. These
            parties are bound by strict confidentiality.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            7. International Data Transfers
          </h2>
          <p>
            If you access our services outside India, your information may be
            transferred and stored in other jurisdictions with different data
            protection laws.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            8. Your Rights
          </h2>
          <p>
            You have the right to request access, correction, deletion, or
            restriction of your data. You may also opt out of marketing
            communications at any time.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            9. Updates to Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted here with an updated revision date.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-400">
            10. Contact Us
          </h2>
          <p>
            If you have any concerns about this Privacy Policy, contact us at:{" "}
            <br />
            <strong>Email:</strong> boldvoicesystems@gmail.com <br />
            <strong>Location:</strong> Bangalore, India
          </p>
        </section>
      </div>

      {/* Back button */}
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
