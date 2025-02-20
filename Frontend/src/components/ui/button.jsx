import React from "react";

export function Button({ children, onClick, className, variant = "default", size = "default" }) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors";
  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "bg-transparent text-blue-500 hover:bg-blue-50",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  const sizeStyles = {
    default: "text-base",
    sm: "text-sm",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}