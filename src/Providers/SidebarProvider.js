import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

const useSidebar = () => {
    const context = useContext(SidebarContext);
    return context;
};

export { SidebarProvider, useSidebar };
