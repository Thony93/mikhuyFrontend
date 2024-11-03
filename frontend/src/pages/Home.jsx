// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";
import axios from "axios";

function Home() {
  const [audiolibros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const apiURL = process.env.REACT_APP_API;

  const handleSearch = async () => {
    if (query.trim() !== "") {
      setLoading(true);
      try {
        const response = await axios.get(`${REACT_APP_API}/api/libros/buscar/?search=${query}`);
        setLibros(response.data); // Almacena los resultados de búsqueda
      } catch (error) {
        console.error("Error al buscar libros:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await axios.get(`${REACT_APP_API}/api/libros/`);
        setLibros(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the audiobooks", error);
        setLoading(false);
      }
    };

    fetchLibros();
  }, []);

  if (loading) {
    return (
      <div className="spinner center">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header query={query} setQuery={setQuery} onSearch={handleSearch}/>
      <main className="home-main-content">
        {/* Sección superior con imagen y frase */}
        <section className="hero-section">
          <img
            src="/assets/FondoMikhuy.png"
            alt="Imagen Hero"
            className="hero-image"
          />
          <div className="hero-content">
            <p className="hero-description">
              Disfruta de un formato cómodo y moderno que te permite aprender
              sobre la gastronomía sin dejar de hacer lo que amas: ¡cocinar!
            </p>
            <h4 className='nombre-equipo'></h4>
          </div>
        </section>
        
        {/* Contenedor común para el título y las tarjetas */}
        <div className="section-content">
          {/* Título "Empieza a escuchar" */}
          <h2 className="section-title">EMPIEZA A ESCUCHAR</h2>

          {/* Grid de audiolibros */}
          <section className="audiobooks-grid">
            {audiolibros.map((audiolibro) => (
              <Link
                to={`/audiolibro/${audiolibro.id_libro}`}
                className="audiobook-card"
                key={audiolibro.id_libro}
              >
                <div className="image-container">
                  <img
                    className="capa1"
                    src={audiolibro.url_imagen_portada}
                    alt={audiolibro.nombre_libro}
                  />
                  <div className="contenedor-atributos-hover">

                  <div className="contenedor-icono-atributo">
                    <img className="iconos-hover" src="/assets/icono-autor.png" alt="icono-autor" />
                    <p>
                      {audiolibro.autores && audiolibro.autores.length > 0
                      ? audiolibro.autores.map((autor, index) => (
                        <span key={index}>
                          {autor.autor.nombre_autor}
                          {index < audiolibro.autores.length - 1 ? ", " : ""}
                        </span>
                      ))
                      : "Autor desconocido"}
                    </p>
                  </div>

                  <div className="contenedor-icono-atributo">
                    <img className="iconos-hover" src="/assets/icono-categoria.png" alt="icono-autor" />
                    <p>
                      Ejemplo categoria
                    </p>
                  </div>
                  <div className="contenedor-icono-atributo">
                    <img className="iconos-hover" src="/assets/icono-tiempo.png" alt="icono-autor" />
                    <p>
                    {audiolibro.duracion}
                    </p>
                  </div>
                  <div className="contenedor-año">
                    <p className="atributo-año-hover">
                    {audiolibro.fecha_publicacion}
                    </p>
                  </div>


                  </div>
                </div>
                <div className="audiobook-title">
                  {audiolibro.nombre_libro}
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
