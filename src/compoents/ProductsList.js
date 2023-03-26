import React, { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'
import Rating from '@mui/material/Rating'
import { Box } from '@mui/system'

const ProductList = ({ products, searchTerm, cartItem, setCartItem }) => {
  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function AddToCart(item) {
    // setCartItem([...cartItem, item])
    const itemIndex = cartItem.findIndex(cartItem => cartItem.id === item.id)
    if (itemIndex >= 0) {
      // If the item is already in the cart, update the quantity
      const newCartItems = [...cartItem]
      newCartItems[itemIndex].quantity += 1
      setCartItem(newCartItems)
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCartItem([...cartItem, { ...item, quantity: 1 }])
    }
  }

  return (
    <Grid container spacing={5} sx={{ mt: 5 }}>
      {filteredProducts.map(item => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <Card>
            <CardContent sx={{ p: theme => `${theme.spacing(3, 5.25, 4)} !important` }}>
              <CardMedia
                component='img'
                height='400'
                width='400'
                image={item.image}
                alt='GFG Logo'
                sx={{ pr: 20 }}
                style={{ objectFit: 'contain' }}
              />
              <Typography variant='h6' noWrap sx={{ mb: 2 }}>
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography>₹{item.price}</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Rating name='read-only' value={item.rating.rate} readOnly />
                  <Typography
                    noWrap
                    sx={{ p: 0.8, ml: 2, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '4px' }}
                    variant='subtitle2'
                  >
                    {item.rating.rate}
                  </Typography>
                </Box>
              </Box>

              <Typography variant='body2' noWrap sx={{ mt: 2 }}>
                {item.description}
              </Typography>
            </CardContent>

            <Button
              variant='contained'
              sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              onClick={() => {
                AddToCart(item)
              }}
            >
              Add To Cart
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default ProductList
