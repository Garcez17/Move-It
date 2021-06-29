import Modal from 'react-modal';
import Image from 'next/image';
import { useForm, SubmitHandler } from "react-hook-form";

import logoImg from '../../assets/logo.png';

import { Container, Wrapper } from './styles';
import { api } from '../../services/api';
import { useState } from 'react';
import { useCountdown } from '../../contexts/CountdownContext';

type WelcomeModalProps = {
  userId: string;
}

interface IFormData {
  work_time: string;
  break_time: string;
}

export function WelcomeModal({ userId }: WelcomeModalProps) {
  const { register, handleSubmit } = useForm<IFormData>();
  const { pomodoro, handleAddPomodoro } = useCountdown();

  async function handleCreatePomodoro(data: IFormData) {
    const { break_time, work_time } = data;

    const response = await api.post('/users/create-pomodoro', {
      pom_time: Number(work_time), 
      pom_break: Number(break_time), 
      user_id: userId,
    });

    handleAddPomodoro(response.data.data);
  }
  
  return (
    <Modal
      isOpen={!pomodoro} 
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container>
        <Wrapper>
          <h1>
            Bem vindo ao
            <Image src={logoImg} width={200} height={42} />
          </h1>

          <form onSubmit={handleSubmit(handleCreatePomodoro)}>
            <span>Para inciar, selecione suas configurações de pomodoro</span>
          
            <label htmlFor="work-time">
              Tempo de ciclo
              <select name="select" id="work-time" {...register('work_time')}>
                <option value="25">25 minutos</option>
                <option value="30">30 minutos</option>
                <option value="35">35 minutos</option>
                <option value="45">45 minutos</option>
              </select>
            </label>

            <label htmlFor="break_time">
              Tempo de intervalo
              <select name="select2" id="break_time" {...register('break_time')}>
                <option value="5">5 minutos</option>
                <option value="6">6 minutos</option>
                <option value="7">7 minutos</option>
                <option value="8">8 minutos</option>
                <option value="9">9 minutos</option>
                <option value="10">10 minutos</option>
              </select>
            </label>
            <button>
              Iniciar!
            </button>
          </form>
        </Wrapper>
      </Container>
    </Modal>
  )
}