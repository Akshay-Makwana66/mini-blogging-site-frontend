import React ,{useState,useEffect} from "react";
import {NavLink,useNavigate} from "react-router-dom";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
const Home = () => {
let navigate = useNavigate();
  const [getuserdata, setUserdata] = useState([]);
  console.log(getuserdata);

  // Get the JWT token from your cookies
  const token = Cookies.get('x-api-key');
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
        setUserdata(data)
        console.log("get data");

    }
}

useEffect(() => {
    getdata();
}, [])

const deleteUser = async (id) => {
  const deleteData = await fetch(`http://localhost:4000/blogs/${id}`, {
      method: "DELETE",
      mode:"cors",
      headers: header
  });

  if (deleteData.ok) {
      // Filter out the deleted post from the state
      setUserdata(prevData => ({
        ...prevData,
        data: prevData.data.filter(post => post._id !== id)
    }));
      navigate("/home");
  } else {
      console.log("Failed to delete post");
  }
}


  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          <NavLink to="/createPost"><button className="btn btn-primary">Add Post</button></NavLink>
        </div>

        <table class="table">
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

            {
                                getuserdata.data?.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td className="data">{element.title}</td>
                                                <td className="data">{element.body}</td>
                                                <td className="data">{element.tags}</td>
                                                <td className="data">{element.category}</td>
                                                 <td className="data">{element.subcategory}</td>

                                                <td className="d-flex justify-content-between">
                                                <NavLink to={`/view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`/update/${element._id}`} state={{ postData: element }}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={()=>deleteUser(element._id)} ><DeleteIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
