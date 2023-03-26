import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'

const ProductList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCategory, setSearchCategory] = useState('')

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
      })
  }, [])

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value)
    filterProducts(event.target.value, searchCategory)
  }

  const handleSearchCategoryChange = event => {
    setSearchCategory(event.target.value)
    filterProducts(searchTerm, event.target.value)
  }

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
    <>
      <Typography variant='h5' gutterBottom>
        Search Products
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label='Search by Name'
            variant='outlined'
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label='Search by Category'
            variant='outlined'
            value={searchCategory}
            onChange={handleSearchCategoryChange}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {filteredProducts.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%' }}>
              <Typography
                variant='body2'
                sx={{
                  p: 2,
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  borderRadius: '4px'
                }}
              >
                {product.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default ProductList
