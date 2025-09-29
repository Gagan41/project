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
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
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
          <button onClick={() => openModal("terms")} className="hover:text-gray-800">
            Terms of Service
          </button>
          <button onClick={() => openModal("refund")} className="hover:text-gray-800">
            Refund Policy
          </button>
        </div>
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} Bold Voice Systems. All rights reserved.
        </div>
      </div>

      {/* Terms Modal */}
      <Modal
        title="Terms of Service"
        isOpen={activeModal === "terms"}
        onClose={closeModal}
        content={<p>These are the terms and conditions. Add your full Terms of Service content here.</p>}
      />

      {/* Refund Modal */}
      <Modal
        title="Refund Policy"
        isOpen={activeModal === "refund"}
        onClose={closeModal}
        content={<p>This is the refund policy. Add your detailed Refund Policy here.</p>}
      />
    </footer>
  );
}
