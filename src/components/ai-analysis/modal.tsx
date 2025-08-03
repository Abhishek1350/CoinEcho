import { Modal, Text } from "@mantine/core";

interface Props {
    children: React.ReactNode;
    isOpen: boolean;
    handleClose: () => void;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    coinName: string;
}

export function AiAnalysisModal({
    children,
    isOpen,
    handleClose,
    coinName,
    size = "md"
}: Props) {
    return (
        <Modal
            opened={isOpen}
            onClose={handleClose}
            title={
                <Text size="lg" fw={700}>
                    AI Analysis for {coinName}
                </Text>
            }
            centered
            classNames={{
                root: "bg-primary",
                content: "bg-primary",
                header: "bg-primary",
            }}
            radius="md"
            size={size}
            zIndex={1000000}
        >
            {children}
        </Modal>
    );
}
