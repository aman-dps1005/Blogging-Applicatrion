interface prop{
    buttontext:string,
    clickhandler:any
}
export const Button=(props:prop)=>{
    const {buttontext,clickhandler}=props;
    return(
        <div>
            <button className="bg-black w-full text-white p-3 my-4 rounded-md text-center"onClick={clickhandler}>{buttontext}</button>
        </div>
    )
}