import _ from 'lodash';

const Pagination = (props) => {
    const {
        itemsCount,
        pageSize,
        currentPage,
        onPageChange,
        onClickPrevious,
        onClickNext,
    } = props;

    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);

    return (
        <nav>
            <ul className="pagination cursor">
                <li
                    className={
                        currentPage > 1 ? 'page-item' : 'page-item disabled'
                    }
                >
                    <a className="page-link" onClick={() => onClickPrevious()}>
                        Previous
                    </a>
                </li>

                {pages.map((page) => (
                    <li
                        key={page}
                        className={
                            page === currentPage
                                ? 'page-item active'
                                : 'page-item'
                        }
                    >
                        <a
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
                <li
                    className={
                        currentPage !== pagesCount
                            ? 'page-item'
                            : 'page-item disabled'
                    }
                >
                    <a className="page-link" onClick={() => onClickNext()}>
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
