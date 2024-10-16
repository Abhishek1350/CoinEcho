import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Group,
    Button,
    Checkbox,
    Anchor,
    Stack,
    Alert,
} from "@mantine/core";
import { AuthModal } from "./Auth-Modal";
import { useAuthModal } from "@/context";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const initialFormValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    isAgree: false,
};

export function AuthForm() {
    const [type, toggle] = useToggle(["login", "register"]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { isOpen, handleClose } = useAuthModal();

    function handleToggle() {
        setError(null);
        toggle();
    }

    function handleCloseModal() {
        form.setValues(initialFormValues);
        if (type === "register") handleToggle();
        setError(null);
        handleClose();
    }

    const form = useForm({
        initialValues: initialFormValues,
        validate:
            type === "register"
                ? {
                    email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
                    password: (val) =>
                        val.length < 6
                            ? "Password should include at least 6 characters"
                            : null,

                    confirmPassword: (val, values) =>
                        val !== values.password ? "Passwords did not match" : null,
                    name: (val) =>
                        val.length < 3 ? "Please enter a valid name" : null,

                    isAgree: (val) => (val ? null : "Please be ready to sign up"),
                }
                : {
                    email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
                },
    });

    async function handleSignup() {
        try {
            setLoading(true);
            setError(null);
            if (loading) return;
            const { error, data } = await supabase.auth.signUp({
                email: form.values.email,
                password: form.values.password,
            });

            if (!!error || !data?.user || !data?.user?.id)
                throw new Error(error?.message ?? "Something went wrong");

            await supabase.from("users").insert({
                id: data.user?.id,
                name: form.values.name,
                email: form.values.email,
            });

            handleCloseModal();
        } catch (error) {
            setError((error as any)?.message ?? "Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleLogin() {
        try {
            setLoading(true);
            setError(null);
            if (loading) return;
            const { error, data } = await supabase.auth.signInWithPassword({
                email: form.values.email,
                password: form.values.password,
            });

            if (!!error || !data?.user || !data?.user?.id)
                throw new Error(error?.message ?? "Something went wrong");

            handleCloseModal();
        } catch (error) {
            setError((error as any)?.message ?? "Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthModal isOpen={isOpen} handleClose={handleCloseModal}>
            <form
                onSubmit={form.onSubmit(() => {
                    type === "login" ? handleLogin() : handleSignup();
                })}
            >
                <Stack>
                    {type === "register" && (
                        <TextInput
                            required
                            label="Name"
                            placeholder="Abhishek"
                            value={form.values.name}
                            onChange={(event) =>
                                form.setFieldValue("name", event.currentTarget.value)
                            }
                            radius="md"
                            error={form.errors.name && "Please enter a valid name"}
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@imabhishek.online"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue("email", event.currentTarget.value)
                        }
                        error={form.errors.email && "Invalid email"}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue("password", event.currentTarget.value)
                        }
                        error={
                            form.errors.password &&
                            "Password should include at least 6 characters"
                        }
                        radius="md"
                    />

                    {type === "register" && (
                        <>
                            <PasswordInput
                                required
                                label="Confirm password"
                                placeholder="Retype your password"
                                value={form.values.confirmPassword}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "confirmPassword",
                                        event.currentTarget.value
                                    )
                                }
                                error={form.errors.confirmPassword && "Passwords did not match"}
                                radius="md"
                            />
                            <Checkbox
                                label="Yup, I'm Ready to Sign Up"
                                checked={form.values.isAgree}
                                onChange={(event) =>
                                    form.setFieldValue("isAgree", event.currentTarget.checked)
                                }
                                error={form.errors.isAgree && "Please be ready to sign up"}
                            />
                        </>
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={() => handleToggle()}
                        size="xs"
                    >
                        {type === "register"
                            ? "Already have an account? Login"
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button
                        loading={loading}
                        disabled={loading}
                        type="submit"
                        variant="outline"
                    >
                        {upperFirst(type)}
                    </Button>
                </Group>
                {error && (
                    <Alert color="red" mt="md" ta="center">
                        {error}
                    </Alert>
                )}
            </form>
        </AuthModal>
    );
}
