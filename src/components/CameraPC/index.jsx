import { Button, Image } from 'antd';
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react'
import styles from './index.less';
/**PC端拍照实现 */
const CameraPC = (props) => {
  const { pictureSize = { width: '100px', height: '100px' }, cameraStyle , comeBackImg } = props;

  const [imageUrl, setImageUrl] = useState()
  const cameraVideoRef = useRef();
  const cameraCanvasRef = useRef();

  const successFunc = (mediaStream) => {
    const video = cameraVideoRef.current;
    // 旧的浏览器可能没有srcObject
    if ('srcObject' in video) {
      video.srcObject = mediaStream;
    }
    video.onloadedmetadata = () => {
      video.play();
    };
  }

  function errorFunc(err) {
    console.log(`${err.name}: ${err.message}`);
    // always check for errors at the end.
  }
  // 启动摄像头
  const openMedia = () => { // 打开摄像头
    console.log(cameraCanvasRef.current.width,cameraCanvasRef.current.height);
    const opt = {
      audio: false,
      video: {
        width: cameraCanvasRef.current.width,
        height: cameraCanvasRef.current.height
      }
    };
    navigator.mediaDevices.getUserMedia(opt).then(successFunc).catch(errorFunc);
  };
  // 关闭摄像头
  const closeMedia = () => {
    const video = cameraVideoRef.current;
    const stream = video.srcObject;
    if ('getTracks' in stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
    }
  };

  const getBase64Img = () => {
    // const video = document.getElementById('cameraVideo') as HTMLVideoElement;
    // const canvas = document.getElementById('cameraCanvas') as HTMLCanvasElement;
    const video = cameraVideoRef.current;
    const canvas = cameraCanvasRef.current;
    if (canvas == null) {
      return;
    }
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight); // 把视频中的一帧在canvas画布里面绘制出来
    const imgStr = canvas.toDataURL(); // 将图片资源转成字符串
    const base64Img = imgStr.split(';base64,').pop(); // 将图片资源转成base64格式
    const imgData = {
      base64Img
    };
    closeMedia(); // 获取到图片之后可以自动关闭摄像头
    ctx.clearRect(0,0,canvas.width,canvas.height)
    comeBackImg && comeBackImg(imgStr);
  };

  const cameraRender = () => {
    return (
      <div className={styles.camera} style={cameraStyle}>
        <div style={{width:'100%', height: '100%'}}>
          <video
            id="cameraVideo"
            ref={cameraVideoRef}
            style={{
              position: 'absolute', height: '100%', width: '100%'
            }}
          />
          <canvas
            id="cameraCanvas"
            ref={cameraCanvasRef}
            width={pictureSize.width}
            height={pictureSize.height}
            style={{
              backgroundColor: '#000006',
              height: '100%',
              width: '100%'
            }}
          />
        </div>
      </div>
    )
  }

  const optionRender = () => {
    return (
      <div style={{paddingTop:5}}>
        <Button type='primary' onClick={openMedia} >打开摄像头</Button>
        <Button type='primary' onClick={getBase64Img}>拍照</Button>
        <Button type='primary' onClick={closeMedia} >关闭摄像头</Button>
      </div>
    )
  }

  return (
    <div>
      {cameraRender()}
      {optionRender()}
    </div>
  )
}

export default CameraPC