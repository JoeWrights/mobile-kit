import React from 'react';

const GalleryPage: React.FC = () => {
  return (
    <iframe
      src='/gallery/index.html'
      style={{ width: '100%', height: 'calc(100vh - 120px)', minHeight: 640, border: 0, display: 'block' }}
    />
  );
};

export default GalleryPage;
