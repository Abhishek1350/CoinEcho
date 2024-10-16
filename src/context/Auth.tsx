import {
    createContext,
    useContext,
    ReactNode,
    useState,
    useEffect,
    useCallback,
} from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@/lib/types";

interface AuthContextProps {
    children: ReactNode;
}

interface AuthContextData {
    user: User | null;
    handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: AuthContextProps) {
    const [user, setUser] = useState<User | null>(null);

    const handleSignOut = useCallback(async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            return console.log(error);
        }
        setUser(null);
    }, []);

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_, session) => {
                if (session?.user) {
                    supabase
                        .from("users")
                        .select("*")
                        .eq("id", session?.user?.id)
                        .single()
                        .then(({ data }) => {
                            setUser(data);
                        });
                }
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, handleSignOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext must be used within a CurrencyProvider");
    }
    return context;
}
