// src/context/AlertContext.tsx
import { createContext, ReactNode, useState, useCallback } from 'react';

type AlertType = 'error' | 'success' | 'warning' | 'info' | null;

interface Alert {
    message: string | null;
    type: AlertType;
}

interface AlertContextProps {
    alert: Alert | null;
    setAlert: (message: string | null, alertType: AlertType) => void;
    clearAlert: () => void;
}

export const AlertContext = createContext<AlertContextProps>({
    alert: null,
    setAlert: () => { },
    clearAlert: () => { },
});

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alert, setAlertState] = useState<Alert | null>(null);

    const setAlert = useCallback((message: string | null, type: AlertType) => {
        setAlertState({ message, type });
    }, []);

    const clearAlert = useCallback(() => {
        setAlertState(null);
    }, []);

    return (
        <AlertContext.Provider value={{ alert, setAlert, clearAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
