import React, { useState } from 'react'
import Menu from '../Menu/Menu'
import { useGlobalContext } from '../Context'
import ShopItem from '../ShopItem/ShopItem'
import './Css/Css.css'

const Shop = () => {
  const { food_list } = useGlobalContext()
  const [category, setCategory] = useState("All");
  return (
    <div className='shop'>
      <Menu category={category} setCategory={setCategory} />
      <div className="shop-items">
        {
          food_list.map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <ShopItem
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  id={item._id}
                  description={item.description}
                />
              )
            } else {
              return null;
            }
          })
        }
      </div>
    </div>
  )
}

export default Shop
