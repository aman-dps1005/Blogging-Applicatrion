import { useNavigate } from "react-router-dom";

interface prop{
    clickHandle:any,
    buttontext:string
}

const AppBar=(props:prop)=>{
    //@ts-ignore
    const name:string=localStorage.getItem("name");
    const navigate=useNavigate();
    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navigate('/signin');
    }

    

    return(
        <div className="flex  p-4 mb-4 justify-between border-b">
            <div className="font-bold  text-2xl flex justify-center items-center">Blog-R</div>
            <div>
            <button type="button"className="h-10 mx-5 bg-green-500 px-3 rounded-full hover:bg-green-700 text-white" onClick={props.clickHandle}>
                   {props.buttontext}
            </button>
            <button type="button"className="h-10 mr-5 bg-zinc-400 px-3 rounded-full hover:bg-zinc-600 text-white" onClick={logout}>
                   Log out
            </button>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="text-2xl text-gray-600 dark:text-gray-300">{name[0]}</span>
            </div>
            </div>
            
        </div>
    )
}

export default AppBar;