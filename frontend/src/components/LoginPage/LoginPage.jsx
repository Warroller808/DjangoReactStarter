import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './loginPage.css';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage () {
  const navigate = useNavigate();
  const auth = useAuth()
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeIn, setFadeIn] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    setFadeIn(true);
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(formData.email, formData.password);
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      console.error('Échec de la connexion', error);
      setErrorMessage(`Échec de la connexion: ${error}`);
    }
  };

  return (
    <div className={`login-container${fadeIn ? ' fade-in' : ''}`}>
      <form onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <div className='form-group'>
          <label>Nom d'utilisateur: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label>Mot de passe: </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Se connecter</button>
        <p className='errorMessage'>{ errorMessage }</p>
      </form>
    </div>
  );
};