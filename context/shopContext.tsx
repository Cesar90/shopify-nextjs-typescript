import React from 'react'
import { createContext, useState, useEffect } from 'react'
import { createCheckout, updateCheckout } from '../lib/shopify'
import { ISingleProductJson } from "../utils/interface"
import { IAllVariantOption } from "../components/ProductForm"

interface IProps {
  children: React.ReactNode;
}

export interface INewItem{
  id: string
  variantQuantity: number
  variantPrice: number | 0
  
}

interface IResponse{
  id:string
  webUrl: string
}

interface IContext{
  cart: IAllVariantOption[],
  cartOpen: boolean,
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>,
  addToCart: (newItem: IAllVariantOption) => Promise<void>
  checkoutUrl: string
  removeCartItem: (itemToRemoveId: string) => Promise<void>
}

interface IResponseJsonLineItemsNode{
  node:{
    id: string
    quantity: number
    title: string
  }
}

interface IResponseJsonLineItems{
  edges: IResponseJsonLineItemsNode[]
}

interface IResponseJson extends IResponse{
  lineItems: IResponseJsonLineItems
}

type IJsonParse = Array<IResponseJson | IAllVariantOption[]>

const CartContext = createContext<Partial<IContext>>({})

export default function ShopProvider({ children }:IProps) {
  const [cart, setCart] = useState<IAllVariantOption[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutId, setCheckoutId] = useState('')
  const [checkoutUrl, setCheckoutUrl] = useState('')

  useEffect(() => {
    const checkout_id = localStorage.getItem('checkout_id')
    
    if(checkout_id){
      const cartObject = JSON.parse(checkout_id) as IJsonParse
      const firstElement = cartObject[0];
      const secondElement = cartObject[1];

      if(!Array.isArray(firstElement) && ("id" in secondElement)){
        setCheckoutId(secondElement.id)
        setCheckoutUrl(secondElement.webUrl)
      }
      
      if(cartObject.length > 1 && Array.isArray(firstElement)){
        setCart([...firstElement])
      }

      if(cartObject.length > 0){
        let secondElement = cartObject[1]
        if(!("id" in secondElement)){
          
        }
      }
    } 
  }, [])

  

  async function addToCart(newItem: IAllVariantOption){
    setCartOpen(true)

    if(cart.length === 0){
      setCart([newItem])

      const checkout = await createCheckout(newItem.id, newItem.variantQuantity) as IResponse
      setCheckoutId(checkout.id)
      setCheckoutUrl(checkout.webUrl)

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]))
    } else {
      let newCart = [...cart]
      cart.map(item => {
        if(item.id === newItem.id){
          item.variantQuantity++
          newCart = [...cart]
        } else {
          newCart = [...cart, newItem]
        }
      })
      setCart(newCart)
      const newCheckout = await updateCheckout(checkoutId, newCart)
      localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
    }
  }

  async function removeCartItem(itemToRemoveId:string){
    const updatedCart = cart.filter(item => item.id !== itemToRemoveId)
    setCart(updatedCart)
    const newCheckout = await updateCheckout(checkoutId, updatedCart)
    localStorage.setItem("checkout_id", JSON.stringify([updateCheckout, newCheckout]))
    if(cart.length === 1){
      setCartOpen(false)
    }
  }

  return (<CartContext.Provider value={
    {
      cart,
      cartOpen,
      setCartOpen,
      addToCart,
      checkoutUrl,
      removeCartItem
    }
  }>
    {children}
  </CartContext.Provider>)
}

const ShoConsumer = CartContext.Consumer

export { ShoConsumer, CartContext}
