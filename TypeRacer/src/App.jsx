import './App.css'
import { PARAGRAPH, TOTAL_TIME, CHARACTER_STATUS } from './constants';
import { useRef, useState } from 'react';
import useTimer from './custom Hooks/useTimer';
import { useMemo } from 'react';

const initialCharacters = PARAGRAPH.split('').map(char => {
  return {
    character: char,
    status: CHARACTER_STATUS.UNTYPED
  }
})

function App() {
  const mainRef = useRef();
  const [paragraph, setParagraph] = useState(initialCharacters);
  const [typedCharacters, setTypedCharacters] = useState('');
  const [totalTypedCharacters, setTotalTypedCharacters] = useState(0);
  const [correctlyTypedCharacters, setCorrectlyTypedCharacters] = useState(0);
  // APP States: idle, typing and finished
  const [appState, setAppState] = useState('idle');
  const inputRef = useRef();

  const { timeLeft, startTimer, resetTimer } = useTimer({ initialTime: TOTAL_TIME, onFinish: () => setAppState('finished') })

  const handleType = (event) => {
    if (appState === 'finished') {
      return;
    }

    // Start timer and change state only when the current app state is "idle"
    if (appState === 'idle') {
      setAppState('typing');
      startTimer();
    }

    let isErrorInTyping = false;
    let correctCharacters = 0;
    const value = event.target.value;
    let diff = value.length - typedCharacters.length;
    if (diff > 0) {
      setTotalTypedCharacters(prev => prev + diff);
    }
    const updatedParagraph = paragraph.map((char, index) => {
      let status = CHARACTER_STATUS.UNTYPED;
      if (index < value.length) {
        if (isErrorInTyping) {
          status = CHARACTER_STATUS.INCORRECT;
        } else if (value[index] === char.character) {
          status = CHARACTER_STATUS.CORRECT
          isErrorInTyping = false;
          correctCharacters += 1;
        } else {
          status = CHARACTER_STATUS.INCORRECT
          isErrorInTyping = true;
        }
      }

      return {
        character: char.character,
        status
      }
    })

    setCorrectlyTypedCharacters(correctCharacters);
    setParagraph(updatedParagraph)
    setTypedCharacters(value);

    if (value.length === paragraph.length) {
      setAppState('finished')
    }
  }

  const handleTypeClick = () => {
    if (mainRef.current) {
      inputRef.current.focus();
    }
  }

  const handleRetry = () => {
    resetTimer();
    setParagraph(initialCharacters);
    setAppState('idle')
    setTypedCharacters('');
    setTotalTypedCharacters(0);
    setCorrectlyTypedCharacters(0);
  }

  const analytics = useMemo(() => {
    if (appState == 'finished') {
      const accuracy = ((correctlyTypedCharacters / totalTypedCharacters) * 100).toFixed(2);
      const elapsedTime = TOTAL_TIME - timeLeft;
      const minutes = elapsedTime / 60;
      const wpm = Math.floor(Math.floor(correctlyTypedCharacters / 5) / minutes);
      return {
        wpm,
        accuracy
      }
    }

    return {
      wpm: 0.0,
      accuracy: 0
    }
  }, [appState])


  return (
    <main ref={mainRef} onClick={handleTypeClick}>
      <div className="timer">{timeLeft}</div>
      <div className="paragraph">{paragraph.map((char, index) => {
        return (<span className={`${char.status}`} key={index}>{char.character}</span>)
      })}</div>
      <input type="text" className='inputArea' value={typedCharacters} onChange={handleType} ref={inputRef} />
      {appState === 'finished' && <div className="analytics">
        <p>Words Per Minute: {analytics.wpm}</p>
        <p>Accuracy: {analytics.accuracy}%</p>
        <button onClick={handleRetry}>Retry</button>
      </div>}
    </main>
  )
}

export default App
