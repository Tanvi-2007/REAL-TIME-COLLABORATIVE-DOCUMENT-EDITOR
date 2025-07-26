import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.on('load-document', doc => setContent(doc));
    socket.on('receive-changes', doc => setContent(doc));
    return () => socket.disconnect();
  }, []);

  const handleChange = (e) => {
    const newText = e.target.value;
    setContent(newText);
    socket.emit('send-changes', newText);
  };

  const styles = {
    outerContainer: {
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      background: 'linear-gradient(to right, #c9d6ff, #e2e2e2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '16px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      width: '90%',
      maxWidth: '900px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '32px',
      color: '#333',
      marginBottom: '10px',
    },
    subheading: {
      fontSize: '18px',
      color: '#666',
      marginBottom: '30px',
    },
    textarea: {
      width: '100%',
      height: '350px',
      padding: '20px',
      fontSize: '16px',
      lineHeight: '1.6',
      borderRadius: '12px',
      border: '1px solid #ccc',
      resize: 'none',
      boxSizing: 'border-box',
      backgroundColor: '#f9f9f9',
      outline: 'none',
      boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.1)',
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📝 Tanvi's Task 3</h1>
        <h2 style={styles.subheading}>Real-Time Collaborative Editor</h2>
        <textarea
          style={styles.textarea}
          value={content}
          onChange={handleChange}
          placeholder="Start typing and collaborate in real-time..."
        />
      </div>
    </div>
  );
}

export default App;