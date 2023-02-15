
// import Ohif from 'module/Ohif'
import React from 'react'
import dynamic from 'next/dynamic'
const OHIF  = dynamic(()=> import( 'module/Viewer'),{ssr:false});

export default function App() {
  return (
   

    <div id="root" style={{height : "100vh",  flex: '1' }} >
      <OHIF/>
      </div>
  )
}
