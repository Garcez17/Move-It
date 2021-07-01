import Modal from 'react-modal';
import Image from 'next/image';
import { useForm } from "react-hook-form";

import { Container, Wrapper } from './styles';
import { api } from '../../services/api';
import { useCountdown } from '../../hooks/useCountdown';
import { memo } from 'react';
import { Pomodoro } from '../../contexts/CountdownContext';

interface IFormData {
  work_time: string;
  break_time: string;
}

export type WelcomeModalProps = {
  userId: string;
  pomodoro: Pomodoro;
  handleAddPomodoro: (data: Pomodoro) => void;
}

function WelcomeModalComponent({ userId, pomodoro, handleAddPomodoro }: WelcomeModalProps) {
  const { register, handleSubmit } = useForm<IFormData>();

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
            <Image src="/logo.png" width={200} height={42} />
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

export const WelcomeModal = memo(WelcomeModalComponent);