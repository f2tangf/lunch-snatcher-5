// src/app/lunchSnatcher/page.js
'use client';


import Image from "next/image";
import { useState, useEffect, useRef, Link } from "react";
import { HashRouter as Router, Routes, Route} from "react-router-dom";


import StartPage01 from '@/component/page/StartPage01';
import StartPage02 from '@/component/page/StartPage02';
import StartPage03 from '@/component/page/StartPage03';
import GamePage from '@/component/page/GamePage';
import ResultPage01 from '@/component/page/ResultPage01';
import ResultPage02 from '@/component/page/ResultPage02';



import BgImg from '@/../public/source/0-1-notice/0-1-bg.png';
import GroupImg1 from '@/../public/source/0-1-notice/0-1-big-group.png';
import NextBtnImg from '@/../public/source/0-1-notice/0-1-button.png';





export default function lunchSnatcher({onNext}) {
 

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
              src={BgImg.src}
              alt="遊戲背景"
              className="w-full h-full object-cover"
            />
          </div>
    
          {/* 遊戲名稱 */}
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
                  src={GroupImg1.src}
                  alt="遊戲名稱"
                  
                  width={332}
                  height={454}
                  objectFit="contain"
                  priority
                />
              </div>
                
              
            </div>
    
            {/* 下一步按鈕 */}
            
            <button
                onClick={onNext}
                style={{ 
                position: 'absolute',
                bottom: '85px',
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
                src={NextBtnImg.src}
                alt="下一步"
                width={250}
                height={110}
                style={{ objectFit: 'contain' }}
              />
            </button>
            
            </div>

            
      </>
    
     
      
 );
      
}

