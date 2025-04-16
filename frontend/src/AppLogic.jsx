import { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { FaXmark } from 'react-icons/fa6'
import { MdDeleteForever } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { GrStatusUnknown } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { supabase } from './config/supabase.js'

export const useAppLogic = () => {
  const [confirmAdvice, setConfirmAdvice] = useState(false)
  const [icon, setIcon] = useState(null)
  const [message, setMessage] = useState('')
  const [classIcon, setClassIcon] = useState('')
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)
  const [isCrafterModalOpen, setIsCrafterModalOpen] = useState(false);
  const [userSession, setUserSession] = useState({
    userId: null,
    accessToken: null,
  })
  const navigate = useNavigate()

  const getToastMessage = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: <FaCheck />,
          message: 'Copy to clipboard!',
          classIcon: 'success-icon',
        }
      case 'error':
        return {
          icon: <FaXmark />,
          message: 'Something go wrong!',
          classIcon: 'error-icon',
        }
      case 'both':
        return {
          icon: <FaXmark />,
          message: 'Both fields are required!',
          classIcon: 'error-icon',
        }
      case 'delete':
        return {
          icon: <MdDeleteForever />,
          message: 'Link deleted!',
          classIcon: 'delete-icon',
        }
      case 'update':
        return {
          icon: <FiEdit />,
          message: 'Link updated!',
          classIcon: 'update-icon',
        }
      default:
        return {
          icon: <GrStatusUnknown />,
          message: 'Unknown action!',
          classIcon: 'unknown-icon',
        }
    }
  }

  const feedToast = (type) => {
    const { icon, message, classIcon } = getToastMessage(type)
    setIcon(icon)
    setMessage(message)
    setClassIcon(classIcon)
    setConfirmAdvice(true)

    setTimeout(() => {
      setConfirmAdvice(false)
    }, 6000)
  }

  const toggleLogModal = () => {
    setIsLogModalOpen(true)
  }

  const onOpenCrafterModal = () => {
		setIsCrafterModalOpen(true)
    
	}

  const onCloseCrafterModal = () => {
    setIsCrafterModalOpen(false)
  }

  const logoutSession = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error: ', error.message)
      feedToast('error')
    } else {
      console.log('User signed out successfully')
      setUserSession({ userId: null, accessToken: null })
      navigate('/')
    }
  }

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        // Verifica si hubo un error en la obtención de la sesión
        if (error) {
          console.error('Error fetching session:', error.message);
          return; // Termina la ejecución si hubo un error
        }
  
        console.log('getSessionData → data:', data);
        
        if (data.session) {
          const sessionInfo = {
            userId: data.session.user.id,
            accessToken: data.session.access_token,
          };
  
          setUserSession(sessionInfo);
          console.log('Session info -> ', sessionInfo);
        } else {
          console.log('No session found');
        }
      } catch (error) {
        console.error('Error during session fetch:', error.message);
      }
    };
  
    getSessionData();
  }, []);
  

  return {
    confirmAdvice,
    message,
    icon,
    classIcon,
    isLogModalOpen,
		isCrafterModalOpen,
    userSession,
    feedToast,
    toggleLogModal,
    onOpenCrafterModal,
    onCloseCrafterModal,
    logoutSession,
  }
}
