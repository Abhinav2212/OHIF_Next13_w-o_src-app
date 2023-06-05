import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { S3, config } from 'aws-sdk'
const AWSConfig = {
  accessKeyId: "",
  secretAccessKey: "",
  region: "",
}

config.update(AWSConfig)

// Create S3 service object
const s3 = new S3();
// const s3 = new S3({ apiVersion: '2006-03-01' });


function index() {
  const bucketParams = {
    Bucket: '',
  };

  //    let imgList = [] 
  const [imgList, setImgList] = useState([])
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // s3.listBuckets(function(err, data) {
    //   console.log("🚀 ~ file: index.js:26 ~ s3.listBuckets ~ data:", data)
    //   if (err) {
    //     console.log("Error", err);
    //   } else {
    //     console.log("Success Bucket", data.Buckets);
    //   }
    // });

    s3.listObjects(bucketParams, function (err, data) {
      if (err) {
        console.log("Error of listObjects", err);
      }
      else {
        console.log("Success listObjects", data);
        setImgList(data.Contents)

      }
    });
   
   
    
  }, [])
  useEffect(() => {
    imgList.map((item) => {
      console.log("🚀 ~ file: index.js:50 ~ imgList.map ~ item:", item.Key.includes("/Images_Repository/"))
      if(item.Key.includes("/Images_Repository/")){

        let params = { Bucket: 'dr-raw-pgi-datasets', Key: item.Key};
        console.log("🚀 ~ file: index.js:67 ~ imgList.map ~ params:", params)
      s3.getObject(params, (error, data) => {
        if (error) {
          console.log("first")
          console.error('Error getting object:', error);
        } else {
          console.log("second")
          const imageData = data.Body.toString('base64');
          const imageSrc = `data:image/jpeg;base64,${imageData}`;
          console.log('Image URL:', imageSrc);
          setImageUrl(imageSrc);
          // Use the image URL in your application
        }
      });

      }
      
    })
    // let params = { Bucket: 'dr-raw-pgi-datasets', Key: "DRHub/Sources/SourcesMetadata/source.csv"};
    // s3.getObject(params, (error, data) => {
    //   if (error) {
    //     console.log("first")
    //     console.error('Error getting object:', error);
    //   } else {
    //     console.log("second")
    //     const imageData = data.Body.toString('base64');
    //     const imageSrc = `data:image/jpeg;base64,${imageData}`;
    //     console.log('Image URL:', imageSrc);
    //     setImageUrl(imageSrc);
    //     // Use the image URL in your application
    //   }
    // });
  
   
  }, [imgList])
  


  


  return (
    <div>
      hi
      {imageUrl && (
        // console.log("🚀 ~ file: index.js:78 ~ index ~ imageUrl:", imageUrl),
        <Image
          src={imageUrl}
          alt="Example Image"
          width={500}
          height={500}
        />
      )}
     
    </div>
  )
}

export default index