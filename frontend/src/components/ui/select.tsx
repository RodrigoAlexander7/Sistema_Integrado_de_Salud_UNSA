import React, { useState, type ReactNode, useContext } from "react";
import { useTheme } from "@/context/ThemeContext";

interface SelectContextProps {
  value: string;
  setValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
}

interface SelectContentProps {
  children: ReactNode;
  className?: string;
  position?: "popper" | "item-aligned";
  side?: "top" | "bottom" | "left" | "right";
}

interface SelectContentProps {
  children: ReactNode;
  className?: string;
  position?: "popper" | "item-aligned";
  side?: "top" | "bottom" | "left" | "right";
  style?: React.CSSProperties; // Añade esta línea
}

const SelectContext = React.createContext<SelectContextProps | null>(null);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <SelectContext.Provider value={{ 
      value, 
      setValue: onValueChange, 
      isOpen, 
      setIsOpen,
      theme 
    }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ 
  children, 
  className = "" 
}) => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("SelectTrigger must be used within a Select");

  const themeClasses = ctx.theme === 'dark'
    ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50";

  return (
    <button
      type="button"
      onClick={() => ctx.setIsOpen(!ctx.isOpen)}
      className={`w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        ctx.theme === 'dark' 
          ? 'focus:ring-blue-500 focus:ring-offset-gray-800' 
          : 'focus:ring-blue-500 focus:ring-offset-white'
      } ${themeClasses} ${className}`}
    >
      {children}
      <span className="ml-2">
        {ctx.isOpen ? (
          <ChevronUp className="h-4 w-4 opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </span>
    </button>
  );
};

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ 
  placeholder, 
  className = "" 
}) => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("SelectValue must be used within a Select");

  return (
    <span className={`truncate ${!ctx.value ? 'text-gray-400' : ''} ${className}`}>
      {ctx.value || placeholder || "Seleccione"}
    </span>
  );
};

interface SelectContentProps {
  children: ReactNode;
  className?: string;
  position?: "popper" | "item-aligned";
}

export const SelectContent: React.FC<SelectContentProps> = ({ 
  children, 
  className = "",
  position = "item-aligned",
  side = "bottom",
  style = {} // Valor por defecto
}) => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("SelectContent must be used within a Select");

  const baseClasses = "absolute z-50 max-h-60 w-full overflow-auto rounded-md border shadow-lg focus:outline-none";
  
  const themeClasses = ctx.theme === 'dark'
    ? "bg-gray-800 border-gray-700 text-gray-100"
    : "bg-white border-gray-200 text-gray-900";

  const positionClasses = position === "popper" 
    ? "min-w-[var(--radix-select-trigger-width)]"
    : "w-full";

  const sideClasses = {
    top: "bottom-full mb-1",
    bottom: "mt-1",
    left: "right-full mr-1",
    right: "ml-1"
  }[side];

  if (!ctx.isOpen) return null;

  return (
    <ul 
      className={`${baseClasses} ${themeClasses} ${positionClasses} ${sideClasses} ${className}`}
      style={style} // Aplica los estilos inline aquí
    >
      {children}
    </ul>
  );
};

interface SelectItemProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const SelectItem: React.FC<SelectItemProps> = ({ 
  value, 
  children, 
  className = "",
  disabled = false
}) => {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("SelectItem must be used within a Select");

  const handleSelect = () => {
    if (!disabled) {
      ctx.setValue(value);
      ctx.setIsOpen(false);
    }
  };

  const themeClasses = ctx.theme === 'dark'
    ? "hover:bg-gray-700 data-[disabled]:text-gray-500 data-[disabled]:cursor-not-allowed"
    : "hover:bg-gray-100 data-[disabled]:text-gray-400 data-[disabled]:cursor-not-allowed";

  const selectedClass = ctx.value === value 
    ? (ctx.theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50') 
    : '';

  return (
    <li
      onClick={handleSelect}
      data-disabled={disabled ? "" : undefined}
      className={`relative cursor-default select-none py-2 pl-3 pr-9 rounded-md transition-colors ${themeClasses} ${selectedClass} ${className}`}
    >
      {children}
      {ctx.value === value && (
        <span className="absolute right-3 top-2.5">
          <Check className="h-4 w-4" />
        </span>
      )}
    </li>
  );
};

// Componentes para los iconos (puedes importarlos de tu librería de iconos)
const ChevronUp = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);