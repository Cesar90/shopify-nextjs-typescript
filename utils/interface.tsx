export interface IProductNodeImagesNodeDeep{
    originalSrc:string
    altText:string
    url: string
}

export interface IProductNodeImagesNode{
    node: IProductNodeImagesNodeDeep
}

export interface IProductNodeImages{
    edges:IProductNodeImagesNode[]
}

export interface IProductNode{
    node: {
        id:string
        title: string
        handle: string
        images:IProductNodeImages
        priceRange:{
            minVariantPrice:{
                amount: number
            }
            title:string
        }
    }
}

export interface IOption{
    name: string
    id: string
    values: string[]
}

export interface ISelectedOptions{
    name: string
    value: string
}

export interface IVariantNode{
    node:{
        selectedOptions: ISelectedOptions[]
        image:{
            url: string
            altText: string
        }
        title: string
        id: string
        availableForSale: boolean
        priceV2:{
            amount:number
        }
    }
}

export interface IVariant{
    edges: IVariantNode[] | null
}

export interface ICollectionNodeProductEdgesNode{
    node: {
        priceRange:{
            minVariantPrice:{
                amount: string
            }
        }
        handle: string
        title: string
        id: string
        images:{
            edges: IProductNodeImages
        }
    }
}

export interface ICollectionNodeProductEdges{
    edges: ICollectionNodeProductEdgesNode[]
}

export interface ICollectionNodeProduct{
    products: ICollectionNodeProductEdges
}

export interface ICollectionNode{
    node: ICollectionNodeProduct
}

export interface ICollection{
    edges: ICollectionNode[]
}

export interface ISingleProduct{
    id:string
    title: string
    handle:string
    description:string
    images:IProductNodeImages
    options: IOption[]
    variants: IVariant
    collections: ICollection
}

type ISingleProductSomeProperty = Pick<ISingleProduct, "id" | "title" | "handle" | "description">

export interface ISingleProductJson extends ISingleProductSomeProperty{
    image?: string
    variantPrice?: string
    variantQuantity?: number
    variantTitle?: string
}

export interface IAllProductNode{
    node:{
        handle:string
        id: string
    }
}

// export interface IProduct{
//     node:
// }

export interface IPosts{
    posts: IPost[]
}

export interface IPostProps{
    post:IPost
}
  
export interface IPost{
    slug: string,
    frontmatter: frontmatter,
  }
  
  export interface frontmatter{
    title: string,
    date: Date,
    excerpt: string,
    cover_image: string,
    category: string
    author_image: string
  }

export interface IStaticProps{
    params: {
        slug: string
    }
}

export interface IPropsPost{
    frontmatter: frontmatter,
    content: string,
    slug: string
}