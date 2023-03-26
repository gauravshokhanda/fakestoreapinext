// Parent component
import React, { useEffect, useState } from 'react'
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Backdrop,
  Box,
  Grid,
  ListItemAvatar,
  Avatar,
  Divider
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { AppBar, Toolbar, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

const useStyles = styled(theme => ({
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 1
  }
}))

function Cart({ handleClose, handleOpen, open, cartItem, handleQuantityChange, handleRemoveFromCart, cartTotal }) {
  const classes = useStyles()

  return (
    <>
      {/* <IconComponent onIconClick={handleOpen} /> */}
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='right'
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ width: 600 }}>
          <Grid container>
            <Grid item xs={12} sm={6} md={12}>
              <AppBar position='static'>
                <Toolbar>
                  <Typography variant='h6'>Your Cart </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <Grid container position='absoulte'>
                <Grid item xs={8} sm={8} md={8}>
                  <Typography variant='h5' sx={{ mt: 3 }}>
                    Your total Price is
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} md={4}>
                  <Typography variant='h3'>{cartTotal} </Typography>
                </Grid>
              </Grid>
              <Divider />
              <List sx={{ width: '100%', height: 200, maxWidth: 600, bgcolor: 'background.paper' }}>
                {cartItem.map(item => {
                  return (
                    <>
                      <ListItem alignItems='flex-start'>
                        <ListItemAvatar>
                          <Avatar alt='Remy Sharp' src={item.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.title}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component='span'
                                variant='body2'
                                color='text.primary'
                              >
                                Ali Connors
                              </Typography>
                              {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                          }
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <ButtonGroup variant='contained' aria-label='outlined primary button group'>
                            <Button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</Button>
                            <Button>{item.quantity}</Button>
                            <Button onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</Button>
                          </ButtonGroup>

                          <Button sx={{ mt: 3 }} onClick={() => handleRemoveFromCart(item)}>
                            remove
                          </Button>
                        </Box>
                      </ListItem>
                      <Divider variant='inset' component='li' />
                    </>
                  )
                })}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose} />
    </>
  )
}

export default Cart
