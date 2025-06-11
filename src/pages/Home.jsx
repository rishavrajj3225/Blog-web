import React,{useEffect,useState} from 'react'
import appwriteService from '../appwrite/config.js'
import { Container,PostCard } from '../components/index.js'



function Home() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        appwriteService.listPosts().then(response => {
            if(response) setPosts(response.documents)
        });
    },[]);
    if(posts.length === 0) {
        return (
            <div className=' py-8 mt-4 text-center w-full'>
            <Container>
                <div className=' flex flex-wrap'>
                    <div className=' p-2 w-full'>
                        <h1 className="text-center text-2xl font-bold hover:text-gray-200">Login to read posts</h1>
                    </div>
                </div>
            </Container>
            </div>
        )
    }

    return (
        <div className=' py-8 mt-4 text-center w-full'>
            <Container>
                <div className=' flex flex-wrap'>
                {posts.map(post => (
                    <div key={post.$id} className=' p-2 w-1/4'>
                        <PostCard post={post} />
                    </div>
                ))}
                </div>
        </Container>
        </div>
    )   
}

export default Home