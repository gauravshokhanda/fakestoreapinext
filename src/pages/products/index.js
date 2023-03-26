import Product from '@/compoents/Product'
import React, { useEffect, useState } from 'react'

const product = () => {
  const [product, setProduct] = useState([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/1')
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [])

  return (
    <>
      <Product product={product} />
    </>
  )
}

export default product
