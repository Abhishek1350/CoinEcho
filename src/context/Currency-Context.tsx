import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { CurrencyFilter } from "@/lib/types";
import { CurrencyFilters } from "@/config/filters";

interface CurrencyContextProps {
    children: ReactNode;
}

interface CurrencyContext {
    selectedCurrency: CurrencyFilter;
    handleCurrencyChange: (currency: CurrencyFilter) => void;
}

const CurrencyContext = createContext<CurrencyContext | undefined>(undefined);

export function CurrencyProvider({ children }: CurrencyContextProps) {
    const [selectedCurrency, setSelectedCurrency] = useState<CurrencyFilter>(
        () => {
            const storedCurrency = localStorage.getItem("selectedCurrency");
            return storedCurrency ? JSON.parse(storedCurrency) : CurrencyFilters[0];
        }
    );

    const handleCurrencyChange = useCallback((filter: CurrencyFilter) => {
        setSelectedCurrency(filter);
        localStorage.setItem("selectedCurrency", JSON.stringify(filter));
    }, []);

    return (
        <CurrencyContext.Provider value={{ selectedCurrency, handleCurrencyChange }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
