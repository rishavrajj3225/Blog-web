import React ,{useState,useEffect}from 'react'
import { Container,PostCard } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
function AllPost() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await appwriteService.getPosts()
            setPosts(response)
        }
        fetchPosts()
    }, [])
    appwriteService.listPosts([]).then((response) => {
        if( response) setPosts(response.documents)
    }
    ).catch((error) => {
        console.error("Error fetching posts:", error)
    })
  return (
    <div className=' py-8'>
    <Container>
     <div className='flex flex-wrap'>

      {posts.map((post) => (
        <div key={post.$id} className='w-1/4 p-2'>
          <PostCard key={post.id} post={post} />
        </div>
        ))}
    </div>
    </Container>
    </div>
  )
}

export default AllPost