// src/app/lunchSnatcher/GamePage/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import MobileFrame from '@/component/layout/MobileFrame'
import BgImg7 from '@/../public/source/1-1-game/1-1-bg.png';
import GroupImg7 from '@/../public/source/1-1-game/1-1-desk group.png';
import GroupImg8 from '@/../public/source/1-1-game/1-1-my-box-bg.png';
import NextBtnImg7 from '@/../public/source/1-1-game/1-1-arrow-keys-up.png';
import NextBtnImg8 from '@/../public/source/1-1-game/1-1-arrow-keys-left.png';
import NextBtnImg9 from '@/../public/source/1-1-game/1-1-arrow-keys-down.png';
import NextBtnImg10 from '@/../public/source/1-1-game/1-1-arrow-keys-right.png';

export default function GamePage({onWin, onFail}) {
    return (
      <>
        <div style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative',
        overflow: 'hidden'
      }}>


      {/* 遊戲邏輯結束後呼 onWin 或 onFail */}
      <div> 
        <button onClick={onWin}>模擬 Win</button>
        <button onClick={onFail}>模擬 Fail</button>
      </div>


        {/* 背景圖片 */}
        <div className="fixed inset-0 w-full h-full">
          <img
            src={BgImg7.src}
            alt="遊戲背景"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 素材：桌椅底圖 */}
        <div style={{ 
            position: 'absolute',
            top: 0,
            bottom: 120,
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
                src={GroupImg7.src}
                alt="桌椅底圖"
                
                width={324}
                height={464}
                objectFit="contain"
                priority
              />

            </div>
         </div>


            {/* 方向鍵 */}
          <button
           
            style={{ 
              position: 'absolute',
              bottom: '80px',
              left: '73%',
              transform: 'translateX(-50%)',
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
              zIndex: 20,
              transition: 'transform 0.3s ease'
              
            }}
          >

            
            <div
                style={{
                display: 'flex',
                justifyContent: 'center',  // 水平置中
                width: '100%',             // 滿寬度可視需求調整
                }}
            >
                <Image
                src={NextBtnImg7.src}
                alt="上"
                width={40}
                height={40}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
                />
            </div>

                    <div
                    style={{
                        display: 'flex',               // 啟用 flex
                        flexDirection: 'row',          // 水平排列
                        justifyContent: 'center',      // 水平置中（也可改成 space-between / space-around）
                        alignItems: 'center',          // 垂直置中
                        gap: '5px'                    // 三個按鈕之間的間距
                    }}
                    >
                        <Image
                        src={NextBtnImg8.src}
                        alt="左"
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain', cursor: 'pointer' }}
                        />

                        <Image
                        src={NextBtnImg9.src}
                        alt="下"
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain', cursor: 'pointer' }}
                        />

                        <Image
                        src={NextBtnImg10.src}
                        alt="右"
                        width={40}
                        height={40}
                        style={{ objectFit: 'contain', cursor: 'pointer' }}
                        />
                    </div>
            
            
            
                </button>

            
              


              {/* 素材：通知窗 */}
                <Image
                    src={GroupImg8.src}
                    alt="通知窗"
                    width={350}
                    height={750}
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        objectFit: 'contain',
                        zIndex: 10
                    }}
                    priority
                />
              
      

    </div>

      </>
    );
  }