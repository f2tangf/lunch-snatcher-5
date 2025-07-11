// src/app/lunchSnatcher/ResultPage02/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; 

import MobileFrame from '@/component/layout/MobileFrame'

import BgImg6 from '@/../public/source/2-2-result/2-2-bg.png';
import GroupImg6 from '@/../public/source/2-2-result/2-2-big-group.png';
import NextBtnImg5 from '@/../public/source/2-2-result/2-2-button-up.png';
import NextBtnImg6 from '@/../public/source/2-2-result/2-2-button-down.png';


export default function ResultPage02({onPlayAgain, onHome}) {

  const router = useRouter();


    return (
        <>
        
        <div style={{ 
          width: '100vw', 
          height: '100vh', 
          position: 'relative',
          overflow: 'hidden'
         }}>
          
          {/* 背景圖片 */}
          <div className="fixed inset-0 w-full h-full">
            <img
              src={BgImg6.src}
              alt="遊戲背景"
              className="w-full h-full object-cover"
            />
          </div>
    
          {/* 結果圖像 */}
          <div style={{ 
              position: 'absolute',
              top: 0,
              bottom: 160,
              left: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
             
            }}>
              <div style={{ 
                width: '100%',     
                maxWidth: 332,      
                height: 'auto',
              }}>
                
                <Image
                  src={GroupImg6.src}
                  alt="失敗結果"
                  
                  width={332}
                  height={454}
                  objectFit="contain"
                  priority
                />
              </div>
                
              
            </div>
            
    
            {/* 再玩一次按鈕 */}
            <button
             onClick={onPlayAgain}
              style={{ 
                position: 'absolute',
                bottom: '166px',
                left: '50%',
                transform: 'translateX(-50%)',
                border: 'none',
                background: 'none',
                padding: 0,
                cursor: 'pointer',
                zIndex: 2,
                transition: 'transform 0.3s ease'
              }}
            >
              <Image
                src={NextBtnImg5.src}
                alt="再玩一次"
                width={250}
                height={110}
                style={{ objectFit: 'contain' }}
              />
            </button>

             {/* 回首頁按鈕 */}
              <button
                onClick={() => router.push('https://classroomdaydream.vercel.app/')}
                style={{ 
                position: 'absolute',
                bottom: '56px',
                left: '50%',
                transform: 'translateX(-50%)',
                border: 'none',
                background: 'none',
                padding: 0,
                cursor: 'pointer',
                zIndex: 2,
                transition: 'transform 0.3s ease'
              }}
            >
              <Image
                src={NextBtnImg6.src}
                alt="回首頁"
                width={250}
                height={110}
                style={{ objectFit: 'contain' }}
              />
            </button>
           
            
            </div>
      </>
    );
  }