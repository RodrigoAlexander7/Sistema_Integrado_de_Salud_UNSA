import React, { useState, type ReactNode, useRef, useEffect } from "react";

interface SelectContextProps {
  value: string;
  setValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextProps | null>(null);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, setValue: onValueChange, isOpen, setIsOpen }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectTrigger must be used within a Select");

  return (
    <button
      type="button"
      onClick={() => ctx.setIsOpen(!ctx.isOpen)}
      className={`w-full cursor-pointer rounded border border-gray-300 bg-white px-3 py-2 text-left focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectValue must be used within a Select");

  return (
    <span className={ctx.value ? "" : "text-gray-400"}>
      {ctx.value || placeholder || "Seleccione"}
    </span>
  );
};

export const SelectContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectContent must be used within a Select");

  if (!ctx.isOpen) return null;

  return (
    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg">
      {children}
    </ul>
  );
};

export const SelectItem: React.FC<{ value: string; children: ReactNode }> = ({ value, children }) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectItem must be used within a Select");

  const handleSelect = () => {
    ctx.setValue(value);
    ctx.setIsOpen(false);
  };

  return (
    <li
      onClick={handleSelect}
      className="cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white"
    >
      {children}
    </li>
  );
};
