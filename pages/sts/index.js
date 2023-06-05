import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AWS from 'aws-sdk';

function ImageDisplay() {
    const [imageUrl, setImageUrl] = useState(null);
    const [imgList, setImgList] = useState([])
   
    useEffect(() => {

        const sts = new AWS.STS({
            accessKeyId: "",
            secretAccessKey: "",
        });
        // const sts = new AWS.STS()
        const roleArn = "";

        const roleParams = {
            RoleArn: roleArn,
            RoleSessionName: '',
        };

        sts.assumeRole(roleParams, (error, data) => {
            if (error) {
                
            } else {
                const credentials = new AWS.Credentials({
                    accessKeyId: data.Credentials.AccessKeyId,
                    secretAccessKey: data.Credentials.SecretAccessKey,
                    sessionToken: data.Credentials.SessionToken,
                });

                const s3 = new AWS.S3({
                    credentials: credentials,
                    region: "",
                });
                console.log("first")

                // const bucketParams = { Bucket: 'dr-raw-pgi-datasets' };

                // s3.listObjects(bucketParams, function (err, data) {
                //     console.log("🚀 ~ file: index.js:42 ~ err:", err)
                //     console.log("🚀 ~ file: index.js:44 ~ data:", data)
                //     if (err) {
                //         console.log("Error inside listObjects", err);
                //     }
                //     else {
                //         console.log("Success listObjects", data.Contents);
                //         setImgList(data.Contents)

                //     }
                // });


                // const imageParams = { Bucket: 'dr-raw-pgi-datasets', Key: '3019ULFUSAS.jpg' };

                // s3.getObject(imageParams, (error, data) => {
                //   if (error) {
                //     console.error('Error getting object:', error);
                //   } else {
                //     const imageData = data.Body.toString('base64');
                //     const imageSrc = `data:image/jpeg;base64,${imageData}`;
                //     setImageUrl(imageSrc);
                //   }
                // });


                s3.listBuckets(function(err, data) {
                    if (err) {
                      console.log("Error", err);
                    } else {
                      console.log("Success", data.Buckets);
                    }
                  });
            }
        });
    }, []);

    // useEffect(() => {
    //     imgList.map((item) => {
    //         let params = { Bucket: 'dr-raw-pgi-datasets', Key: item.Key };

    //         s3.getObject(params, (error, data) => {
    //             if (error) {
    //                 console.error('Error getting object:', error);
    //             } else {
    //                 const imageData = data.Body.toString('base64');
    //                 const imageSrc = `data:image/jpeg;base64,${imageData}`;
    //                 console.log('Image URL:', imageSrc);
    //                 setImageUrl(imageSrc);
    //                 // Use the image URL in your application
    //             }
    //         });
    //     })


    // }, [imgList])

    return (
        <div>
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt="Example Image"
                    width={500}
                    height={500}
                />
            )}
        </div>
    );
}

export default ImageDisplay;
