import { Quote } from "../components/Quote";
import {TextField} from "../components/Inputfileld"
import { Heading } from "../components/topHeading";
import { Button } from "../components/button";
import { emailAtom,passwordAtom } from "../store/atoms/Signatoms";
import { useRecoilState } from "recoil";
import { signinInput } from "@aman-dps1005/blogging_common1";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


const Signin=()=>{
    const [email,setEmail]=useRecoilState(emailAtom);
    const [password,setPassword]=useRecoilState(passwordAtom);

    const navigate=useNavigate();

    async function handleSignin(){
        const userObject:signinInput={
            email:email,
            password:password
        }
        try{
            const logged=await axios({
                url:`${BACKEND_URL}/api/v1/user/signin`,
                method:"POST",
                data:userObject
            })
            if(logged){
                console.log(logged);
                const token=logged.data.message;
                const gotName=logged.data.name;
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
                <Heading title={"LogIn to Account"} alternative={"Don't have An Account?"} href="./signup" altertext="SignUp"/>
                <div><TextField name={"Email"} tag={"enter your email ID"}  stateVariable={email} method={setEmail}/></div>
                <div><TextField name={"Password"} tag={"enter your password "} stateVariable={password} method={setPassword}/></div>
                <Button buttontext="Sign In" clickhandler={handleSignin}/>
            </div>
            
        </div>
        <div className="basis-1/2"><Quote></Quote></div>
    </div>
    </div>
    )
}

export default Signin;