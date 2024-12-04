import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';
const NUM_PER_PAGE = 3;
const Pagination = ({ count }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const pageNum = searchParam.get('page') || 1;

  const totalPages = Math.ceil(count / NUM_PER_PAGE);
  console.log(totalPages);
  console.log(pageNum);

  const paginationPrevHandler = () => {
    console.log(Number(pageNum - 1));
    console.log(typeof pageNum);
    searchParam.set('page', Number(pageNum) - 1 || pageNum);
    setSearchParam(searchParam);
  };

  const paginationNextHandler = () => {
    searchParam.set(
      'page',
      pageNum >= totalPages ? pageNum : Number(pageNum) + 1
    );
    setSearchParam(searchParam);
  };
  return (
    <footer>
      <div>
        Showing <span>{(pageNum - 1) * NUM_PER_PAGE + 1}</span> to
        <span> {pageNum * NUM_PER_PAGE}</span> of<span>{count}</span> results
      </div>
      <div>
        <button onClick={paginationPrevHandler}>
          <HiChevronLeft />
          <span>Previous</span>
        </button>
        <button onClick={paginationNextHandler}>
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </footer>
  );
};

export default Pagination;
