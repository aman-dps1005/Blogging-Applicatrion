import { useRecoilState } from "recoil";
import blogAtom from "../store/atoms/BlogsAtoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogCard } from "../components/blogCard";
import AppBar from "../components/appBar";
import { Skeleton } from "../components/skeleton";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Blogs=()=>{
    const [blogs,setBlogs]=useRecoilState(blogAtom);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    
    useEffect(()=>{
        async function fetchData() { 
            try {
                const response = await axios({
                    url: `${BACKEND_URL}/api/v1/blog/bulk`,
                    method: "GET",
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                });
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        fetchData();
    },[])

    function createPage(){
        navigate("/create");
    }
    
    return <div >
       <AppBar clickHandle={createPage} buttontext="Add +"/>
       {loading?
            <div>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </div>
        :
            <div className="pb-3 mb-4">
                {blogs.map(a=><BlogCard blog={a}/>)}
            </div>
        }
        
        
    </div>
}

export default Blogs;