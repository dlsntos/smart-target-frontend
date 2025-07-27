import Webcam from 'react-webcam';
import { useRef } from 'react';
function WebCam() {
    const webRef = useRef(null);
    return(
        
        <Webcam ref={webRef} />
        
    )
}

export default WebCam;