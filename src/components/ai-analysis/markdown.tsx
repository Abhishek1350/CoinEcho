import { Text, Title } from "@mantine/core";
import ReactMarkdown, { Components } from "react-markdown";

export function Markdown({ content }: Readonly<{ content: string }>) {
    const markdownComponents: Components = {
        h1: ({ children }) => (
            <Title order={3} my="sm">
                {children}
            </Title>
        ),
        h2: ({ children }) => (
            <Title order={4} my="sm">
                {children}
            </Title>
        ),
        h3: ({ children }) => (
            <Title order={5} my="sm">
                {children}
            </Title>
        ),
        h4: ({ children }) => (
            <Title order={6} my="sm">
                {children}
            </Title>
        ),
        h5: ({ children }) => (
            <Title order={6} my="sm">
                {children}
            </Title>
        ),
        h6: ({ children }) => (
            <Title order={6} my="sm">
                {children}
            </Title>
        ),
        p: ({ children }) => <Text my="sm">{children}</Text>,
        strong: ({ children }) => (
            <strong style={{ fontWeight: 600 }}>{children}</strong>
        ),
        ul: ({ children }) => (
            <ul style={{ paddingLeft: "1.5em", marginBottom: "0.5em" }}>
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol style={{ paddingLeft: "1.5em", marginBottom: "0.5em" }}>
                {children}
            </ol>
        ),
        li: ({ children }) => (
            <li style={{ marginBottom: "0.25em" }}>{children}</li>
        ),
    };
    return (
        <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    );
}
