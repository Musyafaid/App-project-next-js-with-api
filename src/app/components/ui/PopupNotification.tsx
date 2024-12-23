"use client";

import React from 'react';
import { AlertCircle, Check, X, Trash, Edit, AlertTriangle } from 'lucide-react';

type PopupVariant = 'info' | 'delete' | 'update' | 'warning';

interface PopupNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  variant?: PopupVariant;
  customIcon?: React.ReactNode;
  confirmButtonText?: string;
  cancelButtonText?: string;
  iconSize?: string; // Optional size for the icon
}

const PopupNotification: React.FC<PopupNotificationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  variant = 'info',
  customIcon,
  confirmButtonText,
  cancelButtonText,
  iconSize = 'h-12 w-12', // Default icon size
}) => {
  if (!isOpen) return null;

  const getVariantConfig = () => {
    switch (variant) {
      case 'delete':
        return {
          icon: <Trash className={`${iconSize} text-red-500`} />,
          iconBg: 'bg-red-100',
          confirmBg: 'bg-red-600 hover:bg-red-700',
          confirmText: confirmButtonText || 'Hapus',
          cancelText: cancelButtonText || 'Batal',
          defaultTitle: 'Konfirmasi Hapus',
          defaultMessage: 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
          confirmRing: 'focus:ring-red-500',
        };
      case 'update':
        return {
          icon: <Edit className={`${iconSize} text-blue-500`} />,
          iconBg: 'bg-blue-100',
          confirmBg: 'bg-blue-600 hover:bg-blue-700',
          confirmText: confirmButtonText || 'Update',
          cancelText: cancelButtonText || 'Batal',
          defaultTitle: 'Konfirmasi Update',
          defaultMessage: 'Apakah Anda yakin ingin memperbarui data ini?',
          confirmRing: 'focus:ring-blue-500',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className={`${iconSize} text-yellow-500`} />,
          iconBg: 'bg-yellow-100',
          confirmBg: 'bg-yellow-600 hover:bg-yellow-700',
          confirmText: confirmButtonText || 'Lanjutkan',
          cancelText: cancelButtonText || 'Batal',
          defaultTitle: 'Peringatan',
          defaultMessage: 'Apakah Anda yakin ingin melanjutkan?',
          confirmRing: 'focus:ring-yellow-500',
        };
      default:
        return {
          icon: <AlertCircle className={`${iconSize} text-gray-500`} />,
          iconBg: 'bg-gray-100',
          confirmBg: 'bg-gray-600 hover:bg-gray-700',
          confirmText: confirmButtonText || 'OK',
          cancelText: cancelButtonText || 'Batal',
          defaultTitle: 'Konfirmasi',
          defaultMessage: 'Apakah Anda yakin ingin melanjutkan?',
          confirmRing: 'focus:ring-gray-500',
        };
    }
  };

  const config = getVariantConfig();

  return (
    <div className="fixed h-screen overflow-hidden inset-0 z-50 ">
      <div className="fixed inset-0 bg-black/30"></div>

      <div className="flex h-screen items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full mb-6">
              <div className={`rounded-full p-3 ${config.iconBg}`}>
                {customIcon || config.icon}
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title || config.defaultTitle}
              </h3>
              <p className="text-sm text-gray-500">
                {message || config.defaultMessage}
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={onClose}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                {config.cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${config.confirmBg} ${config.confirmRing}`}
              >
                {config.confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupNotification;
