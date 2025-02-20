import { useState } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (message, options = {}) => {
    setToast({ message, ...options });
    setTimeout(() => setToast(null), options.duration || 3000);
  };

  return { toast, showToast };
}