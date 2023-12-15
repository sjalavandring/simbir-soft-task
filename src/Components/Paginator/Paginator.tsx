import React, { useState } from 'react';

type PaginatorProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

const Paginator = ({ pageCount, currentPage, onPageChange }: PaginatorProps) => {
  const renderPageNumbers = () => {
    let startPage = Math.max(currentPage - 2, 0);
    let endPage = Math.min(startPage + 4, pageCount - 1);
    startPage = Math.max(endPage - 4, 0);

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const pages = pageNumbers.map((pageNumber) => (
      <div
        key={pageNumber}
        onClick={() => onPageChange(pageNumber)}
        className={"page-number" + (pageNumber === currentPage ? " page-number_active" : '')}
      >
        {pageNumber + 1}
      </div>
    ));

    if (startPage > 0) {
      // Вставляем точки и страницу перед начальной
      pages.unshift(
        <React.Fragment key="ellipsis-start">
          <div onClick={() => onPageChange(0)} className={"page-number" + (0 === currentPage ? " page-number_active" : '')}>
            1
          </div>
          <div>...</div>
        </React.Fragment>
      );
    }

    if (endPage < pageCount - 1) {
      // Вставляем точки и страницу после конечной
      pages.push(
        <React.Fragment key="ellipsis-end">
          <div>...</div>
          <div onClick={() => onPageChange(pageCount - 1)} className={"page-number" + (pageCount - 1 === currentPage ? " page-number_active" : '')}>
            {pageCount}
          </div>
        </React.Fragment>
      );
    }

    return pages;
  };

  return (
    <div className="paginator-container">
      <div onClick={() => onPageChange(currentPage - 1)} className="paginator-arrow">
        {'<'}
      </div>
      {renderPageNumbers()}
      <div onClick={() => onPageChange(currentPage + 1)} className="paginator-arrow">
        {'>'}
      </div>
    </div>
  );
};

export default Paginator;