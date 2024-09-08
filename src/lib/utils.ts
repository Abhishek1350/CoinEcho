import { ListsCoin } from "./types";

/**
 * Builds a URL by appending the given query parameters to the given base URL.
 *
 * @param {string} baseUrl - The base URL to append the query parameters to.
 * @param {Object.<string, any>} [params={}] - The query parameters to append to the URL.
 * @returns {string} The resulting URL with the query parameters appended.
 */
export function buildUrlWithParams(
    baseUrl: string,
    params: Record<string, any> = {}
): string {
    const url = new URL(baseUrl);
    Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key].toString());
        }
    });
    return url.toString();
}

/**
 * Formats a number as a compact currency string (e.g. 1.2M for 1,200,000).
 *
 * @param {number} value - The number to format.
 * @returns {string} The formatted string.
 */
export const formatCompactCurrency = (value: number | string | undefined) => {
    if (!value) return "";
    if (typeof value === "string") value = Number(value);
    const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
    });
    const compactValue = formatter.format(value);
    const fullValue = compactValue.includes("M")
        ? compactValue.replace("M", " Million")
        : compactValue.includes("B")
            ? compactValue.replace("B", " Billion")
            : compactValue.replace("T", " Trillion");
    return fullValue;
};

/**
 * Gets a shortened version of the given name, by taking the first n words of the name
 * and joining them with a space.
 *
 * @param {string} name - The name to shorten.
 * @param {number} [length=2] - The number of words to include in the shortened name.
 * @returns {string} The shortened name.
 */
export function shortName(name: string, length: number = 2): string {
    if (!name) return "";
    const words = name.split(" ");
    const shortName = words.slice(0, length).join(" ");
    return shortName;
}

/**
 * Converts an array of strings to an array of numbers by using parseFloat
 * on each string.
 *
 * @param {string[]} strings - The array of strings to convert.
 * @returns {number[]} The resulting array of numbers.
 */
export function prepareSparklineData(strings: string[]): number[] {
    return strings.map(parseFloat);
}

/**
 * Sorts the given array of coins by the given property name in ascending order.
 * If the reversed flag is set, the array is reversed after sorting.
 * If no property name is given, the array is returned as is.
 *
 * @param {null | "name"} by - The property name to sort by, or null to not sort.
 * @param {boolean} reversed - Whether to reverse the sorted array.
 * @param {ListsCoin[]} items - The array of coins to sort.
 * @returns {ListsCoin[]} The sorted array of coins.
 */
export function sortCoins(
    by: null | "name",
    reversed: boolean,
    items: ListsCoin[]
): ListsCoin[] {
    if (!items || !items.length) return items;

    if (by) {
        return items.sort((a: ListsCoin, b: ListsCoin) => {
            if (a[by] < b[by]) return -1;
            if (a[by] > b[by]) return 1;
            return 0;
        });
    }

    if (reversed) {
        return items.reverse();
    }

    return items;
}
