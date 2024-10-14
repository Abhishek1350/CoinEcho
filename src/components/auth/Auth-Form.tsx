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
} from "@mantine/core";
import { AuthModal } from "./Auth-Modal";
import { useAuthModal } from "@/context";

const initialFormValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    isAgree: false,
};

export function AuthForm() {
    const [type, toggle] = useToggle(["login", "register"]);

    const { isOpen, handleClose } = useAuthModal();

    function handleCloseModal() {
        form.setValues(initialFormValues);
        if (type === "register") toggle();
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

                    isAgree: (val) =>
                        val ? null : "Please be ready to sign up",
                }
                : {
                    email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
                },
    });

    return (
        <AuthModal isOpen={isOpen} handleClose={handleCloseModal}>
            <form onSubmit={form.onSubmit(() => { })}>
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
                                error={
                                    form.errors.isAgree &&
                                    "Please be ready to sign up"
                                }
                            />
                        </>
                    )}
                </Stack>

                <Group justify="space-between" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        c="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === "register"
                            ? "Already have an account? Login"
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit">{upperFirst(type)}</Button>
                </Group>
            </form>
        </AuthModal>
    );
}
