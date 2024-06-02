import React, { useState } from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const [jumpPage, setJumpPage] = useState<number | string>("");

    const pageNumbers = [];
    for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(totalPages, currentPage + 2);
        i++
    ) {
        pageNumbers.push(i);
    }

    const handleJumpPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.valueAsNumber;
        if (value) {
            setJumpPage(value);
        }
    };

    const handleJumpToPage = () => {
        if (typeof jumpPage === "number") {
            onPageChange(jumpPage);
            setJumpPage(""); // Clear the input after jumping
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="flex justify-center items-center space-x-2">
                <button
                    className={`px-4 py-2 bg-blue-500 text-white rounded ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {currentPage > 3 && (
                    <>
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </button>
                        {currentPage > 4 && (
                            <span className="px-4 py-2">...</span>
                        )}
                    </>
                )}
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        className={`px-4 py-2 ${
                            currentPage === number
                                ? "bg-blue-700 text-white"
                                : "bg-gray-200 text-gray-700"
                        } rounded`}
                        onClick={() => onPageChange(number)}
                    >
                        {number}
                    </button>
                ))}
                {currentPage < totalPages - 2 && (
                    <>
                        {currentPage < totalPages - 3 && (
                            <span className="px-4 py-2">...</span>
                        )}
                        <button
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                <button
                    className={`px-4 py-2 bg-blue-500 text-white rounded ${
                        currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="number"
                    value={jumpPage}
                    onChange={handleJumpPageChange}
                    placeholder="Page"
                    className="px-2 py-1 border rounded"
                />
                <button
                    onClick={handleJumpToPage}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                >
                    Jump to Page
                </button>
            </div>
        </div>
    );
};

export default Pagination;
