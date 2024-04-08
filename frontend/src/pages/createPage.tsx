import axios from "axios";
import AppBar from "../components/appBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


const CreatePage=()=>{
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const navigate=useNavigate();

    function titleModify(e:any){
        const timer=setTimeout(()=>{
            setTitle(e.target.value);
        },1500)

        return ()=> clearTimeout(timer);
        
    }

    function contentModify(e:any){
        const timer=setTimeout(()=>{
            setContent(e.target.value);
        },1500)

        return ()=>clearTimeout(timer);
    }

    async function postBlog(){
        try{
            const result=await axios({
                url:`${BACKEND_URL}/api/v1/blog`,
                method:"POST",
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                },
                data:{
                    title:title,
                    content:content
                }
            });
            console.log(result);

            navigate("/blogs");

        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <AppBar clickHandle={postBlog} buttontext="Publish"/>

            <div className="flex justify-center  w-full pt-8">
                <div className="max-w-screen-lg w-full ">
                    <input type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                    block p-2.5 mb-4" placeholder="Title" onChange={titleModify}/>

                    <textarea  className="block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  h-52 mb-4" placeholder="Write your blog here..." onChange={contentModify}></textarea>

                    <button className="h-10 bg-green-500 px-3 rounded-full hover:bg-green-700 text-white" onClick={postBlog}>Publish</button>
                </div>
            </div>

        </div>
    )
}

export default CreatePage;