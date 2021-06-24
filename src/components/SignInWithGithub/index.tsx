import React, { ButtonHTMLAttributes } from 'react';
import { AiFillGithub } from 'react-icons/ai';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function SignInWithGithub({ ...rest }: ButtonProps) {
  return (
    <Container {...rest}>
      <AiFillGithub color="#f2f3f5" size={32} />
      Sign in with Github
    </Container>
  );
}
