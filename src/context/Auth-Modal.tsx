import { createContext, useContext, ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

interface AuthModalContextProps {
    children: ReactNode;
}

interface AuthModal {
    isOpen: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const AuthModalContext = createContext<AuthModal | undefined>(undefined);

export function AuthModalProvider({ children }: AuthModalContextProps) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <AuthModalContext.Provider
            value={{ isOpen: opened, handleOpen: open, handleClose: close }}
        >
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const context = useContext(AuthModalContext);
    if (!context) {
        throw new Error("AuthModalContext must be used within a CurrencyProvider");
    }
    return context;
}
