import React,{useEffect,useState} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function List() {

  const [prodi, setProdi] = useState([]);

  useEffect(() => {
    axios.get('https://project-apiif-3-b.vercel.app/api/api/prodi')
    .then(response => {
      setProdi(response.data.result);
      console.log(response.data.result);
    })
    .catch(error => {
      console.log("eror fatching data",error);
    });
  }, []);

  const handleDelete = (id, nama) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this! ${nama}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
          .then((response) => {
          setProdi(prodi.filter((prodi) => prodi.id !== id));
          Swal.fire('Deleted!','Your file has been deleted.','success')
          })
          .catch((error) => {
            console.log("eror deleting data", error);
            Swal.fire('Error!','Something went wrong.','error'
            );
          });
        }
      });   
    };

    return (
      <>
      <h2>List Program Studi</h2>
      <NavLink to="/prodi/create" className="btn btn-primary mb-3">
        Create
      </NavLink>
      <table className="table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Fakultas</th>
            <th>CRUD</th>
          </tr>
        </thead>
        <tbody>
          {prodi.map((prodi) => (
            <tr key={prodi.id}>
              <td>{prodi.nama}</td>
              <td>{prodi.fakultas.nama}</td>
              <td>
                <NavLink
                  to={`/prodi/edit/${prodi.id}`}
                  className="btn btn-warning"
                >Edit</NavLink>
                <button onClick={()=> handleDelete(prodi.id,prodi.nama)}className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
    )
}
