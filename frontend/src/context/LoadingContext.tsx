import React, { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value
type LoaderContextType = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
// Create the context with a default value
export const LoaderContext = createContext<LoaderContextType>({
    isLoading: false,
    setIsLoading: () => { },
});

// Define the provider component
type LoaderProviderProps = {
    children: ReactNode;
};

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    );
};
