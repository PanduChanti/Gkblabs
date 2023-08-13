import React from "react"

function PaginationNumber({ data, NumberStyle }) {
  const PageNumbers = []
  for (let i = 1; i < Math.ceil(data.length / 5); i++) {
    PageNumbers.push(i)
  }
  return (
    <div>
      {PageNumbers.map((pageNumber) => {
        return (
          <button onClick={() => NumberStyle(pageNumber)} key={pageNumber}>
            {pageNumber}
          </button>
        )
      })}
    </div>
  )
}

export default PaginationNumber
