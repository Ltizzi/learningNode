//pagination logic, reusable way to make any endpoint paginated

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_NUMBER; //return absolute value of a number -5 es 5 y 5 es 5 y si es "5" es 5
  const page = Math.abs(query.page) || DEFAULT_PAGE_LIMIT;

  const skip = limit * (page - 1); // limit = 20, pagina 1, skip 0, pagina 2, skip = 20

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
