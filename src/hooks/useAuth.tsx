import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setUser(data?.session?.user ?? null);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    return { user, setUser };
}
