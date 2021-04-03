import React,{useState, useEffect} from 'react';
import {  useHistory } from 'react-router-dom';

function LoadingToRedirect() {

    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        },1000)
        count === 0 && history.push("/")
        return () => clearInterval(interval);
    }, [count, history]);

    return (
        <div>
            Redirecting to you in {count} seconds
        </div>
    );
}

export default React.memo(LoadingToRedirect);