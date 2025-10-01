"use client";

import { usePathname } from "next/navigation";
import { useModal } from "../context/ModalContext";

function Modal({
  title,
  content,
  isOpen,
  onClose,
}: {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="p-4 text-sm text-gray-700 max-h-[60vh] overflow-y-auto">
          {content}
        </div>
        <div className="border-t px-4 py-2 text-right">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const { activeModal, openModal, closeModal } = useModal();

  if (pathname !== "/") return null;

  return (
    <footer className="w-full border-t border-gray-200 py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm text-gray-500">
          <button
            onClick={() => openModal("terms")}
            className="hover:text-gray-800"
          >
            Terms of Service
          </button>
          <button
            onClick={() => openModal("refund")}
            className="hover:text-gray-800"
          >
            Refund Policy
          </button>
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Bold Voice Systems. All rights reserved.
        </div>
      </div>

      {/* Terms Modal */}
      {/* Terms Modal */}
      <Modal
        title="Terms of Service"
        isOpen={activeModal === "terms"}
        onClose={closeModal}
        content={
          <div className="text-black text-sm leading-relaxed space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            <div>
              <h3 className="font-semibold">1. Information We Collect</h3>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, billing address, and payment details provided
                  during registration or purchase.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our
                  website, including IP address, browser type, operating system,
                  and browsing activity.
                </li>
                <li>
                  <strong>Cookies and Tracking:</strong> We may use cookies and
                  similar technologies to enhance your user experience, track
                  usage patterns, and improve our services.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">2. How We Use Your Information</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>To provide and maintain our services.</li>
                <li>To process payments and manage transactions.</li>
                <li>
                  To communicate with you regarding updates, offers, and
                  customer support.
                </li>
                <li>To improve website functionality and user experience.</li>
                <li>To comply with legal and regulatory obligations.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">3. Data Sharing and Disclosure</h3>
              <p>
                We respect your privacy and will not sell or rent your personal
                information to third parties. However, we may share information
                in the following cases:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  With trusted third-party service providers (such as payment
                  gateways, hosting providers, or analytics tools) who assist in
                  operating our website.
                </li>
                <li>
                  To comply with legal obligations, court orders, or government
                  requests.
                </li>
                <li>
                  To protect our rights, property, or the safety of users.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">4. Data Security</h3>
              <p>
                We take reasonable measures to protect your information from
                unauthorized access, alteration, or disclosure. However, no
                method of transmission over the Internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">5. Your Rights</h3>
              <p>
                Depending on your location, you may have rights under applicable
                data protection laws, including the right to:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Access, update, or correct your personal information.</li>
                <li>
                  Request deletion of your data, subject to legal and
                  contractual obligations.
                </li>
                <li>Opt out of marketing communications at any time.</li>
              </ul>
              <p>
                To exercise these rights, please contact us at
                boldvoicesystems@gmail.com.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">6. Cookies</h3>
              <p>
                Our website uses cookies to personalize content, analyze
                traffic, and enhance performance. You can disable cookies
                through your browser settings, but some features of the site may
                not function properly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">7. Third-Party Links</h3>
              <p>
                Our website may contain links to external websites. We are not
                responsible for the privacy practices or content of third-party
                websites.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">8. Children’s Privacy</h3>
              <p>
                Our services are not directed to individuals under the age of
                13. We do not knowingly collect personal information from
                children. If you believe we have collected such data, please
                contact us, and we will delete it promptly.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                9. Changes to This Privacy Policy
              </h3>
              <p>
                We reserve the right to update or modify this Privacy Policy at
                any time. Changes will be posted on this page, and the “Last
                Updated” date will be revised. Continued use of our website
                indicates acceptance of the updated policy.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">10. Contact Us</h3>
              <p>
                For any questions regarding this Privacy Policy or how we handle
                your data, please contact us at:
                <br />
                <strong>Email:</strong> boldvoicesystems@gmail.com
                <br />
                <strong>Location:</strong> Bangalore, India
              </p>
            </div>
          </div>
        }
      />

      {/* Refund Modal */}
      <Modal
        title="Refund Policy"
        isOpen={activeModal === "refund"}
        onClose={closeModal}
        content={
          <div className="text-black text-sm leading-relaxed space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <h3 className="font-semibold">
              All Sales Are Final — No Refunds
            </h3>
            <p>
              All purchases made on Bold Voice Systems are final. We do not
              offer refunds, returns, exchanges, or credits for any course,
              product, or service after purchase, except as expressly set forth
              in Section 3 below.
            </p>
            <p>
              By completing a transaction, you acknowledge and accept that you
              will not receive a refund for that transaction.
            </p>
          </div>
        }
      />
    </footer>
  );
}
