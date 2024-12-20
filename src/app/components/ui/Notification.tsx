import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  icon: string;
  isVisible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, icon, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    isVisible && (
      <div className="fixed top-0 right-5 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center shadow-lg transition-opacity duration-500 opacity-100">
        <span className="mr-2 text-xl">{icon}</span>
        <span>{message}</span>
      </div>
    )
  );
};

export default Notification;
