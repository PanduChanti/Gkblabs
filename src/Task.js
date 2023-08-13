import React, { useState, useEffect } from "react"
import axios from "axios"

function Task() {
  const url = "https://dummyjson.com/products"
  const [data, setData] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedBrands, setSelectedBrands] = useState([])

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url)
      const jsonData = response.data.products
      console.log(jsonData)
      setData(jsonData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [])

  const handleBrandSelect = (event) => {
    const selectedBrandId = event.target.value
    const brand = data.find((brand) => brand.id === parseInt(selectedBrandId))
    setSelectedBrand(brand)
  }

  const handleDeleteBrand = (brandId) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.filter((brand) => brand.id !== brandId)
    )
  }

  const handleAddBrand = () => {
    if (selectedBrand) {
      setSelectedBrands((prevSelectedBrands) => [
        ...prevSelectedBrands,
        selectedBrand,
      ])
    }
  }

  return (
    <div>
      <h2>Task 2 :-</h2>

      <select onChange={handleBrandSelect}>
        <option value="">Select a brand</option>
        {data.map((eachBrand) => {
          const { id, brand } = eachBrand
          return (
            <option value={id} key={id}>
              {brand}
            </option>
          )
        })}
      </select>
      <button onClick={handleAddBrand}>+</button>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedBrands.map((selectedBrand) => {
            const { id, brand } = selectedBrand
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{brand}</td>
                <td>
                  <button onClick={() => handleDeleteBrand(id)}>Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Task
