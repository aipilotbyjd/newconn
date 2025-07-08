'use client';

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Card = ({ children, className = '', gradient = false }: CardProps) => {
  return (
    <div
      className={`
        ${gradient 
          ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900' 
          : 'bg-white dark:bg-gray-800'
        }
        rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50
        backdrop-blur-sm transition-all duration-300 hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: ReactNode;
  gradient: string;
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  gradient 
}: StatCardProps) => {
  const changeColor = {
    positive: 'text-green-600 dark:text-green-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400'
  }[changeType];

  return (
    <Card className="p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </span>
            {change && (
              <span className={`text-sm font-medium ${changeColor}`}>
                {change}
              </span>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${gradient}`}>
          <div className="text-white text-xl">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface ActionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  action: () => void;
  actionText: string;
}

export const ActionCard = ({ 
  title, 
  description, 
  icon, 
  gradient, 
  action, 
  actionText 
}: ActionCardProps) => {
  return (
    <Card className="p-6 group hover:scale-105 transition-all duration-300">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg ${gradient} flex-shrink-0`}>
          <div className="text-white text-xl">
            {icon}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {description}
          </p>
          <button
            onClick={action}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${gradient} text-white
              hover:shadow-lg hover:shadow-blue-500/25
              transform hover:-translate-y-0.5
            `}
          >
            {actionText}
          </button>
        </div>
      </div>
    </Card>
  );
};
