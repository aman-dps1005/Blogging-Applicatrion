import { BrowserRouter,Routes,Route } from "react-router-dom";
import { lazy,Suspense } from "react";
import { RecoilRoot } from "recoil";

const Signup=lazy(()=> import ("./pages/signup"));
const Signin=lazy(()=>import ("./pages/signin"));
const Blog=lazy(()=>import ("./pages/blog"));
const Blogs=lazy(()=>import("./pages/blogs"));
const CreatePage=lazy(()=> import("./pages/createPage"));

const App=()=>{
  return(
    <div>
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>loading...</div>}>
            {(localStorage.getItem("token"))?<Blogs/>:<Signin/>}
            </Suspense>}/>


          <Route path="/signup" element={<Suspense fallback={<div>loading...</div>}>
            <Signup/>
            </Suspense>}/>
          <Route path="/signin" element={<Suspense fallback={<div>loading...</div>}>
            <Signin/>
            </Suspense>}/>
          <Route path="/blog/:id" element={<Suspense fallback={<div>loading...</div>}>
            <Blog/>
            </Suspense>}/>
          <Route path="/blogs" element={<Suspense fallback={<div>Loading....</div>}>
            <Blogs/>
          </Suspense>}/>
          <Route path="/create" element={<Suspense fallback={<div>Loading....</div>}>
            <CreatePage/>
          </Suspense>}/>
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App;