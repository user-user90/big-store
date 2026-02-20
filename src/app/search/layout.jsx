

import React from 'react'
import SliderProducts from './_Compenents/SliderProducts'

function Searchlayout({children}) {
  return (
    <main>
        <div className='flex flex-col md:flex-row'>
            <SliderProducts/>
            {children}
        </div>
    </main>
  )
}

export default Searchlayout