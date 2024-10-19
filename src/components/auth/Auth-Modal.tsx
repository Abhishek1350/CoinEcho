import { Modal, Text } from "@mantine/core";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
    type?: "auth" | "resetPassword" | "updateProfile";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const headingText = {
    auth: "Welcome to CoinEcho",
    resetPassword: "Forgot your password?",
    updateProfile: "Update your profile",
};

export function AuthModal({
    children,
    isOpen,
    handleClose,
    type = "auth",
    size = "sm"
}: Props) {
    return (
        <Modal
            opened={isOpen}
            onClose={handleClose}
            title={
                <Text size="lg" fw={700}>
                    {headingText[type] || "Welcome to CoinEcho"}
                </Text>
            }
            centered
            classNames={{
                root: "bg-primary",
                content: "bg-primary",
                header: "bg-primary",
            }}
            radius="lg"
            size={size}
            zIndex={1000000}
        >
            {children}
        </Modal>
    );
}
