import React from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import CheckOut from './CheckOut/CheckOut'
import FirstOrder from './FirstOrder/FirstOrder'
import Categories from './Categories/Categories'
import Sale from './Sale/Sale'

export function HomePage() {
  return (
    <div>
      {/* <Header/> */}
      <CheckOut/>
      <Categories/>
      <FirstOrder/>
      <Sale/>
      {/* <Footer/> */}
    </div>
  )
}

// export default Home
