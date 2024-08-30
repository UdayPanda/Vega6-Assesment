import React, { useRef, useEffect } from 'react';

const ImageCanvas = ({ selectedImage, caption }) => {
  const canvasRef = useRef(null);
  const canvasInstance = useRef(null); 

  useEffect(() => {
    if (typeof window.fabric === 'undefined') {
      console.error('Fabric.js is not defined');
      return;
    }

    canvasInstance.current = new window.fabric.Canvas(canvasRef.current);

    return () => {
      if (canvasInstance.current) {
        canvasInstance.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasInstance.current;
    if (!canvas) return;

    canvas.clear();

    if (selectedImage) {
      window.fabric.Image.fromURL(selectedImage, (img) => {
        img.set({ left: 50, top: 50, selectable: true });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    }

    const addObjectsToCanvas = () => {
      const rect = new window.fabric.Rect({
        left: 300,
        top: 300,
        fill: 'green',
        width: 100,
        height: 100,
        selectable: true,
      });
      canvas.add(rect);

      const circle = new window.fabric.Circle({
        left: 500,
        top: 150,
        radius: 50,
        fill: 'red',
        selectable: true,
      });
      canvas.add(circle);

      if (caption) {
        const captionText = new window.fabric.Text(caption, {
          left: 50,
          top: 550,
          fontSize: 20,
          fill: 'black',
          selectable: false,
        });
        canvas.add(captionText);
      }
    };

    addObjectsToCanvas();
    canvas.renderAll(); 

  }, [selectedImage, caption]);

  return (
    <div className='bg-gray-400 rounded-md border-black w-[50%] mt-14'>
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </div>
  );
};

export default ImageCanvas;
