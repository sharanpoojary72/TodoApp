import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                background: 'rgba(0, 0, 0, 0.5)', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                style={{
                    background: 'black', padding: '20px', borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',border: '1px solid #ccc'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;