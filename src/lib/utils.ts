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
    if (shortName.length > 20) {
        return shortName.slice(0, 10) + "...";
    }
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
    // some values can be null so remove them
    const filterdValues = strings.filter((value) => value !== null);
    return filterdValues.map(parseFloat);
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

export function getReadableDateTime(timestamp: number | undefined): string {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
}

export function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getUTCDay()];

    const dayNumber = date.getUTCDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${dayOfWeek}, ${dayNumber} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const secondsInMinute = 60;
    const secondsInHour = 60 * 60;
    const secondsInDay = 24 * 60 * 60;
    const secondsInWeek = 7 * 24 * 60 * 60;

    let timeAgo: string;

    if (diffInSeconds < secondsInMinute) {
        timeAgo = diffInSeconds <= 5 ? 'Just now' : `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secondsInHour) {
        const minutes = Math.floor(diffInSeconds / secondsInMinute);
        timeAgo = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (diffInSeconds < secondsInDay) {
        const hours = Math.floor(diffInSeconds / secondsInHour);
        timeAgo = hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (diffInSeconds < secondsInWeek) {
        const days = Math.floor(diffInSeconds / secondsInDay);
        timeAgo = days === 1 ? '1 day ago' : `${days} days ago`;
    } else {
        timeAgo = getTimeAgo(dateString);
    }

    return timeAgo;
}

