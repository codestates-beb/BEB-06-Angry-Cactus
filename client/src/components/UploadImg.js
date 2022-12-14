import React, { useState,useContext } from 'react';
import {File} from 'nft.storage';
import axios from 'axios';
import "../utils/Font.css"
import Loading from '../Loding/Loading';
import Swal from 'sweetalert2';
import { AppContext } from '../AppContext';

const UploadImg = ({contact, imageSrc}) => {
  const context = useContext(AppContext);
  const {account, contract, client} = context.state;
  const [loading,setLoading] = useState(false);

  const handleImagebutton = async() => {
    if(!account){
      Swal.fire({
        title: '메타마스크 연결을 확인해주세요.',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    } else {
      setLoading(true);
      contact.image=new File([imageSrc],{type:'image/jpg'});

      const metadata=contact;
      const result = await client.store(metadata);

      contract.methods.mintNFT(result.ipnft,contact.price).send({from:account})
      .on('transactionHash',(hash)=>{
        metadata.image=imageSrc;
        metadata.account=account;
        metadata.url = result.url;
        axios.post('http://localhost:5001/call/mint',JSON.stringify(metadata),{
          headers:{
            "Content-Type": 'application/json',
          },
        })
        .then((res)=>{
          setLoading(false);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 10000
          })
          window.location.replace("/create");
        }).catch(err=>{
          console.log(err);
        });
      })
      .on('error',(e)=>{
        console.log(e);
      });
    }
  };

  return (
    <>
    <div style={{marginTop: "30px", border:"none", textAlign:"center", color:"white", fontSize:"19px"}}>
      <p>파일 선택시 이미지가 위에 표시됩니다.</p>
      {loading ? <Loading/> : null}
    </div>
    <button className="mint-button" label="업로드" onClick={handleImagebutton}>Mint</button>
    </>
  )
}

export default UploadImg;