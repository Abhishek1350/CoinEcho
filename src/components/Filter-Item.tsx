import { Select, MantineSize, CSSProperties } from "@mantine/core";

interface FilterItemProps {
    value: string;
    data: string[];
    onChange: (value: string) => void;
    maxWidth?: number;
    bg?: "bg-primary" | "bg-secondary";
    size?: MantineSize;
    radius?: MantineSize;
    maxDropdownHeight?: number;
    styles?: CSSProperties;
}

export function FilterItem({
    value,
    data,
    onChange,
    maxWidth = 150,
    bg = "bg-secondary",
    size = "sm",
    radius = "xl",
    maxDropdownHeight = 400,
    styles,
}: FilterItemProps) {
    return (
        <Select
            data={data}
            value={value}
            onChange={(value) => onChange(value!)}
            maw={maxWidth}
            size={size}
            allowDeselect={false}
            checkIconPosition="right"
            maxDropdownHeight={maxDropdownHeight}
            radius={radius}
            classNames={{ dropdown: bg }}
            styles={styles as any}
        />
    );
}
