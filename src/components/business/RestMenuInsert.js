import React, { useState ,useContext, useEffect } from "react";
import MenuBox from "./MenuBox";
import styled from "styled-components";
import Modal from "../../utils/Modal";
import{RestaurantContext} from "../../context/RestaurantContext";
import AxiosApi from "../../api/AxiosApi";

const RestMenuBlock = styled.div`

    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .menuTitle {
        font-size: 40px;
        font-weight: bold;
        text-align: center;
        margin: 20px;
    }
    .menuBtn{
               
                width: 150px;
                height: 50px;
                margin: 10px;
                display: inline-block;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                background-color: #FF7F50;
                color: #fff;
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;  
                &:hover{
                    background-color: #FFA07A;
                 }
                &:active{
                    background-color: #FFA07A;
                }
            }
        .addBtn{
            position: absolute;
            right: 0;
            top :0;
        }

`;
const RestMenuInsert = () => {

    //contextAPI
    const {restValue} = useContext(RestaurantContext);

    //상태관리 
     const [menuList, setMenuList] = useState([]);
    //레스토랑 메뉴 조회
    const restMenu = async() => {
        const rsp = await AxiosApi.restMenu(restValue.restId);
        if (rsp.status === 200) setMenuList(rsp.data);
        console.log(rsp.data);
    };

    //첫 렌더링
    useEffect(()=> {
        restMenu();
    },[]);

     //팝업 처리
     const [modalOpen, setModalOpen] = useState(null);

    const menuAdd = () => {
        setModalOpen("add");
    }
    const closeModal = () => {
        setModalOpen(false);
        restMenu();
    };

    const [newData,setNewData] =useState({
        menuDesc : "",
        menuImgFileName : "",
        menuName:"",
        menuPrice:"",
        restId:restValue.restId,
        menuId:""
    });

    const menuAddClick= async() => {
        console.log(newData);
        const {menuDesc,menuImgFileName,menuName,menuPrice,restId} =newData;
        const rsp = await AxiosApi.restMenuAdd(restId,menuName,menuPrice,menuDesc,menuImgFileName);
        if(rsp.data){
           setModalOpen("addOk");
           console.log("추가 성공");
        } 
        
    }
    
    const deleteClick = async (menuId) => {
        console.log("삭제");
        const rsp = await AxiosApi.restMenuDel(menuId);
        if(rsp.data){
           console.log("삭제 성공");
           setModalOpen("del");
        } 
     }
     const updateClick = async () => {
        console.log("업데이트");
        const rsp = await AxiosApi.restMenuUpdate(menuList);
        if(rsp.data){
            console.log("업데이트 성공");
            setModalOpen("update");
        }
     }
   

       
        return(
    
            <RestMenuBlock>
             <div className='titleName'> 메뉴판 </div>
            <button className="menuBtn addBtn" onClick={menuAdd}>메뉴 추가</button>
            {menuList.map((menu) => (
                <div key={menu.menuId}>
                    <MenuBox 
                    menuInfo={menu}
                    menuList={menuList}
                    setMenuList={setMenuList}
                    deleteClick={deleteClick}
                    />
                </div>
                ))}
             <button  className="menuBtn updateBtn" onClick={()=>updateClick()}>수정 완료</button>
             <Modal open={modalOpen==="add"} close={closeModal} header="메뉴 추가" type='add' confirm={menuAddClick}><MenuBox menuInfo={newData} setMenuList={setNewData} type="add"/></Modal>
             <Modal open={modalOpen==="del"} close={closeModal} header="메뉴 삭제" type='ok'>메뉴가 삭제되었습니다.</Modal>
             <Modal open={modalOpen==="update"} close={closeModal} header="메뉴 수정" type='ok' >수정이 완료되었습니다.</Modal>
             <Modal open={modalOpen==="addOk"} close={closeModal} header="메뉴 추가완료" type='ok'>메뉴추가가 완료되었습니다.</Modal>
            </RestMenuBlock>
      
    );
}

export default RestMenuInsert;