import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";
import OwnerProfileImage from "../../assets/img/nof.jpg";


export default function OwnerPage() {
  const [currentTime, setCurrentTime] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const timeString = date.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchOwnerInfo = async () => {
      try {
        const response = await fetch("/api/owner/current");
        if (!response.ok) {
          throw new Error("Error fetching owner's information");
        }
        const data = await response.json();
        const ownerName = data.username;
        setOwnerName(ownerName);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching owner's information:", error);
        setError("Error fetching owner's information. Please try again later.");
      }
    };

    fetchOwnerInfo();
  }, []);

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch("/api/contractors");
        if (!response.ok) {
          throw new Error("Error fetching contractor information");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching contractor information:", error);
        setError("Error fetching contractor information. Please try again later.");
      }
    };

    fetchContractors();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Perform the search on the client-side
    const filteredResults = searchResults.filter(
      (contractor) =>
        contractor.username.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const openContractorDetails = (contractor) => {
    setSelectedContractor(contractor);
  };

  const closeContractorDetails = () => {
    setSelectedContractor(null);
  };

  const viewAllContractors = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const renderContractorDetails = () => {
    if (selectedContractor) {
      return (
        <ContractorModal>
          <ModalContent>
            <ModalCloseButton onClick={closeContractorDetails}>
              X
            </ModalCloseButton>
            <ContractorDetails>
              <h3>{selectedContractor.username}</h3>
              <p>Email: {selectedContractor.email}</p>
              <p>Phone Number: {selectedContractor.phone_number}</p>
              <p>Experience: {selectedContractor.experience}</p>
              {/* Render other contractor details */}
            </ContractorDetails>
          </ModalContent>
        </ContractorModal>
      );
    }
    return null;
  };

  return (
    <Wrapper>
      <LeftSidebar>
        <SidebarNav>
          <NavItem>
            <Link to="/dashboard">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/owner/post">Job-Post</Link>  
          </NavItem>
          <NavItem>
            <Link to="/owner/posted">Posted-Jobs</Link>  
          </NavItem>
          <NavItem>
            <Link to="/owner/paymentHistory">Payment History</Link>
          </NavItem>
          <NavItem>
            {/* /owner/posted */}
            <Link to="/owner/message">Messages</Link>
          </NavItem>
        </SidebarNav>
      </LeftSidebar>

      <ContentWrapper>
        <TopNavbar />
        <OwnerSection>
          <OwnerProfile>
          <OwnerAvatar src={OwnerProfileImage} alt="Owner Profile" />
            <OwnerInfo>
              <OwnerName>Welcome Owner- {ownerName}</OwnerName>
              <CurrentTime>Current Time: {currentTime}</CurrentTime>
            </OwnerInfo>
          </OwnerProfile>
        </OwnerSection>

        <SearchSection>
          <SearchTitle>Find Contractors</SearchTitle>
          <SearchBar
            type="text"
            placeholder="Search contractors..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchResults.length > 0 && (
            <SearchResults>
              {searchResults.map((contractor) => (
                <ContractorCard
                  key={contractor.id}
                  contractor={contractor}
                  onViewDetails={() => openContractorDetails(contractor)}
                />
              ))}
            </SearchResults>
          )}
          {searchResults.length === 0 && (
            <NoResultsMessage>No contractors found.</NoResultsMessage>
          )}
        </SearchSection>

        {renderContractorDetails()}

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

const OwnerSection = styled.section`
  display: absolute;
  justify-content: center;
  margin-left: 10px;
  margin-right: 20px;
  margin-top: 90px;
`;

const OwnerProfile = styled.div`
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

const OwnerInfo = styled.div`
  margin-left: 20px;
`;

const OwnerName = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CurrentTime = styled.p`
  font-size: 14px;
  color: gray;
  margin-top: 10px;
`;

const SearchSection = styled.section`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const SearchBar = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 20px;
  border: none;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;
const OwnerAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const ViewAllButton = styled.button`
  background-color: lightblue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const SearchResults = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const NoResultsMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const ContractorCard = ({ contractor, onViewDetails }) => {
  return (
    <CardWrapper>
      <OwnerAvatar src={OwnerProfileImage} alt="Owner Profile" />
      <ContractorName>{contractor.username}</ContractorName>
      <ContractorInfo>
        <p>Email: {contractor.email}</p>
        <p>Phone Number: {contractor.phone_number}</p>
        <p>Experience: {contractor.experience}</p>
        {/* Display other contractor information */}
      </ContractorInfo>
      <ButtonWrapper>
        <ContractorButton onClick={onViewDetails}>View</ContractorButton>
      </ButtonWrapper>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContractorName = styled.h3`
  margin-bottom: 10px;
`;

const ContractorInfo = styled.div`
  /* Styles for contractor information */
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ContractorButton = styled.button`
  background-color: lightblue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ContractorModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  position: relative;
  width: 400px;
  max-width: 90%;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ContractorDetails = styled.div`
  /* Styles for contractor details */
`;

const FooterWrapper = styled.footer`
  margin-top: auto;
`;
