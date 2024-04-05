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
console.log(token);
  const header = {
    'Content-Type': 'application/json',
    // Include the JWT token in the Authorization header
    'x-api-key': `${token}`,
  };

  const getdata = async () => {

    const res = await fetch("http://localhost:4000/blogs", {
        method: "GET",
        headers: header,
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log("error ");

    } else {
        setUserdata(data)
        console.log("get data");

    }
}
// console.log(getuserdata.data[0].title)
useEffect(() => {
    getdata();
}, [])

const deleteUser = async (id) => {

    const res2 = await fetch(`http://localhost:4000/blogs/${id}`, {
        method: "DELETE",
        mode:"cors",
        headers: header
    });
    const deletedata = await res2.json();
    console.log(deletedata);
navigate("/home")
    // if (res2.status === 422 || !deletedata) {
    //     console.log("error");
    // } else {
    //     console.log("user deleted");
    //     // setDLTdata(deletedata)
    //     getdata();
    // }

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
                                                <td>{element.title}</td>
                                                <td>{element.body}</td>
                                                <td>{element.tags}</td>
                                                <td>{element.category}</td>
                                                 <td>{element.subcategory}</td>

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
