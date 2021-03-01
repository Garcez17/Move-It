import React, { ButtonHTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
