import React, {
  useEffect,
  useState,
} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Card from './components/card/Card'
import ViewBox from './components/viewBox/ViewBox'
import ResultGame from './components/resultGame/ResultGame'
import './SpeakIt.scss'

export const request = async (url, config = {}) => {
  try {
    const response = await fetch(url, config);
    return response.json()
  } catch (e) {
    console.log(e.message)
  }
}

const maxCountWord = 20
const activeInit = {
  id: false,
  img: '',
  wordTranslate: '',
}

const Team = () => {
  const audio = document.querySelector('audio')

  const [isFinish, setIsFinish] = useState(false)
  const [words, setWords] = useState([])
  const [active, setActive] = useState(activeInit)
  const [activeAudio, setActiveAudio] = useState('')
  const [isGameMod, setIsGameMod] = useState(false)
  const [gameWordNum, setGameWordNum] = useState(0)
  const [speakWord, setSpeakWord] = useState(null)
  const [gameDifficulty, setGameDifficulty] = useState(0)
  const { finalTranscript, resetTranscript } = useSpeechRecognition()

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  const getData = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;

    try {
      const data = await request(url)

      data.map((item) => {
        item.isGuessed = false;
        item.isNotGuessed = false;
      })
      setWords(data)
    } catch (e) {
      console.log(e.message)
    }
  }
  function checkWord(word) {
    if (word.toLowerCase() === words[gameWordNum].wordTranslate) {
      words[gameWordNum].isGuessed = true;
    } else {
      words[gameWordNum].isNotGuessed = true;
    }
    resetTranscript()
  }
  function showPendingWord(i) {
    if (words && words[i] && Object.keys(words[i]).length > 0) {
      const newActive = { ...active }
      const { id, image, wordTranslate } = words[i]
      newActive.id = id
      newActive.img = image
      newActive.wordTranslate = wordTranslate

      setActive(newActive)
    }
  }
  function startRecording() {
    SpeechRecognition.startListening({ continuous: true })
  }
  function startGame() {
    setIsGameMod(true)
    setActive({
      ...active,
      id: false
    })
    setWords(shuffle(words))
    showPendingWord(gameWordNum)
    startRecording()
  }
  const stopRecording = () => {
    SpeechRecognition.stopListening()
    SpeechRecognition.abortListening()
  }
  function finishedGame() {
    setIsFinish(true)
    setIsGameMod(false)
    stopRecording()
  }
  useEffect(() => {
    if (speakWord !== null && gameWordNum < maxCountWord) {
      checkWord(speakWord)
      setGameWordNum(gameWordNum + 1)
    }
  }, [speakWord])

  useEffect(() => {
    showPendingWord(gameWordNum)

    if (gameWordNum === maxCountWord) {
      finishedGame()
    }
  }, [gameWordNum])

  useEffect(() => {
    init()
  }, [gameDifficulty])

  async function init() {
    await getData(getRandomNum(0, 29), gameDifficulty);
  }
  useEffect(() => {
    init()
  }, [])
  useEffect(() => {
    if (finalTranscript !== '') {
      setSpeakWord(finalTranscript)
    }
  }, [finalTranscript])
  return (
    <div className='SpeakIt'>
      <div className='container'>
        <ViewBox activeImg={active.img} activeAudio={activeAudio} wordTranslate={active.wordTranslate} />
        {
          isGameMod ? '' : <button onClick={startGame}>начать игру</button>
        }
        {
          isGameMod ? <button onClick={finishedGame}>закончить игру</button> : ''
        }
        <div className='levels'>
          <button className={isGameMod ? 'hide' : ''} onClick={() => { setGameDifficulty(0) }}>1</button>
          <button className={isGameMod ? 'hide' : ''} onClick={() => { setGameDifficulty(1) }}>2</button>
          <button className={isGameMod ? 'hide' : ''} onClick={() => { setGameDifficulty(2) }}>3</button>
          <button className={isGameMod ? 'hide' : ''} onClick={() => { setGameDifficulty(3) }}>4</button>
          <button className={isGameMod ? 'hide' : ''} onClick={() => { setGameDifficulty(4) }}>5</button>
          <button className={isGameMod ? 'hide' : ''} onClick={() => { setGameDifficulty(5) }}>6</button>
        </div>
        <div className='cards'>
          {
            words.map((item) => (
              <Card
                {...item}
                key={item.id}
                active={active}
                setActive={setActive}
                setActiveAudio={setActiveAudio}
                isGameMod={isGameMod}
                activeAudio={activeAudio}
              />
            ))
          }
        </div>
        {
          isFinish ?
            <ResultGame
              words={words}
              setWords={setWords}
              setIsFinish={setIsFinish}
              setWords={setWords}
              init={init}
              setGameWordNum={setGameWordNum}
            />
            : ''
        }
      </div>

    </div >
  )
};

export default Team;