'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './globals.css';

interface Persona {
  id: number;
  nombre: string;
  edad: number;
  tipo: string;
  descripcion: string;
  fecha: string;
}

export default function Home() {
  const [formulario, setFormulario] = useState<Persona>({
    id: Date.now(),
    nombre: '',
    edad: 0,
    tipo: '',
    descripcion: '',
    fecha: ''
  });

  const [personas, setPersonas] = useState<Persona[]>([]);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('personas');
    if (datosGuardados) {
      setPersonas(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('personas', JSON.stringify(personas));
  }, [personas]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormulario({
      ...formulario,
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.tipo || !formulario.fecha) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    if (editando) {
      setPersonas(personas.map(p => (p.id === formulario.id ? formulario : p)));
      setEditando(false);
    } else {
      setPersonas([...personas, { ...formulario, id: Date.now() }]);
    }

    setFormulario({
      id: Date.now(),
      nombre: '',
      edad: 0,
      tipo: '',
      descripcion: '',
      fecha: ''
    });
  };

  const handleEditar = (persona: Persona) => {
    setFormulario(persona);
    setEditando(true);
  };

  const handleEliminar = (id: number) => {
    if (confirm('¿Seguro que deseas eliminar este registro?')) {
      setPersonas(personas.filter(p => p.id !== id));
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Personas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formulario.edad.toString()}
          onChange={handleChange}
        />
        <select
          name="tipo"
          value={formulario.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona tipo</option>
          <option value="Evento">Evento</option>
          <option value="Beneficiario">Beneficiario</option>
          <option value="Voluntario">Voluntario</option>
        </select>
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formulario.descripcion}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fecha"
          value={formulario.fecha}
          onChange={handleChange}
          required
        />
        <button type="submit">{editando ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <div className="listado">
        <h2>Listado</h2>
        {personas.length === 0 ? (
          <p>No hay registros</p>
        ) : (
          personas.map(p => (
            <div key={p.id} className="tarjeta">
              <strong>{p.nombre}</strong> ({p.tipo}) - {p.edad} años - {p.fecha}
              <p>{p.descripcion}</p>
              <div className="botones">
                <button onClick={() => handleEditar(p)}>Editar</button>
                <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
