import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <button>
          <Link to="/">Home</Link>
        </button>
        <h2 data-testid="settings-title">configurações</h2>
        <p>Em construção</p>
      </div>
    );
  }
}

export default Settings;
