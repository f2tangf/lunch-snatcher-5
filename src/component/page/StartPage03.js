// src/app/lunchSnatcher/StartPage03/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import MobileFrame from '@/component/layout/MobileFrame'
import BgImg3 from '@/../public/source/0-3-notice/0-3-bg.png';
import GroupImg3 from '@/../public/source/0-3-notice/0-3-big-group.png';
import NextBtnImg2 from '@/../public/source/0-3-notice/0-3-button.png';

export default function StartPage03({onNext}) {
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
            src={BgImg3.src}
            alt="遊戲背景"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 規則面板背景 */}
        <div style={{ 
            position: 'absolute',
            top: 0,
            bottom: 0,
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
                src={GroupImg3.src}
                alt="遊戲名稱"
                
                width={350}
                height={750}
                objectFit="contain"
                priority
              />
            </div>
              
            
          </div>

          {/* 開始按鈕 */}
          
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
              src={NextBtnImg2.src}
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