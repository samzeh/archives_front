import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { GoHomeFill } from "react-icons/go"
import BookCarousel from '../components/BookCarousel'
import SideModal from '../components/SideModal'
import '../styles/profile.css'
import { useNavigate } from 'react-router-dom'
import { getBookInfo } from '../utils/profileBooks'
import loadingGif from '../assets/loading.gif'
import noBooks from '../assets/no_books.png'
import { getUsername, getCurrentUserId } from '../firebase/firestoreFunctions'
import ProfileButton from '../components/ProfileButton'
import { AnimatePresence, motion } from 'motion/react'
import { logout, deleteAccount } from '../firebase/firestoreFunctions'
import mockPfp from '../assets/mock_pfp.png'
import ActionButton from '../components/ActionButton'
import LoadingOverlay from '../components/LoadingOverlay'


export default function Profile() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [username, setUsername] = useState('User');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [password, setPassword] = useState('');

  const queryClient = useQueryClient();

  const profileModalRef = useRef<HTMLDivElement>(null)
  
  const handleDeleteAccount = async (password: string) => {
    await deleteAccount(password)
    await logout()
    navigate('/')
  }
  const {
    data: { finishedBooks = [], toReadBooks = [] } = {},
    isLoading,
    isError
  } = useQuery({
    queryKey: ['profileBooks'],
    queryFn: getBookInfo,
  });
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      getUsername(userId).then((username) => {
        setUsername(username)
      });
    }
  })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileModalRef.current && !profileModalRef.current.contains(e.target as Node)) {
        setShowProfileModal(false)
      }
    }

    if (showProfileModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showProfileModal])

  const handleSignOut = async () => {
    await logout()
    navigate('/')
  }

  const displayUsername = username.length > 8 ? username.slice(0, 5) + '...' : username;

  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      {isLoading && <LoadingOverlay />}
      <div className="header">
        <h1>{displayUsername}'s Library</h1>
        <div className="header-icons">
          <GoHomeFill style={{height: '65px', width: '65px', cursor: 'pointer', pointerEvents: 'all'}} onClick={goHome} />
          <div ref={profileModalRef} className="profile-button-wrapper" style={{ position: 'relative', flexShrink: 0 }}>
            <ProfileButton onClick={() => setShowProfileModal((v) => !v)}/>

            <AnimatePresence>
              {showProfileModal && (
                <motion.div
                  className="profile-page-modal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.17 }}
                >
                    <p onClick={() => setShowEditModal((v) => !v)}>edit</p>
                    <hr />
                    <p className="danger" onClick={handleSignOut}>log out</p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </div>

      {showEditModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowEditModal(false)} />
          <div className="edit-profile-modal">

            <div style={{ display: 'flex', flexDirection: 'row', gap: 25, alignItems: 'center' }}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img src={mockPfp} style={{ width: 90, height: 90, borderRadius: '50%', border: '2px solid rgba(79,54,24,0.3)', display: 'block' }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: -5,
                  background: '#422D13', borderRadius: '50%',
                  width: 27, height: 27, lineHeight: '27px',
                  textAlign: 'center', color: 'white',
                  fontSize: '1rem', cursor: 'pointer'
                }}>+</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, gap: 10 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontFamily: 'Courier Prime', color: '#422D13', fontSize: '1rem' }}>Username</label>
                  <input className="edit-name-input" defaultValue={username} onBlur={(e) => setUsername(e.target.value)} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontFamily: 'Courier Prime', color: '#422D13', fontSize: '1rem' }}>Display Name</label>
                  <input className="edit-name-input" defaultValue={username} onBlur={(e) => setUsername(e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12, paddingTop: 10 }}>
              <ActionButton title="delete account" bgColor="#c0392b" textColor="white" onClick={() => { setShowDeleteConfirm(true); setShowEditModal(false) }} />
              <ActionButton title="save" bgColor="#422D13" textColor="white" onClick={() => setShowEditModal(false)} />
            </div>

          </div>
        </>
      )}

      {showDeleteConfirm && (
        <>
          <div className="modal-backdrop" onClick={() => setShowDeleteConfirm(false)} />
          <div className="edit-profile-modal" style={{ paddingBottom: '30px'}}>
            <p style={{ fontFamily: 'Courier Prime', color: '#5b4831', fontSize: '1rem', margin: 0 }}>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <label style={{ fontFamily: 'Courier Prime', color: '#422D13', fontSize: '1rem' }}>Enter your password to confirm</label>
              <input
                className="edit-name-input"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: '10px' }}>
              <ActionButton title="cancel" bgColor="#5b4831" textColor="#ffffff" onClick={() => { setShowDeleteConfirm(false); setPassword('') }} />
              <ActionButton title="delete" bgColor="#c0392b" textColor="white" onClick={() => handleDeleteAccount(password)} />
            </div>
          </div>
        </>
      )}

      <div className="section-box">
        <h1 className="section-title">Finished:</h1>
        {isError ? <div>Error loading books</div> : finishedBooks.length === 0 
  ? <div className="book-carousel"><img src={noBooks} alt="No Books" className="book-cover" /></div> 
  : <BookCarousel books={finishedBooks} onBookClick={setSelectedBook} />}
      </div>

      <div className="section-box">
        <h1 className="section-title">To Be Read:</h1>
        {isError ? <div>Error loading books</div> : toReadBooks.length === 0 
  ? <div className="book-carousel"><img src={noBooks} alt="No Books" className="book-cover" /></div> 
  : <BookCarousel books={toReadBooks} onBookClick={setSelectedBook} />}
      </div>

      <div style={{ paddingBottom: '48px' }} />

      <SideModal 
        book={selectedBook} 
        onClose={() => setSelectedBook(null)}
        onBookRemoved={() => queryClient.invalidateQueries(['profileBooks'])}
      />
    </div>
  )
}