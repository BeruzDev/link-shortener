import { useState } from 'react'
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { GrStatusUnknown } from "react-icons/gr";

export const useAppLogic = () => {
  const [confirmAdvice, setConfirmAdvice] = useState(false)
  const [icon, setIcon] = useState(null)
  const [message, setMessage] = useState('')
  const [classIcon, setClassIcon] = useState('')

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
				return{
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

  return {
    confirmAdvice,
    message,
    icon,
		classIcon,
    feedToast,
  }
}
