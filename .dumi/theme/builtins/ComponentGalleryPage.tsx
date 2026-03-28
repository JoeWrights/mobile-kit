import React from 'react';

interface ComponentGalleryPageProps {
  componentKey?: string;
}

const ComponentGalleryPage: React.FC<ComponentGalleryPageProps> = ({ componentKey = 'button' }) => {
  return (
    <iframe
      src={`/gallery/${componentKey}/index.html`}
      style={{ width: '100%', height: 'calc(100vh - 120px)', minHeight: 640, border: 0, display: 'block' }}
    />
  );
};

export default ComponentGalleryPage;
