'use client'
import ReactModal from 'react-modal'
import { motion } from 'framer-motion'

interface VideoModalProps {
  isOpen: boolean
  onClose(): void
  videoUrl: string
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="mx-auto mt-20 w-full max-w-3xl rounded-lg p-4 bg-gray-900"
      overlayClassName="fixed inset-0 bg-black/75 flex justify-center items-start"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <iframe
          width="100%"
          height="400"
          src={videoUrl.replace('youtu.be/', 'www.youtube.com/embed/')}
          allowFullScreen
          className="rounded"
        />
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 transition">
          Close
        </button>
      </motion.div>
    </ReactModal>
  )
}