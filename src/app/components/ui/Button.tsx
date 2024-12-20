"use client";

import React from "react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Teks atau elemen dalam tombol
  onClick?: () => void; // Fungsi yang dipanggil saat tombol diklik
  type?: "button" | "submit" | "reset"; // Tipe tombol
  disabled?: boolean; // Status disabled tombol
  variant?: "primary" | "secondary" | "danger" | "success"; // Gaya tombol
  className?: string; // Gaya tambahan
  icon?: ReactNode; // Ikon dalam tombol
  bgColor?: string; // Warna latar belakang custom
  size?: "sm" | "md" | "lg"; // Ukuran tombol (small, medium, large)
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
  bgColor,
  size = "md",
}) => {
  // Tentukan gaya tombol berdasarkan variant
  const baseStyle =
    "px-4 py-2 rounded font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
  };

  // Tentukan ukuran tombol
  const sizes = {
    sm: "px-2 py-1 text-xs", // Small
    md: "px-4 py-2 text-sm", // Medium
    lg: "px-6 py-3 text-lg", // Large
  };

  // Tentukan gaya latar belakang custom
  const backgroundColor = bgColor || variants[variant];

  // Kombinasikan semua gaya tombol
  const buttonStyle = `${baseStyle} ${
    sizes[size]
  } ${backgroundColor} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonStyle} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      
      {children}
    </button>
  );
};

export default Button;
