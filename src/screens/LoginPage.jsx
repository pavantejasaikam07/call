import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FullButton from "../components/Buttons/FullButton";
import HeaderImage from "../assets/img/add2.png";
import TopNavbar from "../components/Nav/TopNavbar";
import Footer from "../components/Sections/Footer";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Make API call to the backend for authentication
      const response = await axios.post("/login", { email, password });
      const role = response.data.role;

      if (role === "owner") {
        navigate("/owner");
      } else if (role === "contractor") {
        navigate("/contractor");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        console.log("Unauthorized access");
      }
    } catch (error) {
      console.log("Authentication failed", error);
    }
  };

  return (
    <Wrapper>
      <TopNavbar />
      <ContentWrapper>
        <LoginContainer>
          <LoginForm>
            <LoginHeading>Login</LoginHeading>
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <InputLabel>Email:</InputLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <InputLabel>Password:</InputLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <BtnWrapper>
                <FullButton type="submit" title="Login" />
              </BtnWrapper>
            </Form>
          </LoginForm>
        </LoginContainer>
        <ImageContainer>
          <ImageWrapper>
            <Img src={HeaderImage} alt="office" />
          </ImageWrapper>
        </ImageContainer>
      </ContentWrapper>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const LoginContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 400px;
`;

const LoginForm = styled.div`
  text-align: left;
`;

const LoginHeading = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #dddddd;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ImageContainer = styled.div`
  margin-left: 50px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
