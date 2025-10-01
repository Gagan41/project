// components/RefundContent.tsx
export default function RefundContent() {
  return (
    <div className="text-white text-sm leading-relaxed space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      <h3 className="font-semibold text-lg text-yellow-400">
        All Sales Are Final — No Refunds
      </h3>
      <p>
        All purchases made on Bold Voice Systems are final. We do not offer
        refunds, returns, exchanges, or credits for any course, product, or
        service after purchase, except as expressly set forth in Section 3
        below.
      </p>
      <p>
        By completing a transaction, you acknowledge and accept that you will
        not receive a refund for that transaction.
      </p>

      <div>
        <h3 className="font-semibold text-lg text-yellow-400 pt-4">
          Contact Us
        </h3>
        <p>
          For any questions regarding this Privacy Policy or how we handle your
          data, please contact us at:
          <br />
          <strong>Email:</strong> boldvoicesystems@gmail.com
          <br />
          <strong>Location:</strong> Bangalore, India
        </p>
      </div>
    </div>
  );
}
