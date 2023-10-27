import React, { useState } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import {mobile} from '../../responsive'

function Navigation({active, setActive}) {

  return (
    <NavStyled>
        <div className="user-con">
            <img src={avatar} alt=""/>
            <div className="text">
                <h2>Okasha</h2>
                <p>Kudi na</p>
            </div>
        </div>
        <ul className="menu-items">
             {menuItems.map((item) => {
                 return <li
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={active === item.id ? 'active': ''}
                 >
                     {item.icon}
                     <span>{item.title}</span>
                 </li>
             })}
        </ul>
        <div className="bottom-nav">
            <li>
                {signout} Fita Duka
            </li>
        </div>
    </NavStyled>
  )
}

const NavStyled = styled.div`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: rgba(235, 245, 226, 0.78);
  border: 3px solid #FFFFFF;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  ${mobile({display: "none"})}
  .user-con{
      height: 10%;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      img{
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #fcf6f9;
          object-fit: cover;
          border: 2px solid #FFFFFF;
          padding: .2rem;
          box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
      }
      h2{
          color: rgba(34, 34, 96, 1);
          font-size: 1.25rem;
      }
      p{
        color: rgba(34, 34, 96, .6);
      }

  }
  .menu-items{
     flex: 1;
     display: flex;
     flex-direction: column;
     li{
         display: grid;
         grid-template-columns: 40px auto;
         margin: .6rem 0;
         font-weight: 300;
         cursor: pointer;
         transition: all .4s ease-in-out;
         color: rgba(34, 34, 96, .6);
         padding-left: 1rem;
         position: relative;
     }
     i{
         color: rgba(34, 34, 96, 0.6);
         font-size: 1.25rem;
         transition: all .4s ease-in-out;
     }
  }
  .active{
      color: rgba(34, 34, 96, 1) !important;
      i{
        color: rgba(34, 34, 96, 1) !important;
      }
      &::before{
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: #222260;
          border-radius: 0 10px 10px 0;
      }
  }
`;

export default Navigation
