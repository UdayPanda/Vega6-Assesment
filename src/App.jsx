import React, { useRef, useState } from 'react';
import SearchComponent from './components/SearchBar.jsx';
import ImageCanvas from './components/ImageCanvas.jsx';
import DownloadButton from './components/DownloadButton.jsx';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = React.useState('');
  const canvasRef = useRef(null);

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className='bg-slate-700 min-h-screen w-full'>
      <SearchComponent onImageSelect={handleImageSelect} /> 
      {selectedImage && (
        <>
          <ImageCanvas 
            selectedImage={selectedImage} 
            caption={caption} 
            canvasRef={canvasRef} 
          />
          <DownloadButton 
            canvasRef={canvasRef} 
            caption={setCaption} 
          />
        </>
      )}
    </div>
  );
};

export default App;
