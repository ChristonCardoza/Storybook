# Essentials for Modal

## Modal Backdrop
The entire modal is wrapped within the backdrop, clicking anywhere in the backdrop, the modal must be closed. It must cover entire screen.

```javascript
const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;
```
## Modal Container

It's the container of all modal children, which consist of header, content and footer.

```javascript
const ModalContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    min-width: 300px;
    position: absolute;
    cursor: move;
    max-height: 80vh;
    overflow-y: auto;
`;
```

## Modal Header

It indicate the header portion of the modal which mainly contains the title and close button.  We can also move the modal position by drag n drop.

```javascript
const ModalHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    margin-bottom: 10px;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;
```

## Modal Content

It is the body of the modal, which basically  render the children. It also contains spinner or skeleton which render before the children loads.

```javascript
const ModalContent = styled.div`
    color: #444;
    margin-bottom: 20px;
`;

const SkeletonLoader = styled.div`
    width: 100%;
    height: 20px;
    background-color: #ddd;
    animation: skeleton-loading 1.5s infinite ease-in-out;

    @keyframes skeleton-loading {
        0% {
            background-color: #ddd;
        }
        50% {
            background-color: #ccc;
        }
        100% {
            background-color: #ddd;
        }
    }
`;
```

## Modal Footer

It is the footer of the modal. It usually have cancel and submit button.

```javascript
const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const FooterButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    &:hover {
        background-color: #0056b3;
    }
`;
```

## Handling Drag-n-Drop

Click on the modal drag anywhere on screen and drop it. The modal is placed at dropped position

```javascript
const isDragging = useRef(false);
const offset = useRef({ x: 0, y: 0 });

const handleMouseDown = (e) => {
  isDragging.current = true;
  offset.current = {
    x: e.clientX - position.x,
    y: e.clientY - position.y,
  };
};

const handleMouseMove = (e) => {
  if (isDragging.current) {
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  }
};

const handleMouseUp = () => {
  isDragging.current = false;
};
```

## Entire Working Modal

```javascript
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    padding: 20px;
    min-width: 300px;
    position: absolute;
    cursor: move;
    max-height: 80vh;
    overflow-y: auto;
`;

const ModalHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;
    margin-bottom: 10px;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const ModalContent = styled.div`
    color: #444;
    margin-bottom: 20px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

const FooterButton = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    &:hover {
        background-color: #0056b3;
    }
`;

const SkeletonLoader = styled.div`
    width: 100%;
    height: 20px;
    background-color: #ddd;
    animation: skeleton-loading 1.5s infinite ease-in-out;

    @keyframes skeleton-loading {
        0% {
            background-color: #ddd;
        }
        50% {
            background-color: #ccc;
        }
        100% {
            background-color: #ddd;
        }
    }
`;

const CustomModal = ({ isOpen, onClose, title, children, footer }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false); // Set loading to false after 2 seconds
      }, 2000);

      // Initialize position to center the modal initially
      setPosition({
        x: window.innerWidth / 2 - 150,
        y: window.innerHeight / 2 - 150,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <ModalHeader onMouseDown={handleMouseDown}>
          {title}
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalContent>
          {isLoading ? (
            <>
              <SkeletonLoader />
            </>
          ) : (
            children // Show the actual content once loading is complete
          )}
        </ModalContent>
        <ModalFooter>
          {footer || (
            <>
              <FooterButton onClick={onClose}>Cancel</FooterButton>
              <FooterButton onClick={onClose}>OK</FooterButton>
            </>
          )}
        </ModalFooter>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default CustomModal;
```
```javascript
import React, { useState } from 'react';
import CustomModal from './CustomModal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        Open Modal
      </button>

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Styled Modal"
      >
        <p>This is a custom modal using Styled Components!</p>
      </CustomModal>
    </div>
  );
};

export default App;

```