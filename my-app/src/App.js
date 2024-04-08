import { BrowserRouter, Routes, Route} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css"
import LoginPage from './component/loginPage';
import ViewPost from './component/viewPost';
import PostView from './component/onlyViewPost.js';

import Home from './component/home';
import UpdatePost from './component/updatePost';
import CreatePost from './component/createPost';
import SignUp from './component/signUp.js';
import NotFound from './component/notFound.js';
import MyBlogs from './component/myBlogs.js';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<SignUp/>} />
          <Route exact path='/login' element={<LoginPage/>} />
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/createPost' element={<CreatePost/>} />
          <Route exact path='/myblogs' element={<MyBlogs/>} />
          <Route exact path='/view/:id' element={<ViewPost/>} />
          <Route exact path='/viewPost/:id' element={<PostView/>} />

          <Route exact path='/update/:id' element={<UpdatePost/>} />
          <Route path='*' element={<NotFound />} />    
          </Routes>
      </div>  
    </BrowserRouter>
  );
}

export default App;
