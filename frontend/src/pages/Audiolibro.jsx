// src/pages/Audiolibro.jsx

import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import audiolibrosData from "../data/audioLibrosData";
import "../styles/Audiolibro.css";
//Este import comunicación con el backend
import axios from "axios";


function Audiolibro() {
  const { id_libro } = useParams(); // Para obtener el parámetro "id_libro" de la URL
  const [audiolibro, setAudiolibro] = useState(null); // Estado para almacenar el audiolibro
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  // Referencia al elemento audio
  const audioRef = useRef(null);

  // Estados para controlar la reproducción, volumen y progreso
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volumen inicial al máximo
  const [isMuted, setIsMuted] = useState(false); // Estado para controlar si está muteado
  const [previousVolume, setPreviousVolume] = useState(1); // Para almacenar el volumen antes de mute
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState({ minutes: 0, seconds: 0 });  // Estado para almacenar el tiempo transcurrido en minutos y segundos


  // Funciones para controlar el audio
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10; // Retrocede 10 segundos
  };

  const handleForward = () => {
    audioRef.current.currentTime += 10; // Avanza 10 segundos
  };

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
    setIsMuted(volumeValue === "0"); // Mute si el volumen es 0
    const volumeSlider = document.querySelector('.audiobook-volume-slider');
    if (volumeSlider) {
      volumeSlider.style.setProperty('--volume-level', `${volumeValue * 100}%`);
    }
  };

  const updateProgressAndTime = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const progressValue = (currentTime / duration) * 100;
      setProgress(progressValue);

      const progressBar = document.querySelector('.audiobook-progress-slider');
      if (progressBar) {
      progressBar.style.setProperty('--progress', `${progressValue}%`);
      progressBar.style.setProperty('--webkit-progress', `${progressValue}%`);
      
      }
      const minutes = Math.floor(currentTime / 60);
      const seconds = Math.floor(currentTime % 60);
      setCurrentTime({ minutes, seconds });
    }
  };

  const handleProgressChange = (e) => {
    const progressValue = e.target.value;
    audioRef.current.currentTime =
      (audioRef.current.duration * progressValue) / 100;
    setProgress(progressValue);
  };


  // Función para mutear/desmutear el audio
  const toggleMute = () => {
    if (isMuted) {
      // Si está muteado, restablecemos el volumen anterior
      setVolume(previousVolume);
      audioRef.current.volume = previousVolume;
    } else {
      // Guardamos el volumen actual antes de mutear
      setPreviousVolume(volume);
      setVolume(0);
      audioRef.current.volume = 0; // Mutea el audio
    }
    setIsMuted(!isMuted); // Alternar estado de mute
  };
  
  // useEffect para obtener el audiolibro desde la API
  useEffect(() => {
    const fetchAudiolibro = async () => {
      try {
        // Reemplaza esta URL con la URL correcta de tu API
        const response = await axios.get(
          `http://localhost:8000/api/libros/${id_libro}/`
        );
        console.log("Response data:", response.data);
        setAudiolibro(response.data); // Guardar el audiolibro en el estado
        setLoading(false); // Desactivar el estado de loading
      } catch (err) {
        console.error("Error fetching the audiobook:", err);
        setError("Error al cargar el audiolibro"); // Guardar el mensaje de error
        setLoading(false);
      }
    };

    fetchAudiolibro(); // Llamar a la función para hacer la solicitud
  }, [id_libro]); // Solo volver a ejecutar el efecto si cambia id_libro (osea cuando cambies de un audio libro a otro)

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

  if (error) {
    return <div>{error}</div>; // Mostrar un mensaje de error si ocurre un problema
  }

  if (!audiolibro) {
    return (
      <div className="audiobook-page">
        <Header />
        <main className="audiobook-main-content">
          <h2>Audiolibro no encontrado</h2>
          <p>El audiolibro solicitado no existe.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="audiobook-page">
      <Header />
      <main className="audiobook-main-content">
        <div className="audiobook-container">
          {/* Sección izquierda con la imagen y detalles debajo */}
          <div className="audiobook-left-section">
            <img
              src={audiolibro.url_imagen_portada}
              alt={audiolibro.nombre_libro}
              className="audiobook-image"
            />
            {/* Detalles debajo de la imagen */}
            <div className="audiobook-details">
              <p>
                <strong className="subtitulos-atributos">Autores:</strong>{" "}
                {audiolibro.autores && audiolibro.autores.length > 0
                  ? audiolibro.autores.map((autor, index) => (
                      <span key={index}>
                        {autor.autor.nombre_autor}
                        {index < audiolibro.autores.length - 1 ? ", " : ""}
                      </span>
                    ))
                  : "Autor desconocido"}
              </p>
              <p>
                <strong className="subtitulos-atributos">Categoría:</strong>{" "}
                {audiolibro.categoria}
              </p>
              <p>
                <strong className="subtitulos-atributos">Año:</strong>{" "}
                {audiolibro.fecha_publicacion}
              </p>
              <p>
                <strong className="subtitulos-atributos">Duración:</strong>{" "}
                {audiolibro.duracion}
              </p>
            </div>
          </div>
          {/* Sección derecha con el título y sinopsis */}
          <div className="audiobook-right-section">
            <h2 className="audiobook-titulo">{audiolibro.nombre_libro}</h2>
            <h3 className="audiobook-subtitle">Sinopsis</h3>
            <p className="audiobook-summary">{audiolibro.descripcion}</p>
          </div>
        </div>
        {/* Controles de audio */}
        <div className="audiobook-audio-controls">
          <div className="audiobook-left-controls">
          <button className="audiobook-volume-button" onClick={toggleMute}>
              {/* Cambia la imagen dependiendo de si está muteado o no */}
              <img src={isMuted ? "/assets/mute.png" : "/assets/audio.png"} alt="Volumen" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              className="audiobook-volume-slider"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
          <div className="audiobook-right-controls">
            <button className="audiobook-control-button" onClick={handleRewind}>
              &#8634; {/* Icono de retroceder 10 segundos */}
            </button>
            <button
              className="audiobook-control-button-middle"
              onClick={handlePlayPause}
            >
              {isPlaying ? "❚❚" : "►"}
            </button>
            <button
              className="audiobook-control-button"
              onClick={handleForward}
            >
              &#8635; {/* Icono de avanzar 10 segundos */}
            </button>
          </div>
        </div>
        {/* Barra de progreso */}
        <div className="audiobook-progress-bar">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            className="audiobook-progress-slider"
            value={progress}
            onChange={handleProgressChange}
          />
        
    
        <p>
        <br />
        {currentTime.minutes}:{currentTime.seconds < 10 ? `0${currentTime.seconds}` : currentTime.seconds}
       </p>
        </div>
        {/* Elemento de audio oculto */}
        
        <audio
          ref={audioRef}
          src={audiolibro.url_audio}
          onTimeUpdate={updateProgressAndTime} // Un solo onTimeUpdate
        />
      </main>
      <Footer />
    </div>
  );
}

export default Audiolibro;
