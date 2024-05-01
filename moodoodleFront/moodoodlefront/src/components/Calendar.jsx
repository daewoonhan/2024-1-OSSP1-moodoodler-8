import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import selectedDateState from '../stores/selectedDate';
import useRenderCalenderBoard from './useRenderCalenderBoard';
import MoodColorComponent from './MoodColorComponent';

const days = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({ handleToggle }) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const splited = selectedDate.split('/');

  const handleSelectDate = (v) => {
    setSelectedDate(v);
  };

  const handlePrevMonth = () => {
    const newDate = dayjs(selectedDate)
      .subtract(1, 'month')
      .endOf('month')
      .format('MM/DD/YY');
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = dayjs(selectedDate)
      .add(1, 'month')
      .startOf('month')
      .format('MM/DD/YY');
    setSelectedDate(newDate);
  };

  const board = useRenderCalenderBoard(selectedDate, handleSelectDate);

  return (
    <div className='flex relative justify-center items-center w-[342px] h-[304px] rounded-[20px] shadow-componentShadow'>
      <div className='flex flex-col justify-between items-center w-[290px] h-[260px]'>
        <div className='flex flex-row justify-between items-center w-[283px] h-[18px]'>
          <img
            src='/assets/leftArrow.svg'
            alt='왼쪽 화살표'
            className='w-[9px] h-[7px]'
            onClick={handlePrevMonth}
          />
          <p className='text-[15px] font-semibold text-darkNavy'>
            20{splited[2]}년 {splited[0]}월
          </p>
          <img
            src='/assets/rightArrow.svg'
            alt='오른쪽 화살표'
            className='w-[9px] h-[7px]'
            onClick={handleNextMonth}
          />
        </div>
        <div className='flex flex-col justify-between items-center w-[290px] h-[218px] border-t border-[#E4E5E7]'>
          <div className='flex justify-center w-[290px] pt-[13px] grid grid-cols-7 '>
            {days.map((v) => (
              <div className='font-medium text-[10px] text-center' key={v}>
                {v}
              </div>
            ))}
          </div>
          <div className='w-[290px] h-[171px] grid grid-cols-7 text-center text-[8px] text-darkGreen'>
            {board}
          </div>
        </div>
      </div>
      <button
        className='absolute right-[15px] bottom-[15px]'
        type='button'
        onClick={handleToggle}
      >
        <img src='/assets/more.svg' alt='컬러칩 보기' />
      </button>
    </div>
  );
}
