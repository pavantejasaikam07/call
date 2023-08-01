import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import TopNavbar from "./TopNavbar";
import styled from "styled-components";
import Footer from "./Footer";
import { Link } from "react-router-dom";



const stripePromise = loadStripe('pk_test_51NNWAySCTPDkRA5GSf2feejob1kIXbiZYYxnnDG4HEi1pA95oC7FTMHb4rTxuZuq9nDBpLITaMDxk805L945JGWR00UO2SSZbd');

const App = () => {
  return (
    <Wrapper>
      <TopNavbar />
      
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    <FooterSection>
        <Footer />
      </FooterSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const FooterSection = styled.div`
  background-color: ;
  padding: 20px;
  margin-top: auto;
`;
const LeftSidebar = styled.div`
  background-color: navy;
  margin-top: 70px;
  width: 290px;
  padding: 20px;
  margin-left: 0px;
  height: 500px;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 10px;
  margin: 0;
`;

const NavItem = styled.li`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    transition: color 0.3s;

    &:hover {
      color: lightblue;
    }
  }
`;
export default App;
