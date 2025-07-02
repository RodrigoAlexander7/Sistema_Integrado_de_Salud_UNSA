import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";

interface EmptyStateCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({ 
  title, 
  description, 
  icon,
  action 
}) => {
  const { theme } = useTheme();

  return (
    <Card
      className={`rounded-2xl overflow-hidden shadow-md w-full ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-600' 
          : 'bg-white border-white'
      }`}
    >
      <CardContent className="p-8 text-center flex flex-col items-center justify-center">
        <div className={`flex items-center justify-center h-14 w-14 rounded-full mb-4 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          {icon}
        </div>

        <h3 className={`text-lg font-semibold mb-2 ${
          theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {title}
        </h3>

        <p className={`mb-4 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {description}
        </p>

        {action && (
          <div className="mt-2">
            {action}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;
