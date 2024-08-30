import React from 'react';

const DownloadButton = ({ canvasRef, caption }) => {
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const fabricCanvas = canvas.getContext('2d');
      if (!fabricCanvas) {
        console.error("Canvas context is not available");
        return;
      }

      const dataUrl = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'image.png';
      link.click();
    } else {
      console.error("Canvas is not available");
    }
  };

  return (
    <div className='absolute bottom-0 right-0 w-[50%] flex justify-center items-center'>
      <input 
        type="text"
        className='p-2 text-lg rounded-md m-2 outline-none'
        placeholder='Add your caption here'
        onChange={(e) => caption(e.target.value)}
      />
      <button 
        className='p-2 text-lg rounded-md m-2 outline-none bg-black hover:bg-gray-400 text-white'
        onClick={downloadImage}
      >Download</button>
    </div>
  );
};

export default DownloadButton;
