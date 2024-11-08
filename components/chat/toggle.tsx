/* eslint-disable tailwindcss/no-custom-classname */
import type React from "react"
import styled from "styled-components"

import "./styles.css"

interface ToggleProps {
  isOpen: boolean
  onClick: () => void
}

const Toggle: React.FC<ToggleProps> = ({ isOpen, onClick }) => {
  return (
    <StyledWrapper>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button id="btn-message" className="button-message">
        <div className="content-avatar">
          <div className="status-user" />
          <div className="avatar">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              className="user-img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z" />
            </svg>
          </div>
        </div>
        <div className="notice-content">
          <div className="label-message">
            Chat<span className="number-message">3</span>
          </div>
          <div className="user-id">Community</div>
        </div>
      </button>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  #btn-message {
    --text-color: rgb(255, 255, 255);
    --bg-color-sup: #5e5e5e;
    --bg-color: #2b2b2b;
    --bg-hover-color: #161616;
    --online-status: #00da00;
    --font-size: 16px;
    --btn-transition: all 0.2s ease-out;
  }

  .button-message {
    display: flex;
    justify-content: center;
    align-items: center;
    font: 400 var(--font-size) Helvetica Neue, sans-serif;
    box-shadow: 0 0 2.17382px rgba(0, 0, 0, 0.049),
      0 1.75px 6.01034px rgba(0, 0, 0, 0.07),
      0 3.63px 14.4706px rgba(0, 0, 0, 0.091), 0 22px 48px rgba(0, 0, 0, 0.14);
    background-color: var(--bg-color);
    border-radius: 68px;
    cursor: pointer;
    padding: 6px 10px 6px 6px;
    width: fit-content;
    height: 40px;
    border: 0;
    overflow: hidden;
    position: relative;
    transition: var(--btn-transition);
  }

  .button-message:hover {
    height: 56px;
    padding: 8px 20px 8px 8px;
    background-color: var(--bg-hover-color);
    transition: var(--btn-transition);
  }

  .button-message:active {
    transform: scale(0.99);
  }

  .content-avatar {
    width: 30px;
    height: 30px;
    margin: 0;
    transition: var(--btn-transition);
    position: relative;
  }

  .button-message:hover .content-avatar {
    width: 40px;
    height: 40px;
  }

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--bg-color-sup);
  }

  .user-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .status-user {
    position: absolute;
    width: 6px;
    height: 6px;
    right: 1px;
    bottom: 1px;
    border-radius: 50%;
    outline: solid 2px var(--bg-color);
    background-color: var(--online-status);
    transition: var(--btn-transition);
    animation: active-status 2s ease-in-out infinite;
  }

  .button-message:hover .status-user {
    width: 10px;
    height: 10px;
    right: 1px;
    bottom: 1px;
    outline: solid 3px var(--bg-hover-color);
  }

  .notice-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 8px;
    text-align: initial;
    color: var(--text-color);
  }

  .username {
    letter-spacing: -6px;
    height: 0;
    opacity: 0;
    transform: translateY(-20px);
    transition: var(--btn-transition);
  }

  .user-id {
    font-size: 12px;
    letter-spacing: -6px;
    height: 0;
    opacity: 0;
    transform: translateY(10px);
    transition: var(--btn-transition);
  }

  .lable-message {
    display: flex;
    align-items: center;
    opacity: 1;
    transform: scaleY(1);
    transition: var(--btn-transition);
  }

  .button-message:hover .username {
    height: auto;
    letter-spacing: normal;
    opacity: 1;
    transform: translateY(0);
    transition: var(--btn-transition);
  }

  .button-message:hover .user-id {
    height: auto;
    letter-spacing: normal;
    opacity: 1;
    transform: translateY(0);
    transition: var(--btn-transition);
  }

  .button-message:hover .lable-message {
    height: 0;
    transform: scaleY(0);
    transition: var(--btn-transition);
  }

  .lable-message,
  .username {
    font-weight: 600;
  }

  .number-message {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 8px;
    font-size: 12px;
    width: 16px;
    height: 16px;
    background-color: var(--bg-color-sup);
    border-radius: 20px;
  }

  /*==============================================*/
  @keyframes active-status {
    0% {
      background-color: var(--online-status);
    }

    33.33% {
      background-color: #93e200;
    }

    66.33% {
      background-color: #93e200;
    }

    100% {
      background-color: var(--online-status);
    }
  }
`

export default Toggle