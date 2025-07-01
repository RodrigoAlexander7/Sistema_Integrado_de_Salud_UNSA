import React from "react";

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
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyStateCard;