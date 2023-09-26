// CharacterProfile.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LostarkApiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMzg4ODcifQ.fApCYnc4stRl_u92SuoGlCJsDmYGGkBbhAm_xc5F_X7p5sgEVR2OViAZa016kXTsTSBr1IMxugrneoy1SYjQQyvOWe_T9ghvCCXSyWL2lW4_RcPOX2JJGJzYkqSUJXnYQFfFErUg0sGQz3hT5cVaIBpIsSXh2K7-wHvTPfT8XovjsUKRf7-Z3m8wXMyrgg3AMWUdwLzm7Zz95r6MllPFqhIqEn3tZPq67f1xPygcfRzLgxQ6Ba94gptSXqIOW638hNFdgirpNwK-QgcS1yOLOl77W0DfqG915OL3MRxsKOYl738ZmuTttGZjplEX7mus4zJ5VP0yNhj7Qpcjr1hjZQ'; // Lostark API 키

function CharacterProfile({ characterName }) {
  const [characterData, setCharacterData] = useState(null);

  useEffect(() => {
    if (!characterName) return; // characterName이 비어있으면 아무 작업도 수행하지 않음

    async function fetchCharacterProfiles() {
      try {
        const encodedCharacterName = encodeURIComponent(characterName);
        const url = `https://developer-lostark.game.onstove.com/armories/characters/${encodedCharacterName}/profiles`;
        const response = await axios.get(url, {
          headers: {
            authorization: `Bearer ${LostarkApiKey}`,
            accept: 'application/json',
            'content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setCharacterData(response.data);
        } else {
          throw new Error('Failed to fetch character profiles');
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchCharacterProfiles(); // characterName이 변경될 때마다 호출
  }, [characterName]);

  return (
    <div className="character-profile">
      {characterData ? (
        <div>
          <h2>{characterData.CharacterName}</h2>
          <p>직업: {characterData.CharacterClassName}</p>
          <p>레벨 : {characterData.ItemMaxLevel}</p>
          <img src={characterData.CharacterImage} alt={characterData.CharacterName} />
          {/* 다른 캐릭터 프로필 정보 표시 */}
        </div>
      ) : (
        <p>캐릭터 정보를 불러오는 중...</p>
      )}
    </div>
  );
}

export default CharacterProfile;
