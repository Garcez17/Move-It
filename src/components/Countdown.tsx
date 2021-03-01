import { useContext, useEffect, useMemo, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { minutes, seconds, hasFinished, resetCountdown, isActive, startCountdown } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = useMemo(() => {
    return String(minutes).padStart(2, '0').split('');
  }, [minutes]);

  const [secondLeft, secondRight] = useMemo(() => {
    return String(seconds).padStart(2, '0').split('');
  }, [seconds]);
  
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
          onClick={resetCountdown}
        >
          Ciclo encerrado!
        </button>
      ) : (
        <>
          { isActive ? (
            <button 
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          ) }
        </>
      ) }
    </div>
  )
}