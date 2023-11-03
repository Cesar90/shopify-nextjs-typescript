import React from 'react'
import { IProductNode } from "../utils/interface"
import ProductCard  from "./ProductCard"

interface IProps{
  products: IProductNode[]
}

const ProductsList = ({ products }: IProps) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 ms:px-6 lg:max-w-7xl lg:px-0">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Products
        </h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          { products.map(product => (
            <ProductCard key={product.node.id} product={product} />
          )) }
        </div>
      </div>
    </div>
  )
}

export default ProductsList
