import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import TopNavbar from './TopNavbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

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

  td {
    a {
      color: #007bff;
      text-decoration: none;
    }

    .payment-button {
      padding: 5px 10px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }

    .payment-successful {
      color: green;
      font-weight: bold;
    }
  }
`;

const CardWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const JobCard = styled.tr`
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;

    a {
      color: #007bff;
      text-decoration: none;
    }

    .payment-button {
      padding: 5px 10px;
      border: none;
      background-color: #007bff;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }

    .payment-successful {
      color: green;
      font-weight: bold;
    }
  }
`;

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

const Messages = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPostedJobs = async () => {
    try {
      const ownerResponse = await fetch('/api/owner/current');
      const ownerData = await ownerResponse.json();

      const ownerId = ownerData.id;

      const postedJobsResponse = await fetch(`/api/jobs/owner/${ownerId}`);
      const postedJobsData = await postedJobsResponse.json();

      setPostedJobs(postedJobsData);
    } catch (error) {
      console.log('Error fetching posted jobs:', error);
    }
  };

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  const handlePaymentClick = (jobId) => {
    const selectedJob = postedJobs.find((job) => job.id === jobId);
    navigateToCheckout(selectedJob);
  };

  const navigateToCheckout = (selectedJob) => {
    navigate('/owner/payment', { state: { selectedJob } });
  };

  const isPaymentSuccessful = (job) => {
    return job.Pay === 'successful';
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
            <Link to="/owner/paymentHistory">Payment History</Link>
          </NavItem>
          <NavItem>
            <Link to="/owner/message">Messages</Link>
          </NavItem>
        </SidebarNav>
      </LeftSidebar>
      <MainContent>
        <TopNavbar />
        <Container>
          <Title>Posted Jobs</Title>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Job Description</th>
                  <th>Capacity</th>
                  <th>Time Period</th>
                  <th>Cost</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Contractor ID</th>
                  <th>Pay</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {postedJobs.map((job) => (
                  <JobCard key={job.id}>
                    <td>{job.jobTitle}</td>
                    <td>{job.jobDescription}</td>
                    <td>{job.capacity}</td>
                    <td>{job.timePeriod}</td>
                    <td>{job.cost}</td>
                    <td>{job.location}</td>
                    <td>{job.status}</td>
                    <td>{job.contractorId}</td>
                    <td>{job.Pay}</td>
                    <td>
                    {job.status === 'accepted' && job.Pay !== 'successful' ? (
  <button
    className="payment-button"
    onClick={() => handlePaymentClick(job.id)}
  >
    Payment
  </button>
) : job.status === 'available' ? (
  <span className="payment-message">Not yet accepted</span>
) : (
  <span className="payment-message">
    {job.Pay === 'successful' ? 'Payment is successful' : ''}
  </span>
)}


                    </td>
                  </JobCard>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
          {selectedJob && (
            <CardWrapper>
              <div>
                <h2>Job Details</h2>
                <p>Job ID: {selectedJob.id}</p>
                <p>Contractor ID: {selectedJob.contractorId}</p>
                <p>Job Title: {selectedJob.jobTitle}</p>
                <p>Job Description: {selectedJob.jobDescription}</p>
                <p>Job Cost: {selectedJob.cost}</p>
              </div>
              <CheckoutForm selectedJob={selectedJob} />
            </CardWrapper>
          )}
        </Container>
        <Footer />
      </MainContent>
    </Wrapper>
  );
};

export default Messages;
