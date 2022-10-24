import React, { useState, useContext } from 'react'
import Header from '../components/Header';
import NftCard from '../components/NftCard'
import { AppContext } from '../AppContext'
import axios from 'axios'

//IPFS 를 사용하는법
// 1. 이미지 파일을 IPFS에 저장한다.
// 2. logo.png 라는 이미지 파일을 IPFS에 올린다.
// 3. CID가 생성되면서 업로드가 시작됨.
// 4. 퍼블릭 URL을 가져온다. 2에서 생성한 CID를 웹 콘솔 상단에 복사 붙혀넣으면,

//nft.strorage 를 이용해서 만드는 방법.

function CreatePage({handleWalletClick}) {
  const context = useContext(AppContext)

  return (
    <>
      <Header handleWalletClick={handleWalletClick}/>
      <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems:"center", marginTop:"130px", marginBottom:"100px" }}>
        <span style={{color:"#FFFFFF", fontSize:"24px", textAlign:"center", paddingBottom: "5vw"}}>현재 당신의 계정은<br/>
          <p style={{fontSize:"16px", paddingTop:"32px"}}>{context.account}</p>
        </span>
        <NftCard />
      </div>
    </>
  )
}

export default CreatePage

