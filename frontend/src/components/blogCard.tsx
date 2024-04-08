import { useState ,useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { BACKEND_URL } from "../config"


interface blogsInterface{
    id:string,
    title:string,
    content:string,
    published:boolean,
    authorId:string,
    PublishedAt:any
}

interface prop{
    blog:blogsInterface
}
export const BlogCard=(props:prop)=>{
    const blog=props.blog
    const [username,seTusername]=useState("");
    useEffect(()=>{
        async function getUsername(){
            try {
                const response = await axios({
                    url: `${BACKEND_URL}/api/v1/user/${blog.authorId}`,
                    method: "GET",
                });
                seTusername(response.data.username);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
    
        }
        
        getUsername();
    },[])
    
    


    return(
        <Link to={"/blog/"+blog.id}>
            <div className="h-32 px-12 sm:mb-20 md:mb-12">
                <div className="pb-6">
                <div className="flex">
                    <div className="flex justify-center flex-col">
                    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="text-md text-gray-600 dark:text-gray-300">{username[0]}</span>
                    </div>
                    </div>
                    <div className="px-3">{username}</div>
                    <div className="text-slate-500">{blog.PublishedAt.slice(0,10).split("-").reverse().join("-")}</div>
                </div>
                <div className="font-semibold pb-2 text-xl">{blog.title}</div>
                <div className="line-clamp-2 font-light text-md">{blog.content}</div>
            
                <div className="my-3 mr-3">{Math.ceil(blog.content.length/500)} min read</div>

                <div className="border-b border-gray-400 "></div>   
                </div>
            </div>
        </Link>
        
    ) 
}