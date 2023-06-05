import Link from 'next/link'
import React from 'react'


function Home() {
  return (
    <Link 
    href={{
        pathname: '/viewer/dicomjson',
        query: "url=https://ohif-dicom-json-example.s3.amazonaws.com/LIDC-IDRI-0001.json",
      }}
    > OHIF Viewer</Link>
  )
}

export default Home