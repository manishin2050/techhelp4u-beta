import React from 'react';
import { Slot } from '@radix-ui/react-slot';

// simple cn function
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// button variants
const buttonVariants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-white hover:bg-destructive/90',
  outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
};

// button size classes
const sizeVariants = {
  sm: 'h-8 px-3 text-rounded-full',
  default: 'h-10 px-6 text-base',
  lg: 'h-18 px-8 text-lg',
  xl: 'h-14 px-10 text-xl',
};

export default function Button({ className = '', variant = 'default', size = 'default', asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';
  const variantClass = buttonVariants[variant] || buttonVariants.default;
  const sizeClass = sizeVariants[size] || sizeVariants.default;

  return (
    <Comp
      data-slot="button"
    className={cn(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none',
  variantClass,
  sizeClass,
  className
)}

      {...props}
    />
  );
}
