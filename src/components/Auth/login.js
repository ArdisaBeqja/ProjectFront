import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Styles/login.css';

function UpdatedLogin() {
    const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    try {
      const response = await fetch("http://localhost:8080/api/login", 
      {
        method: "POST",
        body: JSON.stringify({
          username: formData.get("text"),
          password: formData.get("password")
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (response.ok) {
        const data = await response.json(); // Parse the JSON string into an object
     
        if(data.role==="manager"){
          console.log("manager33");
          navigate(`/manager/${data.id}`);

        }
        else if(data.role==="student"){
          console.log("student33");
          navigate(`/students/${data.id}/ticketsOfStd`);

        }
        else if(data.role==="mainServ"){
          console.log("student33");
          navigate(`/invoices`);

        }
        console.log("ardisa");
        console.log(data.role);
      } 
       else {
        setError("Error logging in. Please try again.");
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
    }
  }
  

    return (
      <>
      <div className="LoginBack">

     
      <form onSubmit={handleLogin}>
        <div className="header123">
          <div className="content123">
            Welcome <br />
            Back
          </div>
          <div className="emailLabel123">UserName</div>
          
          <input type="text" id="text" name="text" className="emailInput123" placeholder="Enter username:D" />

         
          <div className="passwordLabel123">Password</div>
          <input type="password" id="password" name="password" className="passwordInput123" placeholder="••••••••" />


        
          <div className="rememberForgot123">
            <div className="rememberMe123">
              <div className="rememberMeCheckbox123" />
              <div className="rememberMeLabel123">Remember me</div>
            </div>
            <div className="forgotPassword123">Forgot Password</div>
          </div>
          <button type="submit" className="signIn123">Login</button>

         
        </div>
        {error && <div className="error">{error}</div>}

        </form>
        </div>
        <style jsx>{`
          .header123 {
            display: flex;
            margin-top: 200px;
            flex-grow: 1;
            flex-direction: column;
            padding: 0;
            width: 57vh;
            height: 26vh;
            margin-left: 141vh;
          }
          .content123 {
            color: #1e1e1e;
            letter-spacing: -3.12px;
            font: 700 52px/52px Inter, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
          .emailLabel123 {
            color: #1e1e1e;
            text-align: center;
            margin-top: 44px;
            font: 500 16px/119% Inter, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
          .emailInput123 {
            align-items: start;
            border-radius: 8px;
            border-color: rgba(91, 91, 91, 1);
            border-style: solid;
            border-width: 1px;
            margin-top: 6px;
            color: #5b5b5b;
            text-align: center;
            justify-content: center;
            padding: 14px 20px;
            font: 500 14px/136% Inter, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
          .passwordLabel123 {
            color: #1e1e1e;
            text-align: center;
            margin-top: 21px;
            font: 500 16px/119% Inter, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
          .passwordInput123 {
            border-radius: 8px;
            border-color: rgba(91, 91, 91, 1);
            border-style: solid;
            border-width: 1px;
            display: flex;
            margin-top: 6px;
            gap: 20px;
            font-size: 14px;
            color: #5b5b5b;
            font-weight: 500;
            text-align: center;
            line-height: 136%;
            justify-content: space-between;
            padding: 12px 20px;
          }
          .passwordInputContent123 {
            font-family: Inter, sans-serif;
            margin: auto 0;
          }
          .passwordImg123 {
            aspect-ratio: 1;
            object-fit: auto;
            object-position: center;
            width: 24px;
          }
          .rememberForgot123 {
            display: flex;
            margin-top: 12px;
            width: 100%;
            gap: 20px;
            font-size: 12px;
            color: #000;
            font-weight: 500;
            text-align: center;
            line-height: 167%;
            justify-content: space-between;
          }
          .rememberMe123 {
            display: flex;
            gap: 6px;
          }
          .rememberMeCheckbox123 {
            border-radius: 4px;
            border-color: rgba(0, 0, 0, 1);
            border-style: solid;
            border-width: 1px;
            width: 14px;
            height: 14px;
            margin: auto 0;
          }
          .rememberMeLabel123 {
            font-family: Inter, sans-serif;
          }
          .forgotPassword123 {
            font-family: Inter, sans-serif;
            letter-spacing: -0.12px;
          }
          .signIn123 {
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            border-color: rgba(91, 91, 91, 0.5);
            border-style: solid;
            border-width: 1px;
            background-color: #1e1e1e;
            margin-top: 60px;
            color: #fcfcfc;
            text-align: center;
            padding: 14px 20px;
            font: 600 14px/136% Inter, -apple-system, Roboto, Helvetica,
              sans-serif;
          }
        `}</style>
      </>
    );
  }
  

export default UpdatedLogin;
