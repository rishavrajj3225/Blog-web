import React from 'react'
import { Button, Input, Container, Logo,PostForm } from '../components/index.js'
function AddPost() {
  return (
    <div className=' py-8'>
    <Container >
      <Logo />
      <PostForm />
    </Container>
    </div>
  )
}

export default AddPost