'use client'
import { useCommerceStore } from '@/contexts/storeProvider'
import type { Item } from '@/contexts/stores'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

const CartContent = () => {
  const { cart, removeFromCart } = useCommerceStore((state) => state)
  const products = cart?.data?.items! as Item[]
  const total =
    products.reduce((acc, product) => acc + product.amount!, 0) + 5.0 + 53.4
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true) // Mark the component as hydrated
  }, [])
  if (!hydrated) {
    return <span suppressHydrationWarning></span> // Avoid hydration mismatch
  }
  return (
    <div className="relative z-10">
      <div className="flex min-h-full items-stretch justify-center text-center sm:items-center sm:px-6 lg:px-8">
        <form className="relative flex w-full flex-col overflow-hidden bg-white pb-8 pt-6 sm:rounded-lg sm:pb-6 lg:py-8">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
          </div>

          <section aria-labelledby="cart-heading">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 px-4 sm:px-6 lg:px-8"
            >
              {products!.map((product, productIdx) => (
                <li
                  key={product.id}
                  className="flex py-8 text-sm sm:items-center"
                >
                  <img
                    alt={product.name}
                    src={product.image}
                    className="size-24 flex-none rounded-lg border border-gray-200 sm:size-32"
                  />
                  <div className="ml-4 grid flex-auto grid-cols-1 grid-rows-1 items-start gap-x-5 gap-y-3 sm:ml-6 sm:flex sm:items-center sm:gap-0">
                    <div className="row-end-1 flex-auto sm:pr-6">
                      <h3 className="font-medium text-gray-900">
                        <a href={'/product-details'}>{product.name}</a>
                      </h3>
                      <p className="mt-1 text-gray-500 capitalize">
                        {product.attributes.color}
                      </p>
                      <p className="mt-1 text-gray-500 uppercase">
                        {product.attributes.size}
                      </p>
                    </div>
                    <p className="row-span-2 row-end-2 font-medium text-gray-900 sm:order-1 sm:ml-6 sm:w-1/3 sm:flex-none sm:text-right">
                      {product?.price!.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </p>
                    <div className="flex items-center sm:block sm:flex-none sm:text-center">
                      <div className="inline-grid w-full max-w-16 grid-cols-1">
                        <select
                          name={`quantity-${productIdx}`}
                          aria-label={`Quantity, ${product.name}`}
                          defaultValue={product.quantity}
                          // onChange={(e) => {
                          //   updateQuantity(product.productKey!, +e.target.value)
                          // }}
                          className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          {Array.from(
                            { length: product.quantity! + 9 },
                            (_, i) => (
                              <option value={i + 1} key={i}>
                                {i + 1}
                              </option>
                            ),
                          )}
                          {/* <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option> */}
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>

                      <button
                        type="button"
                        className="ml-4 font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-2"
                        onClick={() => removeFromCart(product?.id!)}
                      >
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="summary-heading"
            className="mt-auto sm:px-6 lg:px-8"
          >
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">
                      {products
                        .reduce((acc, product) => acc + product.amount!, 0)
                        .toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">$53.40</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {total.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-end px-4 sm:px-6 lg:px-8">
            <button
              type="submit"
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CartContent
