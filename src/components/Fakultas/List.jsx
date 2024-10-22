import React,{useEffect,useState} from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {

  const [fakultas, setFakultas] = useState([]);

  useEffect(() => {
    axios.get('https://project-apiif-3-b.vercel.app/api/api/fakultas')
    .then(response => {
      setFakultas(response.data.result);
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
          axios.delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
          .then((response) => {
          setFakultas(fakultas.filter((fakultas) => fakultas.id !== id));
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
            <h2>List Fakultas</h2>
            <NavLink to="/fakultas/create" className="btn btn-primary">Add</NavLink>

            <ul className="list-group">
                {fakultas.map((fakultas) => (
                    <li key={fakultas.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{fakultas.nama}</span>{/* menampilkan data */}
                        <div className="btn-group" role="group" aria-label="Action Buttons">
                        <NavLink to={`/fakultas/edit/${fakultas.id}`} className="btn btn-warning">Edit</NavLink>
                        <button onClick={()=> handleDelete(fakultas.id,fakultas.nama)}className="btn btn-danger">Delete</button>
                        </div>
                    </li>
                ))}
             </ul>
        </>
    )
}
