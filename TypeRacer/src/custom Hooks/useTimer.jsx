
import { useState, useRef } from 'react';


export default function useTimer({ initialTime, onFinish }) {
    const timerRef = useRef();
    const [timeLeft, setTimeLeft] = useState(initialTime);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev === 1) {
                    clearInterval(timerRef.current)
                    onFinish();
                }
                return prev - 1;
            })
        }, 1000)
    }

    const resetTimer = () => {
        setTimeLeft(initialTime);
        timerRef.current = null;
    }



    return { timeLeft, startTimer, resetTimer };

}