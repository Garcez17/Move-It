import React, { Dispatch, InputHTMLAttributes, SetStateAction } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  setUsername: Dispatch<SetStateAction<string>>;
}

export default function Input({ setUsername }: InputProps) {
  return (
    <Container>
      <input type="text" placeholder="Digite seu username" onChange={(e) => setUsername(e.target.value)} />
    </Container>
  );
}
