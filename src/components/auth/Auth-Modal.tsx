import { Modal, Text } from "@mantine/core";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
    type?: "auth" | "resetPassword";
}

export function AuthModal({
    children,
    isOpen,
    handleClose,
    type = "auth",
}: Props) {
    return (
        <Modal
            opened={isOpen}
            onClose={handleClose}
            title={
                <Text size="lg" fw={700}>
                    {type === "resetPassword"
                        ? "Forgot your password?"
                        : "Welcome to CoinEcho"}
                </Text>
            }
            centered
            classNames={{
                root: "bg-primary",
                content: "bg-primary",
                header: "bg-primary",
            }}
            radius="lg"
            size="sm"
            zIndex={1000000}
        >
            {children}
        </Modal>
    );
}
