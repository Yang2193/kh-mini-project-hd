import React, { useEffect } from "react";
import HomeFooter from "../components/footer/HomeFooter";
import Header from "../components/header/Header";
import BizMenuBar from "../components/business/BizMenuBar";
import BizProfile from "../components/business/BizProfile";
import RatingView from "../components/business/RatingView";
import BizSection from "../components/business/BizSection";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";
import AxiosApi from "../api/AxiosApi";
import { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { useLocation } from "react-router-dom";

const BizBlock = styled.div`
//전체폰트
font-family: "NanumGothic";
//배경색상
background-color:#EEE4DC;
//페이지제목
.pageTitle{
        margin-top: 30px;
        text-align: center;
        font-size: 50px;
        font-weight: 800;
    }
`;
const MenuBlock =styled.div`
 width: 70%;
    margin: 0 auto;
    background-color:#F0B7A2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
`;

const BusinessPage = () => {

  const location =useLocation();
  const queryParams = new URLSearchParams(location.search);
  const headerSelect = queryParams.get("category");


    const [category,setCategory] = useState(null);
    const onSelect = useCallback(category => setCategory(category),[]);

    const [restInfoList, setRestInfoList] = useState('');
   

   
    //매장 정보 조회 
   const {restValue,setRestValue} =useContext(RestaurantContext);
 
      //레스토랑 정보

      const restaurant = async () => {
        const rsp = await AxiosApi.restSelect(localStorage.getItem("userId"));
        if (rsp.status === 200) setRestValue(rsp.data);
  
      };
      //레스토랑 상세정보
      const restInfo = async() => {
        console.log(restValue.restId);
       const rsp = await AxiosApi.restInfoSelect(restValue.restId);
       if (rsp.status === 200) setRestInfoList(rsp.data);
       
      };
      useEffect(() => {
        restaurant();
  
        }, []);
  
        useEffect(()=> {
          restInfo();
        },[restValue]);

        useEffect(() => {
       setCategory(headerSelect || null);
      }, [headerSelect]);
    
    return(
    <BizBlock>
    <Header>사업자 페이지</Header>
    <div className="pageTitle"> BUSINESS PAGE </div>
    <BizProfile restInfoList={restInfoList} setRestInfoList={setRestInfoList} restName ={restValue.restName}/>
    <MenuBlock>
    <BizMenuBar category={category} onSelect={onSelect}/>
    <RatingView/>
    </MenuBlock>
    {category!==null &&
    <BizSection category={category} restInfoList={restInfoList} setRestInfoList={setRestInfoList} restName ={restValue.restName}/>}
    <HomeFooter/>
    </BizBlock>
    );
}

export default BusinessPage;