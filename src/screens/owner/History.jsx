import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import TopNavbar from './TopNavbar';
import { Link } from 'react-router-dom';

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

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 60px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 1000px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f0f0f0;
    font-weight: bold;
  }
`;

const PaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);

  const fetchPaymentHistory = async () => {
    try {
      const paymentHistoryResponse = await fetch('/api/payment/history');
      const paymentHistoryData = await paymentHistoryResponse.json();

      setPaymentHistory(paymentHistoryData);
    } catch (error) {
      console.log('Error fetching payment history:', error);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  return (
    <Wrapper>
      <LeftSidebar>
        <SidebarNav>
          <NavItem>
            <Link to="/dashboard">Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link to="/owner/post">Job Post</Link>
          </NavItem>
          <NavItem>
            <Link to="/payments">Payments</Link>
          </NavItem>
          <NavItem>
            <Link to="/owner/paymentHistory">Payment History</Link>
          </NavItem>
        </SidebarNav>
      </LeftSidebar>
      <MainContent>
        <TopNavbar />
        <Container>
          <Title>Payment History</Title>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Job Title: </th>
                  <th>Reciever ID: </th>
                  <th>Amount: </th>
                  <th>Transaction ID: </th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.title}</td>
                    <td>{payment.contractorId}</td>
                    <td>{payment.cost}</td>
                    <td>{payment.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
          <Link to="/dashboard">Go back to Dashboard</Link>
        </Container>
        <Footer />
      </MainContent>
    </Wrapper>
  );
};

export default PaymentHistory;
