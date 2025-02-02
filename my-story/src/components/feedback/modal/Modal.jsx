import React, { useState } from 'react';
import CustomModal from './CustomModal';

const Modal = () => {
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

export default Modal;
