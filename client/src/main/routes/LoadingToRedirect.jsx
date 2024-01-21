import React,{useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function LoadingToRedirect({role}) {

    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        if (role !== 'admin') {
           count === 0 && history.push("/")
        } else {
           count === 0 && history.push("/admin/dashboard")
        }
        return () => clearInterval(interval);
    }, [count, history, role]);

    return (
        <div>
            Redirecting to you in {count} seconds
        </div>
    );
}

export default React.memo(LoadingToRedirect);