import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {useParams,useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

const PostView = () => {
    const [getuserdata, setUserdata] = useState([]);    
    const [postName, setPostName] = useState("");
    let navigate = useNavigate()
    const {id} = useParams("")
   // Get the JWT token from your cookies
   const token = Cookies.get('x-api-key');

   useEffect(() => {
       if (!token) {
           navigate('/login'); // Redirect to login if token is not present
       } else {
           getdata();
           fetchPostName();
       }
   }, [token]);
   
  const header = {
      'Content-Type': 'application/json',
      // Include the JWT token in the Authorization header
      'x-api-key': `${token}`,
  };

const getdata = async () => {

    const getdata = await fetch(`http://localhost:4000/blogs/${id}`, {
        method: "GET",
        mode:"cors",
        headers:header
    });

    const data = await getdata.json();

    if (getdata.status === 500 || !data) {
        console.log(getdata.message);

    } else {
        setUserdata(data)
        console.log("get data");
        }
    }
    
  


    const fetchPostName = async () => {
        try {
            const postNameResponse = await fetch(`http://localhost:4000/getPosterName/${id}`, {
                method: "GET",
                headers: header,
            });
            const postNameData = await postNameResponse.json();
            if (postNameResponse.ok) {
                setPostName(postNameData.postername); // Assuming the user's name is returned from the backend
            } else {
                console.error("Failed to fetch post name");
            }
        } catch (error) {
            console.error("Error fetching user name:", error);
        }
    };


  return (
    <div className="container mt-3">
            <h4 style={{ fontWeight: 400,color:"red" }}>Posted By : <span style={{fontWeight:600,fontSize:22,color:'teal'}}>{postName}</span></h4>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>

                    <div className="row">
                        <div className="left_view col-lg-6 col-md-6 col-12">
                            
                            <h3 className="mt-3">Title: <span >{getuserdata.data?.title}</span></h3>
                            <h3 className="mt-3">Body: <span >{getuserdata.data?.body}</span></h3>
                            <p className="mt-3">Tags: <span>{getuserdata.data?.tags}</span></p>
                            <p className="mt-3">Category: <span>{getuserdata.data?.category}</span></p>
                            <p className="mt-3">Subcategory: <span>{getuserdata.data?.subcategory} </span></p>

                        </div>
                    </div>

                </CardContent>
            </Card>
    </div>
  )
};

export default PostView;
