import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <button>
          <Link to="/">Home</Link>
        </button>
        <h3 data-testid="settings-title">Configurações</h3>
        <div>
          <label htmlFor="category_field">Categoria</label>
          <select name="category_field">
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
          <label htmlFor="difficulty_field">Dificuldade</label>
          <select name="difficulty_field">
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
          <label htmlFor="type_field">Tipo</label>
          <select name="type_field">
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </div>

      </div>
    );
  }
}

export default Settings;
