// src/components/TitleCard.tsx
import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";

interface TitleCardProps {
  title: string;
  icon?: React.ReactNode;
}

const TitleCard: React.FC<TitleCardProps> = ({ title, icon }) => {
  const { theme } = useTheme();

  return (
    <div className="w-full mb-8">
      <Card className={`w-full shadow-lg rounded-xl border-none ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white'
          : 'bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 text-white'
      }`}>
        <CardContent className="w-full flex flex-col items-center gap-4 py-6 px-0">
          <div className="flex items-center gap-3">
            {icon && <div className="icon-container">{icon}</div>}
            <CardTitle className={`text-4xl font-bold text-center text-white`}>
              {title}
            </CardTitle>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TitleCard;