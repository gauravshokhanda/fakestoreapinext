import SearchAppBar from '@/compoents/AppBar'
import React, { useState, useEffect } from 'react'
import ProductList from '@/compoents/ProductsList'
import { Box } from '@mui/material'

const Home = () => {
  const [products, setProducts] = useState([])
  const [cartItem, setCartItem] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
    filterProducts(event.target.value, searchCategory)
  }

  function handleRemoveFromCart(item) {
    const itemIndex = cartItem.findIndex(cartItem => cartItem.id === item.id)
    if (itemIndex >= 0) {
      // If the item is in the cart, remove it
      const newCartItems = [...cartItem]
      newCartItems.splice(itemIndex, 1)
      setCartItem(newCartItems)
    }
  }

  function handleQuantityChange(item, newQuantity) {
    const itemIndex = cartItem.findIndex(cartItem => cartItem.id === item.id)
    if (itemIndex >= 0 && newQuantity >= 0) {
      // If the item is in the cart and the new quantity is not negative, update the quantity
      const newCartItems = [...cartItem]
      newCartItems[itemIndex].quantity = newQuantity
      setCartItem(newCartItems)
    }
  }

  const cartTotal = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)

  const filterProducts = (term, category) => {
    let filtered = [...products]
    if (term) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(term.toLowerCase()))
    }
    if (category) {
      filtered = filtered.filter(product => product.category.toLowerCase() === category.toLowerCase())
    }
    setFilteredProducts(filtered)
  }

  return (
    <Box>
      <SearchAppBar
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        cartItem={cartItem}
        handleQuantityChange={handleQuantityChange}
        handleRemoveFromCart={handleRemoveFromCart}
        cartTotal={cartTotal}
      />
      <ProductList
        searchTerm={searchTerm}
        products={products}
        filteredProducts={filteredProducts}
        handleRemoveFromCart={handleRemoveFromCart}
        setCartItem={setCartItem}
        cartItem={cartItem}
      />
    </Box>
  )
}

export default Home
