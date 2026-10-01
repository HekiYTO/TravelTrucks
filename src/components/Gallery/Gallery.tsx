'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { CamperImage } from '@/lib/api/types';
import css from './Gallery.module.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export default function Gallery({ images, name }: { images: CamperImage[]; name: string }) {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);
  const sorted = [...images].sort((a, b) => a.order - b.order);

  if (sorted.length === 0) return null;

  return (
    <div className={css.gallery}>
      <Swiper
        className={css.main}
        spaceBetween={12}
        modules={[FreeMode, Thumbs]}
        thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
      >
        {sorted.map((image, i) => (
          <SwiperSlide key={image.id}>
            <div className={css.mainFrame}>
              <Image
                src={image.original}
                alt={`${name}, photo ${i + 1}`}
                fill
                sizes="640px"
                className={css.img}
                priority={i === 0}
                unoptimized
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className={css.thumbs}
        onSwiper={setThumbs}
        spaceBetween={32}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
      >
        {sorted.map((image, i) => (
          <SwiperSlide key={image.id} className={css.thumbSlide}>
            <div className={css.thumbFrame}>
              <Image
                src={image.thumb}
                alt={`${name}, thumbnail ${i + 1}`}
                fill
                sizes="150px"
                className={css.img}
                unoptimized
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
