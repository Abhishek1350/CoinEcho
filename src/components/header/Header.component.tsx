import {
    Group,
    Button,
    Divider,
    Container,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineColorScheme,
    ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Logo, CurrencyFilter } from "../";
import { useFilters } from "@/hooks/useFilters";
import { useAuthModal, useAuth } from "@/context";
import { AuthForm, ProfileMenuToggle } from "@/components";

export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);

    const { colorScheme, setColorScheme } = useMantineColorScheme();

    const { handleResetFilters } = useFilters();

    const { handleOpen } = useAuthModal();

    const { user, handleSignOut } = useAuth();

    function toggleTheme() {
        if (colorScheme === "light") {
            setColorScheme("dark");
        } else {
            setColorScheme("light");
        }
        if (drawerOpened) closeDrawer();
    }

    function renderAuthButton() {
        if (user) {
            return (
                <ProfileMenuToggle {...user} handleSignOut={handleSignOut} />
            );
        } else {
            return <Button onClick={handleOpen}>Log In</Button>;
        }
    }

    return (
        <>
            <header className={classes.header}>
                <Container size="lg" className={classes.container}>
                    <Group justify="space-between" h="100%">
                        <Logo onClick={handleResetFilters} />
                        <Group h="100%" gap={0} visibleFrom="sm">
                            <Link to="/" className={classes.link}>
                                Home
                            </Link>
                            <Link to="/latest-news" className={classes.link}>
                                Crypto News
                            </Link>
                        </Group>
                        <Group visibleFrom="sm">
                            <ActionIcon
                                variant="transparent"
                                aria-label="Theme toggler"
                                onClick={() => toggleTheme()}
                                radius="xl"
                            >
                                {colorScheme === "light" ? (
                                    <IconMoon style={{ width: rem(24), height: rem(24) }} />
                                ) : (
                                    <IconSun style={{ width: rem(24), height: rem(24) }} />
                                )}
                            </ActionIcon>
                            <CurrencyFilter />
                            {renderAuthButton()}
                        </Group>
                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            hiddenFrom="sm"
                        />
                    </Group>
                </Container>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="CoinEcho"
                hiddenFrom="sm"
                zIndex={999999}
                classNames={{
                    header: "bg-secondary",
                }}
            >
                <ScrollArea
                    h={`calc(100vh - ${rem(80)})`}
                    mx="-md"
                    className="bg-secondary"
                >
                    <Divider my="sm" />

                    <Link to="/" className={classes.link}>
                        Home
                    </Link>
                    <Link to="/news" className={classes.link}>
                        News
                    </Link>

                    <Divider my="sm" />

                    <Group justify="center" pb="xl" px="md">
                        <ActionIcon
                            variant="transparent"
                            aria-label="Theme toggler"
                            onClick={() => toggleTheme()}
                            radius="xl"
                        >
                            {colorScheme === "light" ? (
                                <IconMoon style={{ width: rem(24), height: rem(24) }} />
                            ) : (
                                <IconSun style={{ width: rem(24), height: rem(24) }} />
                            )}
                        </ActionIcon>
                        <CurrencyFilter />
                        {renderAuthButton()}
                    </Group>
                </ScrollArea>
            </Drawer>

            <AuthForm />
        </>
    );
}
