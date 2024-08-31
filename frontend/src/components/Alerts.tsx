// src/components/Alerts.tsx
import { useContext, useEffect } from 'react';
import { AlertContext } from '../context/AlertContext';

const Alerts: React.FC = () => {
    const { alert, clearAlert } = useContext(AlertContext);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                clearAlert();
            }, 5000); // Clear alert after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [alert, clearAlert]);

    if (!alert) return null;

    const alertClasses = {
        error: 'bg-red-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
    };

    return (
        <div role="alert" className='fixed top-0 w-full p-4 z-50'>
            <div className={`p-4 rounded ${alertClasses[alert.type || 'info']}`}>
                <p>{alert.message}</p>
            </div>
        </div>
    );
};

export default Alerts;
