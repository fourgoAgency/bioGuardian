'use client';
import React, { useEffect } from 'react';
import { updatePcosPostImage } from '@/lib/updatePcosPost';

const UpdatePcosImage = () => {
  useEffect(() => {
    updatePcosPostImage();
  }, []);

  return null;
};

export default UpdatePcosImage;
