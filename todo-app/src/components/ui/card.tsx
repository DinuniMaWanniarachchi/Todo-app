import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<CardProps> = ({ className = '', ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  );
};

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

export const CardHeader: React.FC<CardHeaderProps> = ({ className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  );
};

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

export const CardTitle: React.FC<CardTitleProps> = ({ className = '', ...props }) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  );
};

type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export const CardContent: React.FC<CardContentProps> = ({ className = '', ...props }) => {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
};