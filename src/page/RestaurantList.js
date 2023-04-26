import React from "react";
import styled from "styled-components";
import HomeHeader from "../components/header/HomeHeader";
import DetailedCheck from "../components/search/DetailedCheck";
import HomeFooter from "../components/footer/HomeFooter";

const Body = styled.div`
    background-color: ivory;
    position: relative;

    @media (min-height: 1080px) {
        height: 100vh;
}
`;

const RestaurantList = () => {
    return(
        <Body>
            <HomeHeader/>
            <DetailedCheck/>
            <HomeFooter/>
        </Body>
    );
}

export default RestaurantList;