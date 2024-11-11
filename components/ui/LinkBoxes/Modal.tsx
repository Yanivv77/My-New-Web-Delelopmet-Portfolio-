import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  
  // Prevent body scroll when modal is open
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }

  const handleClose = () => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
    onClose();
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999]"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl w-full max-w-4xl shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-inherit">
            <h3 className="text-xl font-light text-white/90">{title}</h3>
            <button
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white/70 hover:text-white" />
            </button>
          </div>
          
          {/* Content */}
          <div className="max-h-[calc(90vh-8rem)] overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the document body level
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
}