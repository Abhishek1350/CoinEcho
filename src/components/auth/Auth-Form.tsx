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
    FileInput,
    Avatar,
    Skeleton,
} from "@mantine/core";
import { AuthModal } from "./Auth-Modal";
import { useAuthModal } from "@/context";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { IconImageInPicture } from "@tabler/icons-react";

const initialFormValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    isAgree: false,
    profilePic: "",
};

interface ProfilePic {
    value: File | null;
    error: string;
    loading: boolean;
}

export function AuthForm({ closeDrawer }: { closeDrawer: () => void }) {
    const [type, toggle] = useToggle(["login", "register"]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [profilePic, setProfilePic] = useState<ProfilePic>({
        value: null,
        error: "",
        loading: false,
    });

    const { isOpen, handleClose } = useAuthModal();

    function handleToggle() {
        setError(null);
        toggle();
    }

    function handleCloseModal() {
        form.setValues(initialFormValues);
        setProfilePic({ value: null, error: "", loading: false });
        if (type === "register") handleToggle();
        setError(null);
        closeDrawer();
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

    const showImagePreview = !!profilePic.value && !!form.values.profilePic;

    async function handleImageUpload(file: File | null) {
        if (!file || profilePic.loading) return;

        if (
            !["image/png", "image/webp", "image/jpg", "image/jpeg"].includes(
                file.type
            )
        ) {
            return setProfilePic((prev) => ({ ...prev, error: "Invalid file type" }));
        }

        if (file.size > 2 * 1024 * 1024) {
            return setProfilePic((prev) => ({
                ...prev,
                error: "File size should be less than 2MB",
            }));
        }

        setProfilePic((prev) => ({
            ...prev,
            loading: true,
            value: file,
            error: "",
        }));

        try {
            const { data, error } = await supabase.storage
                .from("Profile_Pics")
                .upload(file.name, file, {
                    cacheControl: "3600",
                    upsert: true,
                });
            if (error) throw new Error();

            const {
                data: { publicUrl },
            } = supabase.storage.from("Profile_Pics").getPublicUrl(data.path);

            form.setFieldValue("profilePic", publicUrl);
        } catch (error) {
            setProfilePic((prev) => ({
                ...prev,
                value: null,
                error: "Something went wrong",
            }));
        } finally {
            setProfilePic((prev) => ({
                ...prev,
                loading: false,
            }));
        }
    }

    async function handleSignup() {
        if (loading || profilePic.loading) return;
        try {
            setLoading(true);
            setError(null);
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
                profile_pic: form.values.profilePic,
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
        if (loading) return;
        try {
            setLoading(true);
            setError(null);
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
        <AuthModal
            size={type === "register" ? "md" : "sm"}
            isOpen={isOpen}
            handleClose={handleCloseModal}
        >
            <form
                onSubmit={form.onSubmit(() => {
                    type === "login" ? handleLogin() : handleSignup();
                })}
            >
                {type === "login" ? (
                    <Stack>
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
                    </Stack>
                ) : (
                    <Stack>
                        <Group grow>
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
                        </Group>

                        <Group grow>
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
                        </Group>

                        {
                            profilePic.loading ? (
                                <Skeleton h={50} />
                            ) : (
                                showImagePreview ? (
                                    <Group gap={5}>
                                        <Avatar
                                            src={form.values.profilePic}
                                            radius="xl"
                                            size="lg"
                                            alt={form.values.name}
                                        />
                                        <FileInput
                                            rightSection={<IconImageInPicture />}
                                            placeholder="Upload profile image"
                                            rightSectionPointerEvents="none"
                                            accept="image/png,image/jpeg,image/webp,image/png"
                                            value={profilePic.value}
                                            onChange={handleImageUpload}
                                            multiple={false}
                                            classNames={{ input: "bg-secondary" }}
                                            styles={{ input: { height: "50px" } }}
                                            radius="md"
                                            error={profilePic.error && profilePic.error}
                                            disabled={profilePic.loading}
                                            style={{ flex: 1 }}
                                        />
                                    </Group>
                                ) : (
                                    <FileInput
                                        rightSection={<IconImageInPicture />}
                                        label="Profile Image"
                                        placeholder="Upload profile image"
                                        rightSectionPointerEvents="none"
                                        accept="image/png,image/jpeg,image/webp,image/png"
                                        value={profilePic.value}
                                        onChange={handleImageUpload}
                                        multiple={false}
                                        classNames={{ input: "bg-secondary" }}
                                        styles={{ input: { height: "50px" } }}
                                        radius="md"
                                        error={profilePic.error && profilePic.error}
                                        disabled={profilePic.loading}
                                    />
                                )
                            )
                        }

                        <Checkbox
                            label="Yup, I'm Ready to Sign Up"
                            checked={form.values.isAgree}
                            onChange={(event) =>
                                form.setFieldValue("isAgree", event.currentTarget.checked)
                            }
                            error={form.errors.isAgree && "Please be ready to sign up"}
                        />
                    </Stack>
                )}

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
