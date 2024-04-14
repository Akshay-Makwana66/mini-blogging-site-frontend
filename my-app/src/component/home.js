import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import '../css/home.css'
const Home = () => {
    let navigate = useNavigate();
    const [getuserdata, setUserdata] = useState([]);
    const [userName, setUserName] = useState("");
     // Get the JWT token from your cookies
     const token = Cookies.get('x-api-key');

     useEffect(() => {
         if (!token) {
             navigate('/login'); // Redirect to login if token is not present
         } else {
             getdata();
             fetchUserName();
         }
     }, [token]);
     
    const header = {
        'Content-Type': 'application/json',
        // Include the JWT token in the Authorization header
        'x-api-key': `${token}`,
    };

    const getdata = async () => {
        const getdata = await fetch("http://localhost:4000/blogs", {
            method: "GET",
            headers: header,
        });

        const data = await getdata.json();

        if (getdata.status === 500 || !data) {
            console.log(getdata.message);
        } else {
            setUserdata(data);
            console.log("get data");
        }
    }

    

    const fetchUserName = async () => {
      try {
          const userNameResponse = await fetch("http://localhost:4000/getUserName", {
              method: "GET",
              headers: header,
          });
          const userNameData = await userNameResponse.json();
          if (userNameResponse.status) {
              setUserName(userNameData.name); // Assuming the user's name is returned from the backend
          } else {
              console.error("Failed to fetch user name");
          }
      } catch (error) {
          console.error("Error fetching user name:", error);
      }
  };

    

    const handleLogout = () => {
        // Clear or delete the token from cookies
        Cookies.remove('x-api-key');
        // Redirect the user to the login page
        navigate("/login");
    }

    return (
        <div className="mt-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="add_btn mt-2">
                        <NavLink to="/createPost">
                            <button className="btn btn-primary">Create Post</button>
                        </NavLink>
                    </div>
                    <div className="add_btn mt-2">
                        <NavLink to="/myblogs">
                            <button className="btn btn-primary">MyBlogs</button>
                        </NavLink>
                    </div>
                    <div className="user-info">
                    <div className="user-info-container">
                        <p className="user-name">Welcome, {userName}</p>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                </div>

                <table className="table">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">Id</th>
                            <th scope="col">title</th>
                            <th scope="col">body</th>
                            <th scope="col">tags</th>
                            <th scope="col">category</th>
                            <th scope="col">subcategory</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {getuserdata.data?.map((element, id) => {
                            return (
                                <tr key={id}>
                                    <th scope="row">{id + 1}</th>
                                    <td className="data">{element.title}</td>
                                    <td className="data">{element.body}</td>
                                    <td className="data">{element.tags}</td>
                                    <td className="data">{element.category}</td>
                                    <td className="data">{element.subcategory}</td>
                                    <td className="d-flex justify-content-between">
                                        <NavLink to={`/viewPost/${element._id}`}>
                                            <button className="btn btn-success">
                                               view 
                                            </button>
                                        </NavLink>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
