import React from 'react'


// container component to wrap around the main content of the application it has access of // children prop which is used to render the content inside the container
function Container({ children }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 mx-auto w-full max-w-7xl">
      {children}
    </div>
  )
}

export default Container