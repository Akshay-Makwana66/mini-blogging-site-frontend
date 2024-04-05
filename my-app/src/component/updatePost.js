import React,{useState,useEffect} from 'react';
import {NavLink,useParams,useNavigate,useLocation} from "react-router-dom";
import '../css/signup.css';
import Cookies from 'js-cookie';
const UpdatePost = () => {
    
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    const [formData, setFormData] = useState({
        title: "",
        body: "",
        tags:"",
        category: "",
        subcategory: "",
        // ispublished:null
    });
    
    const [globalError,setGlobalError]= useState("")
    const navigate = useNavigate()
    const location = useLocation();
    const postData = location.state && location.state.postData;
    useEffect(() => {
        console.log("postData:", postData);
        if (postData) {
            console.log("Setting formData:", postData);
            setFormData(postData);
        }
    }, [postData]);
    
  const setData = (e)=>{
    const {name, value} = e.target;
    setFormData((preval) => {
        return {
            ...preval,
            [name]: value
        }
    })
  }



  const { id } = useParams("");
    console.log(id);

    const token = Cookies.get('x-api-key');
      const header = {
        'Content-Type': 'application/json',
        // Include the JWT token in the Authorization header
        'x-api-key': `${token}`,
      };


    const getdata = async () => {

        const res = await fetch(`http://localhost:4000/blogs/${id}`, {
            method: "GET",
            mode: 'cors',
            headers: header
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 500 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }
useEffect(()=>{
    getdata()
},[])
   console.log(formData);

    const updateuser = async(e)=>{
        e.preventDefault();

        const { title,  body, tags, category, subcategory} = formData;

        const res2 = await fetch(`http://localhost:4000/blogs/${id}`,{
            method: "PUT",
            mode: 'cors',
            headers: header,
            body:JSON.stringify({
                title,body,tags,category,subcategory
            })
        });

        const data2 = await res2.json();
        if(data2.status){
            console.log(data2);
            navigate("/home")
        }else{
             setGlobalError(data2.message)
        }
        // navigate("/home")

        // if(res2.status === 500 || !data2){
        //     alert("fill the data");
        // }else{
        // }

    }

return (
<div className="container ">
    <NavLink to="/home"><button className="btn btn-primary mt-2">Home</button></NavLink>
 <form className="mt-5">
   
    <div className="row">
    <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
        <input type="text" value={formData.title} onChange={setData}  name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label htmlFor="exampleInputPassword1" className="form-label">Body</label>
        <input type="text" value={formData.body} onChange={setData}  name="body" className="form-control" id="exampleInputPassword1"/>
    </div>
    <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label htmlFor="exampleInputPassword1" className="form-label">Tags</label>
        <input type="text" value={formData.tags}  onChange={setData}  name="tags" className="form-control" id="exampleInputPassword1"/>
    </div>
    <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label htmlFor="exampleInputPassword1" className="form-label">Category</label>
        <input type="text" value={formData.category} onChange={setData}  name="category" className="form-control" id="exampleInputPassword1"/>
    </div>
    <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label htmlFor="exampleInputPassword1" className="form-label">Subcategory</label>
        <input type="text" value={formData.subcategory} onChange={setData} name="subcategory" className="form-control" id="exampleInputPassword1"/>
    </div>
    {/* <div className="mb-3 col-lg-6 col-md-6 col-12">
        <label htmlFor="exampleInputPassword1" className="form-label">isPublished</label>
        <input type="text" name="isPublished" className="form-control" id="exampleInputPassword1"/>
    </div> */}
    <div className="d-grid gap-2 mt-5">
    <div className="errorMessage">{globalError && <span>{globalError}</span>}</div>
    <button type="submit" onClick={updateuser} className="btn btn-primary btn-lg">Submit</button>
    </div>
    </div>
    </form>
</div>
)
}

export default UpdatePost;