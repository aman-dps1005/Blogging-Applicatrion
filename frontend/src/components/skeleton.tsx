export const Skeleton=()=>{
    return(

        <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
            <div className="bg-gray-300 h-8 w-3/4"></div>
            <div className="bg-gray-300 h-6 w-1/2"></div>
            <div className="bg-gray-300 h-6 w-3/4"></div>
        </div>
    </div>

    )
}