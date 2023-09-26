// App.js

import React, { useState } from 'react';
import CharacterProfile from './components/CharacterProfile';

function App() {
  const [characterName, setCharacterName] = useState('');

  const handleCharacterNameChange = (e) => {
    setCharacterName(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Character Name"
        value={characterName}
        onChange={handleCharacterNameChange}
      />
      <CharacterProfile characterName={characterName} />
    </div>
  );
}

export default App;
