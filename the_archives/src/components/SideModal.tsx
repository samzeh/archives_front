import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import '../styles/profile.css'

type Book = { id: number, cover: string }

export default function SideModal(props: { book: Book | null, onClose: () => void }) {
  return (
    <AnimatePresence>
      {props.book && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={props.onClose}
          />
          <motion.div
            className="book-modal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <img src={props.book.cover} className="modal-cover" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
