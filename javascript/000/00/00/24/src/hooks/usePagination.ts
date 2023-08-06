import { useState } from "react";

const initialData = {
  currentPage: 1,
  itemsPerPage: 10,
};

export function usePagination<T>(items: T) {
  const [currentPage, setCurrentPage] = useState(initialData.currentPage);
  const [itemsPerPage] = useState(initialData.itemsPerPage);

  if (!Array.isArray(items)) throw "Expected items to be an array";

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = items.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return { currentItems, itemsPerPage, paginate };
}
