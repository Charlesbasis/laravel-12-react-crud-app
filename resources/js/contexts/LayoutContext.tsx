import React from "react";

export type LayoutPosition = 'left' | 'right';

type LayoutContextType = {
    position: LayoutPosition;
    updatePosition: (val: LayoutPosition) => void;
};

const LayoutContext = React.createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

    const [position, setPosition] = React.useState<LayoutPosition>('left');

    React.useEffect(() => {
        const storedPosition = localStorage.getItem('layoutPosition');

        if (storedPosition === 'left' || storedPosition === 'right') {
            setPosition(storedPosition);
        } 
    }, [])
    

    const updatePosition = (val: LayoutPosition) => {
        setPosition(val);
        localStorage.setItem('layoutPosition', val);
    }

    return <LayoutContext.Provider value={{ position, updatePosition }}>{children}</LayoutContext.Provider>;
};