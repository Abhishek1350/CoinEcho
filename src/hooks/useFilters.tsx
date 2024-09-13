import { useCallback, useReducer } from "react";
import { orderDirectionFilters } from "@/config/filters";
import { useSearchParams, useNavigate } from "react-router-dom";

interface FiltersState {
    timeline: string;
    orderBy: string;
    orderDirection: string;
}

type FilterType = "timeline" | "orderBy" | "orderDirection" | "reset";

interface FilterAction {
    type: FilterType;
    payload?: string;
}

const defaultFilterState = {
    timeline: "3h",
    orderBy: "Market Cap",
    orderDirection: orderDirectionFilters[0].label,
};

function filterReducer(
    state: FiltersState,
    action: FilterAction
): FiltersState {
    switch (action.type) {
        case "timeline":
        case "orderBy":
        case "orderDirection":
            return { ...state, [action.type]: action.payload ?? "" };

        case "reset":
            return defaultFilterState;

        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

export function useFilters() {
    const [searchParams] = useSearchParams();
    const [state, dispatch] = useReducer(filterReducer, handleInitialFilters());
    const navigate = useNavigate();

    const handleFilterChange = useCallback(
        (type: FilterType, payload?: string) => {
            dispatch({ type, payload });
            const newSearchParams = new URLSearchParams(searchParams.toString());
            if (payload) {
                newSearchParams.set(type, payload);
            } else {
                newSearchParams.delete(type);
            }
            navigate(`?${newSearchParams.toString()}`);
        },
        [dispatch, navigate, searchParams]
    );

    function handleInitialFilters() {
        const timeline = searchParams.get("timeline");
        const orderBy = searchParams.get("orderBy");
        const orderDirection = searchParams.get("orderDirection");

        return {
            timeline: timeline ?? defaultFilterState.timeline,
            orderBy: orderBy ?? defaultFilterState.orderBy,
            orderDirection: orderDirection ?? defaultFilterState.orderDirection,
        };
    }

    const currentPage = Number(searchParams.get("page")) || 1;

    const { timeline, orderBy, orderDirection } = state;

    return { currentPage, handleFilterChange, timeline, orderBy, orderDirection };
}
