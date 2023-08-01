import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Components
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

// Assets
import ContractorImage from "../../assets/img/nof.jpg";

export default function ContractorPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [contractorDetails, setContractorDetails] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    // Fetch contractor details
    const fetchContractorDetails = async () => {
      try {
        const response = await fetch("/api/contractor/current"); // Replace with the appropriate API endpoint
        const data = await response.json();
        setContractorDetails(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContractorDetails();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Wrapper>
      <TopNavbar />
      <LeftSidebar>
        <SidebarNav>
          <NavItem>
            <Link to="/contractor">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/contractor/jobs">Jobs</Link>
          </NavItem>
          <NavItem>
            <Link to="/contractor/payment">Payment Info</Link>
          </NavItem>
          <NavItem>
            <Link to="/contractor/posted">Accepted-jobs</Link>
          </NavItem>
        </SidebarNav>
      </LeftSidebar>
      <ContentWrapper>
        <ContractorSection>
          <ContractorProfile>
            <ContractorImageWrapper>
              <ContractorImg src={ContractorImage} alt="Contractor" />
            </ContractorImageWrapper>
            <ContractorInfo>
              <ContractorName>
                Welcome Contractor - {contractorDetails.username}
              </ContractorName>
              <ContractorDetails>
                Role: {contractorDetails.role}
                <br />
                Phone Number: {contractorDetails.phone_number}
                <br />
                Experience: {contractorDetails.experience}
                <br />
                Reputation: {contractorDetails.reputation}
                <br />
                Bio: {contractorDetails.bio}
                <br />
                Field of Work: {contractorDetails.field_of_work}
              </ContractorDetails>
              <CurrentTime>{currentTime}</CurrentTime>
            </ContractorInfo>
          </ContractorProfile>
        </ContractorSection>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const LeftSidebar = styled.div`
  background-color: navy;
  margin-top: 40px;
  width: 300px;
  padding: 40px;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
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

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ContractorSection = styled.section`
  display: absolute;
  justify-content: center;
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 90px;
`;

const ContractorProfile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`;

const ContractorImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 10%;
`;

const ContractorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContractorInfo = styled.div`
  margin-left: 20px;
`;

const ContractorName = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 30px;
`;

const ContractorDetails = styled.p`
  font-size: 16px;
  line-height: 1.5rem;
  margin-left: 30px;
`;

const CurrentTime = styled.p`
  font-size: 14px;
  color: gray;
  margin-top: 10px;
  margin-left: 30px;
`;

const FooterWrapper = styled.footer`
  margin-top: auto;
  margin-left: -500px;
`;
