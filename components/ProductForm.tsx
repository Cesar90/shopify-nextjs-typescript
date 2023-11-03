import React from 'react'
import { ISingleProduct } from "../utils/interface"
import { useState, useContext } from "react"
import { formatter } from '../utils/helpers'
import  ProductOptions  from './ProductOptions'
import { CartContext } from '../context/shopContext'

interface IProps{
  product: ISingleProduct
}
interface IOptions{
  [x:string]:string
}

export interface IAllVariantOption{
  id:string,
  title: string
  handle:string
  image: string
  options: IOptions
  variantTitle: string
  variantPrice: number
  variantQuantity: number
  href?: string
}

type IFirstVariant = IAllVariantOption | undefined

export default function ProductForm({ product }: IProps){
  const { addToCart } = useContext(CartContext)
  
  const allVariantOptions:IAllVariantOption[] | undefined = product.variants.edges?.map(variant => {
    const allOptions:IOptions = {}
    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })
    return {
      id: variant.node.id,
      title: product.handle,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1
    }
  })

  const defaultValues:IOptions = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const priceAmount = product.variants.edges ? product.variants.edges[0].node.priceV2.amount : 0;
  const firstVariant:IFirstVariant = allVariantOptions ? allVariantOptions[0] : undefined;
  const [selectedVariant, setSelectedVariant] = useState<IAllVariantOption | undefined>(firstVariant)
  const [selectedOption, setSelectedOptions] = useState<IOptions>(defaultValues)

  const setOptions = (name: string, value:string) => {
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedOption,
      [name]:value
    }
    allVariantOptions?.map(item => {
      if(JSON.stringify(item.options) === JSON.stringify(selection)){
        setSelectedVariant(item)
      }
    })
  }

  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-3">{formatter.format(priceAmount)}</span>
      {
        product.options.map(option => (
          <ProductOptions 
            key={`key-${option.name}`}
            name={option.name}
            values={option.values}
            selectOptions={selectedOption}
            setOptions={setOptions}
          />
        ))
      }
      <button 
        onClick={() => {
          if(selectedVariant && addToCart){
            addToCart(selectedVariant)
          }
        }}
        className="bg-black rounded-lg text-white px-2 py-3 mt-3 hover:bg-gray-800">
        Add To Card
      </button>
    </div>
  )
}