
import axios from 'axios';

const LostarkApiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAwMzg4ODcifQ.fApCYnc4stRl_u92SuoGlCJsDmYGGkBbhAm_xc5F_X7p5sgEVR2OViAZa016kXTsTSBr1IMxugrneoy1SYjQQyvOWe_T9ghvCCXSyWL2lW4_RcPOX2JJGJzYkqSUJXnYQFfFErUg0sGQz3hT5cVaIBpIsSXh2K7-wHvTPfT8XovjsUKRf7-Z3m8wXMyrgg3AMWUdwLzm7Zz95r6MllPFqhIqEn3tZPq67f1xPygcfRzLgxQ6Ba94gptSXqIOW638hNFdgirpNwK-QgcS1yOLOl77W0DfqG915OL3MRxsKOYl738ZmuTttGZjplEX7mus4zJ5VP0yNhj7Qpcjr1hjZQ';

async function fetchCharacters(characterName) {
  try {
    characterName = encodeURIComponent(characterName);
    const url = `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`;
    const response = await axios.get(url, {
      headers: {
        authorization: `Bearer ${LostarkApiKey}`,
        accept: 'application/json',
        'content-Type': 'application/json',
      },
    });
    
    if (response.status === 200) {
      const characters = response.data;
      // 이미지 URL을 가져오는 추가 API 요청
      const charactersWithImages = await Promise.all(
        characters.map(async (character) => {
          const characterName = character.CharacterName;
          const characterImageResponse = await axios.get(
            `https://api.example.com/CharacterImage?CharacterName=${characterName}`
          );
          character.CharacterImage = characterImageResponse.data.imageUrl;
          return character;
        })
      );
      return charactersWithImages;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export default fetchCharacters;