import {getProductsInCollection} from "../lib/shopify"
import { IProductNode } from "../utils/interface"
import ProductsList from "../components/ProductsList"

interface IProps{
  products: IProductNode[]
}

export default function Home({ products }: IProps){
  return (
    <div className="text-3xl">
      <ProductsList products={products} />
    </div>
  )
}

export async function getStaticProps(){
  const products = await getProductsInCollection()
  return {
    props:{products} //will be passes to the page component as props
  }
}