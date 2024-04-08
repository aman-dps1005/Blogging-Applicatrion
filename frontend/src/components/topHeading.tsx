interface prop{
    title:string,
    alternative:string,
    href:string,
    altertext:string
}

export const Heading=(Props:prop)=>{
    const {title,alternative,href,altertext}=Props;
    return (
        <div className="mx-2 px-6 py-4" >
            <div className="flex justify-center text-5xl font-extrabold pb-2">{title}</div>
            <div className="flex justify-center">{alternative} <a href={href} className="text-blue-700 underline pl-1">{altertext}</a></div>
        </div>
    )
}