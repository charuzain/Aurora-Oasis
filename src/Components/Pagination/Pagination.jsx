import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';
import { NUM_PER_PAGE } from '../../utils/constants';

const Pagination = ({ count }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const pageNum = searchParam.get('page') || 1;

  const totalPages = Math.ceil(count / NUM_PER_PAGE);

  const paginationPrevHandler = () => {
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
        <span>
          {' '}
          {pageNum * NUM_PER_PAGE >= count ? count : pageNum * NUM_PER_PAGE}
        </span>{' '}
        of<span>{count}</span> results
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
