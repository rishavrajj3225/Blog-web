import React from 'react'

function Button({ children, onClick, type = 'button', className = '',bgColor = 'bg-blue-500', textColor = 'text-white',...props }) {
  return (
    <button className={`${bgColor} ${textColor} px-4 py-2 rounded-lg ${className}`} type={type} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
export default Button