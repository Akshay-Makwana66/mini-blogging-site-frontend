import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css"
import LoginPage from './component/loginPage';
import ViewPost from './component/viewPost';
import Home from './component/home';
import UpdatePost from './component/updatePost';
import CreatePost from './component/createPost';
import SignUp from './component/signUp.js';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<SignUp/>} />
          <Route exact path='/login' element={<LoginPage/>} />
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/createPost' element={<CreatePost/>} />
          <Route exact path='/view/:id' element={<ViewPost/>} />
          <Route exact path='/update/:id' element={<UpdatePost/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
