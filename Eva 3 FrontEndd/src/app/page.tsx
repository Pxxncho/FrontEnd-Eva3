'use client';

import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Gestión de Personas</h1>

    <form>
        <input type="text" name="nombre" placeholder="Nombre" />
        <input type="number" name="edad" placeholder="Edad" />
        <select name="tipo">
          <option value="">Selecciona tipo</option>
          <option value="Evento">Evento</option>
          <option value="Beneficiario">Beneficiario</option>
          <option value="Voluntario">Voluntario</option>
        </select>
        <textarea name="descripcion" placeholder="Descripción" />
        <input type="date" name="fecha" />
        <button type="submit">Agregar</button>
    </form>

    <div className="listado">
        <h2>Listado</h2>
        <p>No hay registros</p>
        </div>
    </div>
  );
}



