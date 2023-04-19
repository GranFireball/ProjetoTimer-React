import { useEffect, useRef, useState } from "react";

export default function Timer(){
    const [count, setCount] = useState();
    const [state, setState] = useState('Config');
    const [inputMinutos, setInputMinutos] = useState();
    const [inputSegundos, setInputSegundos] = useState();
    const [minutos, setMinutos] = useState();
    const [segundos, setSegundos] = useState();
    const timerRef = useRef();

    useEffect(() =>{
        setMinutos(Math.floor(count/60));
        setSegundos(count%60);
        if(count < 0){
            timerRef.current && clearInterval(timerRef.current);  
            setState('Config');
        }
    }, [count])
    
    useEffect(() => {
        if(state === 'Running'){
            timerRef.current = setInterval(() => {
                setCount((curr) => curr - 1)
            }, 1000);
        }
        if(state === 'Pause'){
            timerRef.current && clearInterval(timerRef.current);
        }
        
    }, [state]);

    function Iniciar(){
        
        if(state === 'Config'){
            if(inputMinutos !== '' && inputSegundos !== '' && (minutos > 0 || segundos > 0)){
                setCount(minutos * 60 + segundos);   
                setState('Running');
            }
        }
        
    }
    
    return(
        <div>
            {state === 'Config' &&
            <>
            <input type="number"  placeholder="Minutos" onChange={(e) => {setMinutos(parseInt((e.target.value))); setInputMinutos(e.target.value);}}/>
            <input type="number" placeholder="Segundos" onChange={(e) => {setSegundos(parseInt(e.target.value)); setInputSegundos(e.target.value);}}/>
            <button onClick={Iniciar}>Iniciar</button>
            </>
            }
            {count >= 0  && 
            <>
            {minutos}:{segundos}
            <button onClick={() => setState('Running')}>Play</button>
            <button onClick={() => setState('Pause')}>Pause</button>
            <button onClick={() => setCount(-1)}>Stop</button>
            </>
            }
        </div>
    );
}