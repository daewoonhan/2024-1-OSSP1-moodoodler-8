import { useState } from 'react';
import { defaultAxios } from '../axios/defaultAxios';

export default function useProfile() {
  const [profile, setProfile] = useState({
    nickname: '',
    description: '',
    isPublic: false,
    profile_image: '',
  });

  const [isModified, setIsModified] = useState(false);

  const getUserProfile = async () => {
    try {
      const getProfileResponse = await defaultAxios.get(
        `/user/mypage/${localStorage.getItem('id')}/`,
        {
          id: localStorage.getItem('id'),
        },
        {
          withCredentials: true,
        }
      );
      setProfile({
        nickname: getProfileResponse.data.data.nickname,
        description: getProfileResponse.data.data.description,
        isPublic: getProfileResponse.data.data.public,
        profile_image: getProfileResponse.data.data.profile_image,
      });
    } catch (error) {
      console.error(error.response);
    }
  };

  const patchUserProfile = async (handleProfileComponent) => {
    console.log(profile.profile_image);
    const patchUserInfoData = {
      id: localStorage.getItem('id'),
      nickname: profile.nickname,
      description: profile.description,
      public: profile.isPublic,
      profile_image: profile.profile_image,
    };
    try {
      const patchProfileManagementResponse = await defaultAxios.patch(
        `/user/mypage/${localStorage.getItem('id')}/`,
        patchUserInfoData
      );
      handleProfileComponent();
      setIsModified((prev) => !prev);
    } catch (error) {
      console.error(error.response);
    }
  };

  return { profile, setProfile, getUserProfile, patchUserProfile, isModified };
}
