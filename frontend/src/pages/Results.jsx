import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Results.css';

function Results() {
  const [audiolibros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('query') || '';
  const [lastQuery, setLastQuery] = useState(''); // Estado para guardar el último query
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = async () => {
    if (query.trim() !== '') {
      setLoading(true);
      setLastQuery(query);
      try {
        const response = await axios.get(`http://localhost:8000/api/libros/buscar/?search=${query}`);
        setLibros(response.data);
      } catch (error) {
        console.error('Error al buscar libros:', error);
      } finally {
        setLoading(false);
       
      }
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    } else {
      const fetchLibros = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/libros/');
          setLibros(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching audiobooks', error);
          setLoading(false);
        }
      };
      fetchLibros();
    }
  }, [initialQuery]);

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
    <div className="results-page">
      <Header query={query} setQuery={setQuery} onSearch={handleSearch} />
      <main className="results-main-content">

        <div className="section-content">
          <h2 className="section-title">RESULTADOS DE BÚSQUEDA</h2>

          <section className="audiobooks-grid">
            {audiolibros.length > 0 ? (
              audiolibros.map((audiolibro) => (
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
                    <p className="capa2">Escuchar ahora</p>
                  </div>
                  <div className="audiobook-title">
                    {audiolibro.nombre_libro}
                  </div>
                  <div className="audiobook-year">
                    {audiolibro.fecha_publicacion}
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-results">No se encontraron resultados para "{lastQuery}"</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Results;