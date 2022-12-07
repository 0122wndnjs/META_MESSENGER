import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <header>
        <div>
            <div>
                <Image src="https://links.papareact.com/jne" height={10} width={50} alt='Logo' />
            </div>
        </div>
    </header>
  )
}

export default Header