import { Pagination as MantinePagination } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange?: () => void;
}

export function Pagination({
    totalItems,
    itemsPerPage = 20,
    currentPage = 1,
    onPageChange
}: PaginationProps) {
    const navigate = useNavigate();
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = usePagination({
        total: totalPages,
        initialPage: currentPage,
    });

    function handlePageChange(page: number) {
        navigate(`?page=${page}`);
        onPageChange && onPageChange();
        pagination.setPage(page);
    }

    return (
        <MantinePagination
            value={pagination.active}
            total={totalPages}
            onChange={handlePageChange}
            styles={{ root: { display: "flex", justifyContent: "center" } }}
            classNames={{ control: "bg-secondary" }}
            hideWithOnePage
            siblings={0}
        />
    );
}
