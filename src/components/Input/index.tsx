import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function Input({}: InputProps) {
  return (
    <Container>
      <input type="text" placeholder="Digite seu username" />
    </Container>
  );
}
