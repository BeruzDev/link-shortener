import { useState, useEffect } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { FaXmark } from 'react-icons/fa6'
import { MdDeleteForever } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { MdQuestionMark } from "react-icons/md"
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'
import { supabase } from './config/supabase.js'

export const useAppLogic = () => {
  const [confirmAdvice, setConfirmAdvice] = useState(false)
  const [icon, setIcon] = useState(null)
  const [message, setMessage] = useState('')
  const [classIcon, setClassIcon] = useState('')
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)
  const [userSession, setUserSession] = useState({
    userId: null,
    accessToken: null,
  })
  const [userInfoSettings, setUserInfoSettings] = useState({
    userName: null,
    userEmail: null,
  });
  const navigate = useNavigate()

  const getToastMessage = (type) => {
    switch (type) {
      case 'success':
        return {
          icon: <FaCheck />,
          message: 'Copy to clipboard!',
          classIcon: 'success-icon',
        }
      case 'created':
        return {
          icon: <FaCheck />,
          message: 'Link crafted!',
          classIcon: 'success-icon',
        }
        case 'duplicate':
          return {
            icon: <HiOutlineDocumentDuplicate />,
            message: 'This shortcut is already used',
            classIcon: 'error-icon',
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
      case 'copy':
        return {
          icon: <HiOutlineDuplicate />,
          message: 'Copy to clipboard!',
          classIcon: 'update-icon',
        }
      default:
        return {
          icon: <MdQuestionMark />,
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
    }, 3000)
  }

  const toggleLogModal = () => {
    setIsLogModalOpen(true)
  }

  const logoutSession = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error: ', error.message)
      feedToast('error')
    } else {
      setUserSession({ userId: null, accessToken: null })
      navigate('/')
    }
  }

  useEffect(() => {
    const getSessionData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Error fetching session:', error.message)
          return
        }

        if (data.session) {
          const sessionInfo = {
            userId: data.session.user.id,
            accessToken: data.session.access_token,
          }

          const sessionUserInfo = {
            userName: data.session.user.user_metadata.full_name,
            userEmail: data.session.user.user_metadata.email,
          }

          setUserSession(sessionInfo)
          setUserInfoSettings(sessionUserInfo)
        }
      } catch (error) {
        console.error('Error during session fetch:', error.message)
      }
    }

    getSessionData()
  }, [])

  return {
    confirmAdvice,
    message,
    icon,
    classIcon,
    isLogModalOpen,
    userSession,
    userInfoSettings,
    feedToast,
    toggleLogModal,
    logoutSession,
  }
}
