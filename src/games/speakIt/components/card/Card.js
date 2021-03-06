import React from 'react';
import './Card.scss';

const Card = ({
  word, transcription, active, setActive,
  id, image, setActiveAudio,
  audio, wordTranslate,
  isGameMod, isGuessed, isNotGuessed
}) => {
  const isActive = active.id === id;

  function setCurrentItem(id, image, setActive) {
    if (isActive && document.querySelector('audio')) {
      document.querySelector('audio').play()
    } else {
      setActive({
        id,
        img: image,
        wordTranslate
      })

      setActiveAudio(audio)
    }

  }
  return (
    <div
      className={
        [
          'Card ',
          isActive ? 'isActive' : '',
          id,
          isGameMod ? 'isGame' : '',
          isGuessed ? 'isGuessed' : '',
          isNotGuessed ? "isNotGuessed" : ''
        ].join(' ')}
      onClick={() => setCurrentItem(id, image, setActive)}
    >
      <p>{word}</p>
      <p>{transcription}</p>
    </div>
  )
}
export default Card
