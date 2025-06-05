import React from 'react'
import appwriteService from '../appwrite/config.js'
import { Link } from 'react-router-dom'


function PostCard({$id,title,featureImage}) {

  return (
    <Link to={`/post/${$id}`} className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
        <img src={appwriteService.getFilePreview(featureImage, 300, 200)} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
    </Link>
  )
}

export default PostCard