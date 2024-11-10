import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl w-full max-w-4xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3 className="text-xl font-light text-white/90">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-white/70 hover:text-white" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}