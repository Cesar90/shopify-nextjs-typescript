import React from 'react'
import { ISingleProduct } from "../utils/interface"
import Image from 'next/image'
import ProductForm from './ProductForm'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import RecommendedLis from "./RecommendedLis"

interface IProps{
  product: ISingleProduct
}

// interface IChoices<T>{
//   id: number,
//   name: string,
//   component: T,
//   losesTo: number
// }

// type RPS = typeof Rock | typeof Paper | typeof Scissors;

// const choices: IChoices<RPS>[] = [
//   {id: 1, name: 'rock', component: Rock, losesTo: 2},
//   {id: 2, name: 'paper', component: Paper, losesTo: 3},
//   {id: 3, name: 'scissors', component: Scissors, losesTo: 1},

// ]
type IImages = typeof SwiperSlide

export default function ProductPageContent({ product }: IProps) {

  const images:any[] = []
  product.images.edges.map((image, i) => {
    images.push(
      <SwiperSlide key={`slide-${i}`}>
        <Image 
          src={image.node.url} 
          alt={image.node.altText} 
          layout="fill"
          objectFit="cover" />
      </SwiperSlide>
    )
  })

  SwiperCore.use([Navigation, Pagination])

  return (
    <div>
      <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11-12 mx-auto">
          <div className="w-full max-x-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
            <div className="relative h-96 w-full">
              {/* <Image 
                layout="fill"
                objectFit="cover"
                src={product.images.edges[0].node.url} 
                alt={product.images.edges[0].node.altText} /> */}
                <Swiper
                  // style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
                  navigation
                  pagination={{clickable:true}}
                  className="h-96 rounded-2xl"
                  loop={true}
                >
                  {images}
                </Swiper>
            </div>
          </div>
          <ProductForm product={product} />
        </div>
        <RecommendedLis current={product.id} products={product.collections.edges[0].node.products.edges} />
    </div>
  )
}
