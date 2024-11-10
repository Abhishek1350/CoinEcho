import { Menu, UnstyledButton, Avatar, rem, Button } from "@mantine/core";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { User } from "@/lib/types";

interface Props extends User {
    handleSignOut: () => Promise<void>;
    openUpdateProfileModal: () => void;
}

export function ProfileMenuToggle({
    name,
    profile_pic,
    email,
    handleSignOut,
    openUpdateProfileModal
}: Props) {
    return (
        <Menu
            withArrow
            classNames={{ dropdown: "bg-secondary", item: "bg-secondary" }}
            zIndex={1000000}
        >
            <Menu.Target>
                <UnstyledButton>
                    <Avatar name={name} src={profile_pic} radius="xl" color="initials" />
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>
                    {email}
                </Menu.Label>
                <Menu.Item>
                    <Button
                        size="xs"
                        variant="default"
                        rightSection={
                            <IconSettings
                                stroke={1.5}
                                style={{ width: rem(16), height: rem(16) }}
                            />
                        }
                        miw={130}
                        onClick={openUpdateProfileModal}
                    >
                        Update Profile
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button
                        size="xs"
                        variant="outline"
                        color="red"
                        rightSection={
                            <IconLogout
                                stroke={1.5}
                                style={{ width: rem(16), height: rem(16) }}
                            />
                        }
                        miw={130}
                        onClick={handleSignOut}
                    >
                        Logout
                    </Button>
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
