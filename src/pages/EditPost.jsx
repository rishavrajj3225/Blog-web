import React ,{useState,useEffect}from 'react'
import { Container, PostForm } from '../components/index.js'
import appwriteService from '../appwrite/config.js'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const slug= useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((Response)=>{
                if(Response) {setPost(Response);}
            }).catch((error)=>{
                console.error("Error fetching post:", error);
            });
        }
    }, [slug,navigate]);
  return  post ?(
    <div className=' py-8'>
    <Container>
      <PostForm post={post} />
    </Container>
    </div>
  ) : null 

}

export default EditPost