
import React, { useEffect } from "react";
import { installViewer } from '@ohif/viewer'


 const Viewer = () => {
  // or set it here
  const containerId = 'root'
  const componentRenderedOrUpdatedCallback = function () {
    console.log('OHIF Viewer rendered/updated');
  };



  useEffect(() => {
    const ohifViewerConfig = {
      // routerBasename: '/',
      servers: {
        dicomWeb: [
          {
            name: 'DCM4CHEE',
            wadoUriRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/wado',
            qidoRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs',
            wadoRoot: 'https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs',
            qidoSupportsIncludeField: true,
            imageRendering: 'wadors',
            thumbnailRendering: 'wadors',
          },
        ],
      },
    }

    installViewer(
      ohifViewerConfig,
      containerId,
      componentRenderedOrUpdatedCallback
    );

  }, [])

  // return (
  //   <div id="root"> <Viewer/></div>
  // )
}


export default Viewer;