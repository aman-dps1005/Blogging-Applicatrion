import { Quote } from "../components/Quote";
import {TextField} from "../components/Inputfileld"
import { Heading } from "../components/topHeading";
import { Button } from "../components/button";
import { emailAtom,nameAtom,passwordAtom } from "../store/atoms/Signatoms";
import { useRecoilState } from "recoil";
import { signupInput } from "@aman-dps1005/blogging_common1";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


const Signup=()=>{
    const [email,setEmail]=useRecoilState(emailAtom);
    const [name,setName]=useRecoilState(nameAtom);
    const [password,setPassword]=useRecoilState(passwordAtom);
    const navigate=useNavigate();

    async function handleSignup(){
        const userObject:signupInput={
            email:email,
            name:name,
            password:password
        }
        try{
            const created=await axios({
                url:`${BACKEND_URL}/api/v1/user/signup`,
                method:"POST",
                data:userObject
            })
            if(created){
                console.log(created);
                const token=created.data.token;
                const gotName=created.data.name;
                localStorage.setItem("token",token);
                localStorage.setItem("name",gotName);
                navigate("/blogs")
            }
            
        }
        catch(err){
            console.log(err);
        }
        
    }

    return (
        <div>
            
            <div className="p-4 border-b font-bold text-2xl">Blog-R</div>
        <div className="flex h-screen">
            <div className="flex h-screen bg-white basis-1/2 justify-center items-center">
                <div>
                    <Heading title={"Create an Account"} alternative={"Already have An Account?"} href="./signin" altertext="Login"/>
                    <div><TextField name={"Email"} tag={"enter your email ID"} stateVariable={email} method={setEmail}/></div>
                    <div><TextField name={"Name"} tag={"enter your name here"} stateVariable={name} method={setName}/></div>
                    <div><TextField name={"Password"} tag={"enter your password "} stateVariable={password} method={setPassword}/></div>
                    <Button buttontext="Sign Up" clickhandler={handleSignup}/>
                </div>
                
            </div>
            <div className="basis-1/2"><Quote></Quote></div>
        </div>
        </div>
    )
}

export default Signup;