const currentPage = location.pathname;
const menuItems = document.querySelectorAll('header .links a');

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active');
    }
};

/* === PAGINATION === */
function paginate(selectedPage, totalPages) {
    let pages = [],
        previousPage;

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const isFirstOrSecondPage = currentPage == 1 || currentPage == 2;
        const isLastOrPenultimatePage = currentPage == totalPages || currentPage == totalPages - 1;
        const pagesAfterSelectedPage = currentPage <= selectedPage + 1;
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 1;

        if (isFirstOrSecondPage || isLastOrPenultimatePage || (pagesBeforeSelectedPage && pagesAfterSelectedPage)) {
            if (previousPage && currentPage - previousPage > 2) {
                pages.push("...");
            }

            if (previousPage && currentPage - previousPage == 2) {
                pages.push(previousPage + 1);
            }

            pages.push(currentPage);

            previousPage = currentPage;
        }
    }

    return pages;
}

function createPagination(pagination) {
    const selectedPage = +pagination.dataset.page;
    const totalPages = +pagination.dataset.total;
    const filter = pagination.dataset.filter;
    const pages = paginate(selectedPage, totalPages);

    let elements = "";

    for (let page of pages) {
        if (String(page).includes("...")) {
            elements += `<span>${page}</span>`;
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
            } else {
                elements += `<a href="?page=${page}">${page}</a>`;
            }
        }
    }

    pagination.innerHTML = elements;
}

const pagination = document.querySelector(".pagination");

if (pagination) {
    createPagination(pagination);
}