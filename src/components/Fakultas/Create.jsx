import React, { useState } from "react";
import axios from "axios";

export default function Create() {
   
    const [namaFakultas, setNamaFakultas] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (namaFakultas.trim() === "") {
            setError("Namaa fakultas is required");
            return;
        }

        try {
            const response = await axios.post(
                "https://project-apiif-3-b.vercel.app/api/api/fakultas", {
                nama : namaFakultas
            }
        );

            if (response.status === 201) {
                setSuccess("Fakultas successfully created");
                setNamaFakultas("");
            }
        } catch (error) {
            setError("an error occured while creating Fakultas");
        }
        };

        return (
            <div className="container mt-5"> 
                <h2 className="mb-4">Create Fakultas</h2>
                        {success && <div className="alert alert-success">{success}</div>}
                        {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">    
                        <label htmlFor="namafakultas" className="form-label">Nama Fakultas</label>
                        <input
                            type="text"
                            className="form-control"
                            id="namafakultas"
                            value={namaFakultas}
                            onChange={(e) => setNamaFakultas(e.target.value)}
                            placeholder="Enter Fakultas Name"
                        />  
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>         
        )
    
    }

