import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Group,
    Button,
    Anchor,
    Stack,
    Alert,
    FileInput,
    Skeleton,
    Avatar,
} from "@mantine/core";
import { AuthModal } from "./Auth-Modal";
import { useAuth, useAuthModal } from "@/context";
import { supabase } from "@/lib/supabase";
import { useMemo, useState } from "react";
import { IconImageInPicture } from "@tabler/icons-react";

interface ProfilePic {
    value: File | null;
    error: string;
    loading: boolean;
}

export function UpdateProfile({ closeDrawer }: { closeDrawer: () => void }) {
    const [type, toggle] = useToggle(["updateProfile", "resetPassword"]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const [profilePic, setProfilePic] = useState<ProfilePic>({
        value: null,
        error: "",
        loading: false,
    });

    const initialFormValues = useMemo(() => {
        return type === "resetPassword"
            ? {
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            }
            : {
                name: user?.name ?? "",
                profilePic: user?.profile_pic ?? "",
            };
    }, [user]);

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
            type === "resetPassword"
                ? {
                    newPassword: (val: string) =>
                        val.length < 6
                            ? "Password should include at least 6 characters"
                            : null,
                    confirmPassword: (val: string, values: any) =>
                        val !== values.newPassword ? "Passwords did not match" : null,
                }
                : {
                    name: (val: string) =>
                        val.length < 3 ? "Please enter a valid name" : null,
                },
    });

    const profileImage = type === "updateProfile" && form.values.profilePic;

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

    async function handleSubmit() {
        if (loading || profilePic.loading) return;
        try {
            setLoading(true);
            setError(null);

            if (type === "resetPassword") throw new Error("Not implemented yet");
            const { error } = await supabase
                .from("users")
                .update({
                    name: form.values.name,
                    profile_pic: form.values.profilePic,
                })
                .eq("id", user?.id);

            if (error) throw new Error(error.message);
            supabase.auth.updateUser({ data: { name: form.values.name } });

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
            isOpen={isOpen}
            handleClose={handleCloseModal}
            type={type as any}
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                {type === "resetPassword" ? (
                    <Stack>
                        <PasswordInput
                            required
                            label="Current password"
                            placeholder="Enter your current password"
                            value={form.values.currentPassword}
                            onChange={(event) =>
                                form.setFieldValue("currentPassword", event.currentTarget.value)
                            }
                            error={form.errors.password && "Please enter a valid password"}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="New password"
                            placeholder="Enter your new password"
                            value={form.values.newPassword}
                            onChange={(event) =>
                                form.setFieldValue("newPassword", event.currentTarget.value)
                            }
                            error={
                                form.errors.newPassword &&
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
                                form.setFieldValue("confirmPassword", event.currentTarget.value)
                            }
                            error={form.errors.confirmPassword && "Passwords did not match"}
                            radius="md"
                        />
                    </Stack>
                ) : (
                    <Stack>
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

                        {profilePic.loading ? (
                            <Skeleton h={50} />
                        ) : profileImage ? (
                            <Group gap={5}>
                                <Avatar
                                    src={profileImage as string}
                                    radius="xl"
                                    size="lg"
                                    alt={user?.name}
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
                        )}
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
                        {type === "resetPassword"
                            ? "Want to update your password?"
                            : "Want to update your profile?"}
                    </Anchor>
                    <Button
                        loading={loading}
                        disabled={loading}
                        type="submit"
                        variant="outline"
                    >
                        {type === "resetPassword" ? "Update Password" : "Update"}
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
