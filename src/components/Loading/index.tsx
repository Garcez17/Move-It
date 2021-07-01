import Image from "next/image";
import ReactLoading from 'react-loading';

import { Container } from './styles';

export function Loading() {
  return (
    <Container>
      <Image src="/logo.png" height={40} width={200} />
      <ReactLoading type="spin" color="#f2f3f5" height={32} width={32} />
    </Container>
  )
}