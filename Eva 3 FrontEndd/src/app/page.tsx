'use client';

import React, { useState } from 'react';

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

  return (
    <div>
      <h1>Gestión de Personas</h1>

      <form>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={() => {}}
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formulario.edad.toString()}
          onChange={() => {}}
        />
        <select
          name="tipo"
          value={formulario.tipo}
          onChange={() => {}}
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
          onChange={() => {}}
        />
        <input
          type="date"
          name="fecha"
          value={formulario.fecha}
          onChange={() => {}}
        />
        <button type="submit">Agregar</button>
      </form>

      <div className="listado">
        <h2>Listado</h2>
        <p>No hay registros</p>
      </div>
    </div>
  );
}
