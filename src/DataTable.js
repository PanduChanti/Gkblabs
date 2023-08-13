import React, { useState, useEffect } from "react"
import axios from "axios"
import Number from "./Number"
import Task from "./Task"

function DataTable() {
  const URL = "https://dummyjson.com/products"

  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [sliceData, setSliceData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const perPage = 5

  const fetchData = async (url) => {
    setLoading(true)
    try {
      const response = await axios.get(url)
      const jsonData = response.data.products
      console.log(jsonData)
      setData(jsonData)
      setSliceData(jsonData.slice(0, perPage))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(URL)
  }, [])

  const NumberStyle = (pageNumber) => {
    try {
      setCurrentPage(pageNumber)
      setSliceData(data.slice((pageNumber - 1) * perPage, pageNumber * perPage))
    } catch (error) {
      console.log(error)
    }
  }

  const DeleteHandler = (id) => {
    const updatedData = data.filter((item) => item.id !== id)
    setData(updatedData)
    setSliceData(
      updatedData.slice((currentPage - 1) * perPage, currentPage * perPage)
    )
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>Task 1 :-</h2>
      Search item :-
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sliceData
            .filter((eachBrand) =>
              eachBrand.brand.toLowerCase().includes(search.toLowerCase())
            )
            .map((eachItem) => {
              const { id, brand } = eachItem
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{brand}</td>
                  <td>
                    <button onClick={() => DeleteHandler(id)}>Delete</button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <div>
        <Number data={data} NumberStyle={NumberStyle} />
      </div>
      <br />
      <br />
      <div>
        <Task />
      </div>
    </div>
  )
}

export default DataTable
