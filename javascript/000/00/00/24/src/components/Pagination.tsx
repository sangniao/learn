interface Props {
  postsPerPage: number;
  totalPosts: number;
  paginate: (value: number) => void;
}

export function Pagination({ postsPerPage, totalPosts, paginate }: Props) {
  const pageNumbers = Array(Math.ceil(totalPosts / postsPerPage))
    .fill(0)
    .map((e, i) => i + 1);

  return (
    <ul className="pagination">
      {pageNumbers.map((pageNumber) => (
        <li key={pageNumber} onClick={() => paginate(pageNumber)}>
          <span className="page">{pageNumber}</span>
        </li>
      ))}
    </ul>
  );
}
