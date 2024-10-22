import React,{useState,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Edit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [nama,setNama] = useState("");
    const [fakultas,setFakultas] = useState("");
    const [fakultasList,setFakultasList] = useState([]);
    const [error,setError] = useState(null);

    useEffect(() => {
        axios.get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
        .then((response) => {
            setNama(response.data.result.nama);
            setFakultas(response.data.result.id);
        })
        .catch((error) => {
            console.log("fetcing data",error);
            setError("data tidak ditemukan");
        });

        axios.get(`https://project-apiif-3-b.vercel.app/api/api/fakultas`)
        .then((response) => {
            setFakultasList(response.data.result);
        })
        .catch((error) => {
            console.log("fetcing data",error);
        });

    },[id]);

    const handleChange = (e) => {
        setNama(e.target.value);
    }

    const handleFakultasChange = (e) => {
        setFakultas(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`, {nama,fakultas_id : fakultas})
        .then((response) => {
            navigate("/prodi");
        })
        .catch((error) => {
            console.error("Error updating data:", error);
            setError("Gagal mengupdate data");
        });
    }

    return (
        <div>
        <h2>Edit Program Studi</h2> {/* Menampilkan judul halaman */}
        {error && <p className="text-danger">{error}</p>} {/* Menampilkan pesan error jika ada */}
        <form onSubmit={handleSubmit}> {/* Form untuk mengedit nama prodi */}
        <div className="mb-3">
        <label htmlFor="nama" className="form-label">
        Nama Program Studi
        </label> {/* Label untuk input nama prodi */}
        <input
        type="text" className="form-control" id="nama" value={nama} // Mengisi nilai input dengan state 'nama'
        onChange={handleChange} // Mengubah nilai input saat ada perubahan (user mengetik)
        required // Input wajib diisi
        />
        </div>

        <div className="mb-3">
            <label htmlFor="fakultas" className="form-label">Nama Fakultas</label>
            <select className="form-select" id="fakultas" value={fakultas} onChange={handleFakultasChange} required>
                <option value="">Pilih Fakultas</option>
                {fakultasList.map((fakultas) => (
                    <option key={fakultas.id} value={fakultas.id}>
                        {fakultas.nama}
                    </option>
                ))}
            </select>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        </form>
        </div>
        );

}