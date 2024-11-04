// client/src/App.js
import React, { useState, useEffect } from 'react';
import socket from './socket';
import { useParams } from 'react-router-dom';

function App() {
  const { documentId } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (documentId) {
      // Join the document room
      socket.emit('joinDocument', documentId);

      // Listen for changes from other users
      socket.on('receiveChanges', (delta) => {
        setContent((prevContent) => prevContent + delta);
      });
    }

    // Cleanup when component unmounts
    return () => {
      socket.off('receiveChanges');
    };
  }, [documentId]);

  const handleChange = (e) => {
    const delta = e.target.value.slice(content.length);
    setContent(e.target.value);

    // Emit changes to other users
    socket.emit('sendChanges', { documentId, delta });
  };

  return (
    <div>
      <h2>Document Editor</h2>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Start typing here..."
        rows="20"
        cols="50"
      />
    </div>
  );
}

export default App;
