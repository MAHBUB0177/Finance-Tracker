import React from 'react'
import ReactPaginate from 'react-paginate'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'

interface PaginationProps {
  pageCount: number
  forcePage: number
  handlePageClick: (selectedItem: { selected: number }) => void
}

const Pagination = ({ pageCount, forcePage, handlePageClick }: PaginationProps) => {
  return (
    <div className="flex justify-center py-4">
      <ReactPaginate
        previousLabel={
          <div className="flex items-center space-x-1 text-orange-500 font-semibold cursor-pointer">
            <FiChevronsLeft className="text-sm" />
            <span className="text-gray-700">Prev</span>
          </div>
        }
        nextLabel={
          <div className="flex items-center space-x-1 text-orange-500 font-semibold cursor-pointer">
            <span className="text-gray-700">Next</span>
            <FiChevronsRight className="text-sm" />
          </div>
        }
        breakLabel={<span className="text-purple-700 cursor-pointer">...</span>}
        pageCount={pageCount}
        forcePage={forcePage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="flex items-center space-x-2 border border-gray-300 rounded-md px-4 py-2"
        pageClassName=""
        pageLinkClassName="text-purple-700 px-3 py-1 rounded-full hover:bg-purple-100 transition duration-200 text-sm cursor-pointer"
        previousClassName=""
        previousLinkClassName="text-sm"
        nextClassName=""
        nextLinkClassName="text-sm"
        breakClassName=""
        breakLinkClassName="px-2"
        activeLinkClassName="bg-purple-700 text-white font-semibold cursor-default"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  )
}

export default Pagination
