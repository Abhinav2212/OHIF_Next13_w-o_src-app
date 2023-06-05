import React from 'react'
import Image from 'next/image'

const source = ""

const index = () => {
  return (
    <div><Image src={source} width = {500} height = {500} alt = "img"/></div>
  )
}

export default index