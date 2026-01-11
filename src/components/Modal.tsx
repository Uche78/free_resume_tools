import React from 'react';
import { X, Star, Download } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info';

  // NEW: primary action
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'success',
  primaryActionLabel = 'Download',
  onPrimaryAction,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>

        <p className="text-gray-600 mb-6 text-center whitespace-pre-line">{message}</p>

        <div className="space-y-3">
          {/* PRIMARY: Download */}
          <button
            onClick={() => {
              onPrimaryAction?.();
              onClose();
            }}
            disabled={!onPrimaryAction}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg transition-colors
              ${
                onPrimaryAction
                  ? 'bg-[#3b3b3b] text-white hover:bg-opacity-90'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
          >
            <Download className="w-4 h-4" />
            {primaryActionLabel}
          </button>

          {/* SECONDARY: Review */}
          <a
            href="https://www.trustpilot.com/evaluate/freeresumetools.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Leave a Review (30 seconds)
          </a>

          {/* TERTIARY */}
          <button onClick={onClose} className="w-full text-sm text-gray-500 hover:text-gray-700">
            Not now
          </button>

          <p className="text-xs text-gray-400 text-center mt-2">
            We don’t sell user data or lock features behind a paywall.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
