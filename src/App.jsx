import React,{Suspense} from "react";
import {BrowserRouter as Router,Route, Routes,NavLink} from "react-router-dom";

const Home = React.lazy(() => import('./components/Home'));
const FakultasList = React.lazy(() => import('./components/Fakultas/List'));
const FakultasCreate = React.lazy(() => import('./components/Fakultas/Create'));
const FakultasEdit = React.lazy(() => import('./components/Fakultas/Edit'));
const ProdiList = React.lazy(() => import('./components/Prodi/List'));
const ProdiCreate = React.lazy(() => import('./components/Prodi/Create'));
const ProdiEdit = React.lazy(() => import('./components/Prodi/Edit'));

function App() {
  return (
   <Router>

      {/*Navigasi*/}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">MDP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className={({isActive})=> `nav-link ${isActive ? "nav-link active" : ""}`} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className={({isActive})=> `nav-link ${isActive ? "nav-link active" : ""}`} to="/fakultas">Fakultas</NavLink>
        </li>
        <li className="nav-item">
        <NavLink className={({isActive})=> `nav-link ${isActive ? "nav-link active" : ""}`} to="/prodi">Prodi</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

      <div className="container">

      <Suspense fallback={<div>Loading...</div>}>
      {/*suspense untuk fallback saat loading*/}
        <Routes>
          <Route path="/" element={<Home />} />{/*route untuk kw halaman home*/}
          <Route path="/fakultas" element={<FakultasList />} />{/*route untuk halaman list fakultas*/} 
          <Route path="/fakultas/create" element={<FakultasCreate />} />{/*route untuk halaman create fakultas*/}
          <Route path="/fakultas/edit/:id" element={<FakultasEdit />} />{/*route untuk halaman edit fakultas*/}
          <Route path="/prodi" element={<ProdiList />} />{/*route untuk halaman list prodi*/}
          <Route path="/prodi/create" element={<ProdiCreate />} />{/*route untuk halaman create prodi*/}
          <Route path="/prodi/edit/:id" element={<ProdiEdit />} />{/*route untuk halaman edit prodi*/}
        </Routes>
      </Suspense>

      <div>&copy; 2024 Mahasiswa</div>
      </div>

   </Router>
    
  );
}

export default App