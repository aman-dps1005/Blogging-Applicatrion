


interface prop{
    name:string,
    tag:string,
    stateVariable:any,
    method:any
}



export const TextField=(props:prop)=>{
    const {name,tag,stateVariable,method}=props;
    function handleInputChange(e:any){
        method(e.target.value);
        //console.log(stateVariable);
    }
    return(
        <div className="py-3">
            <div className="font-bold font-sans text-lg pb-2 w-full">{name}</div>
            <input className="px-2 py-1 border rounded-md border-gray-600 w-full" placeholder={tag} onChange={handleInputChange} type={(name=="Password")?"password":"text"}/>
        </div>
    )
}

