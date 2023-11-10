import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/Components/Header'
import Landing from '@/Components/Landing'
const inter = Inter({ subsets: ['latin'] })
import { Tab } from '@headlessui/react'
import { GetServerSideProps } from 'next'
import { fetchCategories } from '@/utils/fetchCategories'
import { fetchProducts } from '@/utils/fetchProducts'
import Product from '@/Components/Product'
import Basket from '@/Components/Basket'

interface Props {
  categories: Category[];
  products: Product[]
}

const Home = ({ categories, products }: Props) => {
  console.log(products);

  const showProducts = (category: number) =>{
    return products.filter((product) => product.category._ref == categories[category]._id).map((product) => (
      <Product product ={product} key = {product._id }/>
    )) // filter produicts by category
  }

  return (
    <div className="">
      <Head>
        <title>Apple Redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Basket />

      <main className="relative h-[200vh] bg-[#E7ECEE]">
        <Landing />
      </main>
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <div className="space-y-10 py-16">
          <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            New Promos
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center">
              {categories.map((category) => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                      selected
                        ? "borderGradient bg-[#35383C] text-white"
                        : "border-b-2 border-[#35383C] text-[#747474]"
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
              <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div> 
      </section>
    </div>
  )
}
export default Home

//BACKEND CODE
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await fetchCategories()
  const products = await fetchProducts()

  return {
    props: {
      categories,
      products,
    },
  };
}
