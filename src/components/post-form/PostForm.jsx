import React, {useState,useEffect, useCallback}from 'react'
import { useForm } from 'react-hook-form';
import {Button, Input, Container, Loader, Logo} from '../index.js'
import appwriteService from '../../appwrite/config.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function PostForm({post}) {
    const {register, handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues: {
            title: post?.title ||"" ,
            content: post?.content || "" ,
            slug: post?.slug || "",
            status: post?.status || 'active',
        }
    });
    const navigate = useNavigate();
    const userData= useSelector((state) => state.auth.userData);
    const [error, setError] = useState(null);
    const submit =async (data) => {
        setError(null);
        try {
            if (post) {   
                // Update existing post
                const file= data.image[0]? appwriteService.uploadFile('posts', data.image[0]) : null;

                if(file){
                    appwriteService.deleteFile(post.FaturedImage);
                
                }
                const updatedPost = await appwriteService.updateDocument('post', post.$id, {
                    ...data,
                    userId: userData.$id,
                    FaturedImage: file ? file.$id : undefined,

                });
                if (updatedPost) {
                    navigate(`/post/${updatedPost.$id}`);
                }
            } else {
                // Create new post
                const file = data.image[0] ? await appwriteService.uploadFile('posts', data.image[0]) : null;
                if(file){
                    const fileid = file.$id;
                    data.FaturedImage = fileid;
                    const newPost = await appwriteService.createDocument('post', {
                        ...data,
                        userId: userData.$id,
                        FaturedImage: fileid,
                    });
                    if( newPost) {
                        navigate(`/post/${newPost.$id}`);
                    }
                }
            }
        } catch (err) {
            setError(err.message);
        }
    }
    const slugTransform=useCallback((value) => {
        if(value && typeof value === 'string') {
            // Transform the title to a slug format
            // Remove leading and trailing spaces, convert to lowercase,
            // replace non-alphanumeric characters with hyphens, and replace spaces with hyphens
            // Example: "Hello World!" -> "hello-world"
                return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-').replace(/\s+/g, '-');

        }
        return "";

    }, []);

    useEffect(() => {   
        const subscription = watch((value,{name})=>{
            if(name === 'title') {
                const slug = slugTransform(value.title);
                setValue('slug', slug, {
                    shouldValidate: true
                });
            }
        });
        if (subscription) {
            const slug = slugTransform(subscription);
            setValue('slug', slug);
        }
        return ()=>{
            subscription.unsubscribe();
        }
    }, [watch, setValue, slugTransform]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
            />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
                });
            }}
        />
            <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            />
        </div>
            <div className="w-1/3 px-2">
            <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
                />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    );
}

export default PostForm