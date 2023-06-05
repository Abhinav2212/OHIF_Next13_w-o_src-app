import { useEffect, useState } from 'react';
import Image from 'next/image';
import Amplify from 'aws-amplify';
// import awsconfig from './aws-exports';
import { Storage } from 'aws-amplify';



const awsconfig = {
    // Specify your AWS credentials and S3 bucket information here
    Auth: {
      // Your Amazon Cognito User Pool ID
      userPoolId: '',
      // Your Amazon Cognito App client ID
      userPoolWebClientId: '',
    },
    Storage: {
      // The name of your S3 bucket
      bucket: 'midas-images-temp',
      // Optional: The AWS region where your S3 bucket is located (default: us-east-1)
      region: 'ap-south-1',
    },
  };

Amplify.configure(awsconfig);


function index() {

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        async function loadImage() {
          try {
            const image = await Storage.get('example.jpg', { download: true });
            const blobUrl = URL.createObjectURL(image);
            setImageSrc(blobUrl);
          } catch (error) {
            console.error('Error getting image:', error);
          }
        }
    
        loadImage();
      }, []);
  
  return (
     <Image src={imageSrc} alt="Example" />
  )
}

export default index