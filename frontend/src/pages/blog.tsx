import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AppBar from "../components/appBar";
import { Fragment } from "react";
import { BACKEND_URL } from "../config";
import { Spinner } from "../components/spinner";

const Blog=()=>{
    const {id}=useParams();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [oneBlog,setOneBlog]=useState({
        id:"",
        title:"",
        content:"",
        PublishedAt:""
    });
    useEffect(()=>{
        async function BlogLoader(){
            try{
                const blog=await axios({
                    url:`${BACKEND_URL}/api/v1/blog/${id}`,
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(blog){ 
                    setOneBlog({
                        id:blog.data.id,
                        title:blog.data.title,
                        content:blog.data.content,
                        PublishedAt:blog.data.PublishedAt
                    });
                    setLoading(false);           
                }
                
            }
            catch(err){
                console.log(err);
            }
        } 
        BlogLoader();
    },[])

    function createPage(){
        navigate("/create");
    }

    if(loading){
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
                <Spinner/>
            </div>
        </div>
    }
    return (
        <>
            <AppBar clickHandle={createPage} buttontext="Add +"/>
            <div className="m-4 flex justify-center  w-full pt-8">
                <div className="mr-6">
                    <div className="font-bold text-4xl pb-4 ">
                        {oneBlog.title}
                    </div>
                    <div className="text-slate-500 pb-6">
                        Published on {oneBlog.PublishedAt.slice(0,10).split("-").reverse().join("-")}
                    </div>
                </div>
                <div className="text-justify indent-8">
                {oneBlog.content.split('\n').map((line, index) => (
                        <Fragment key={index}>
                            {line}
                            <br />
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Blog;