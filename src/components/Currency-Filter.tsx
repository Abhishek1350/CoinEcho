import { Menu, UnstyledButton, Group, Text } from "@mantine/core";
import { CurrencyFilters } from "@/config/filters";
import { useCurrency } from "@/context/Currency-Context";
import { LazyImage } from "./Lazy-Image";

export function CurrencyFilter() {
  const { selectedCurrency, handleCurrencyChange } = useCurrency();

  return (
    <Menu
      withArrow
      classNames={{ dropdown: "bg-secondary", item: "bg-secondary" }}
      zIndex={1000000}
    >
      <Menu.Target>
        <UnstyledButton miw={70}>
          <Group gap={8}>
            <LazyImage
              src={selectedCurrency.iconUrl}
              width={26}
              alt={selectedCurrency.name}
            />
            <Text>{selectedCurrency.symbol}</Text>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {CurrencyFilters.map((filter) => (
          <Menu.Item
            key={filter.uuid}
            onClick={() => handleCurrencyChange(filter)}
          >
            <UnstyledButton component="div">
              <Group gap={10}>
                <LazyImage
                  src={filter.iconUrl}
                  width={40}
                  alt={filter.name}
                />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {`${filter.sign} - ${filter.symbol}`}
                  </Text>

                  <Text c="dimmed" size="xs">
                    {filter.name}
                  </Text>
                </div>
              </Group>
            </UnstyledButton>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
