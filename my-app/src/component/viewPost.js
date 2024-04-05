import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useParams,NavLink, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
const ViewPost = () => {
    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);
    let navigate = useNavigate()

const {id} = useParams("")
    // Get the JWT token from your cookies
    const token = Cookies.get('x-api-key');
    console.log(token);
      const header = {
        'Content-Type': 'application/json',
        // Include the JWT token in the Authorization header
        'x-api-key': `${token}`,
      };

const getdata = async () => {

    const res = await fetch(`http://localhost:4000/blogs/${id}`, {
        method: "GET",
        mode:"cors",
        headers:header
    });

    console.log(res);
    const data = await res.json();

    console.log(data,'jhgfd');

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
const deleteuser = async (id) => {

    const res2 = await fetch(`http://localhost:4000/blogs/${id}`, {
        method: "DELETE",
        mode:"cors",
        headers: header
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
        console.log("error");
    } else {
        // console.log("user deleted");
        navigate("/home");
    }

}
console.log("postData:", getuserdata.data);

  return (
    <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>

                <div className="add_btn">
                <NavLink to={`/update/${getuserdata.data?._id}`} state={{ postData: getuserdata.data }} >  <button className="btn btn-primary mx-2"><CreateIcon /></button></NavLink>
                        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata.data?._id)}><DeleteIcon /></button>
                    </div>
                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            {/* <img src="/profile.png" style={{ width: 50 }} alt="profile" /> */}
                            <h3 className="mt-3">Title: <span >{getuserdata.data?.title}</span></h3>
                            <h3 className="mt-3">Body: <span >{getuserdata.data?.body}</span></h3>
                            <p className="mt-3">Tags: <span>{getuserdata.data?.tags}</span></p>
                            <p className="mt-3">Category: <span>{getuserdata.data?.category}</span></p>
                            <p className="mt-3">Subcategory: <span>{getuserdata.data?.subcategory} </span></p>

                        </div>
                        {/* <div className="right_view  col-lg-6 col-md-6 col-12">

                            <p className="mt-5">Subcategory: <span>{getuserdata.data.subcategory} </span></p>
                        </div> */}
                    </div>

                </CardContent>
            </Card>
    </div>
  )
};

export default ViewPost;
