import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';
import useDiaryAnalysis from '../hooks/useDiaryAnalysis';

export default function DiaryContent({ diary_id, content, text, color, handleDayMoodAnalysisToggle }) {
  const { getDiaryAnalysis, getRecommendedMusic } = useDiaryAnalysis(diary_id);
  return (
    <>
      <div className='w-[298px] text-center font-normal text-[13px] text-darkGray'>{content}</div>
      <Link to='/main'>
        <CustomButton
          text={text}
          color={color}
          onClick={() => {
            handleDayMoodAnalysisToggle();
            getDiaryAnalysis();
            getRecommendedMusic();
          }}
        />
      </Link>
    </>
  );
}
