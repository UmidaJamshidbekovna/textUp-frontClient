import { createContext, useContext, useState } from 'react';

const OldStateContext = createContext();

export function OldStateProvider({ children }) {
    const [oldState, setOldState] = useState();

    return (
        <OldStateContext.Provider value={{ oldState, setOldState }}>
            {children}
        </OldStateContext.Provider>
    );
}

export function useOldStateContext() {
    return useContext(OldStateContext);
}
