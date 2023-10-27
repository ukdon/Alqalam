import styled from "styled-components";
import Orb from "./Components/Orb/Orb";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layuots'
import Navigation from './Components/Navigation/Navigation'
import React, { useMemo, useState } from "react";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./context/globalContext";
import { useSelector } from "react-redux";

function App() {
   const isLoggedIn = useSelector(state => state.isLoggedIn);
   console.log(isLoggedIn);

  const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

const displayData = () => {
   switch(active){
     case 1:
      return <Dashboard />
     case 2:
      return <Dashboard />
     case 3:
      return <Income />
     case 4:
      return <Expenses />
     default: 
      return <Dashboard />

   }
}

  const orbMemo = useMemo (() => {
     return <Orb />
  },[])
  return (
    < AppStyled bg={bg} className="App">
      {orbMemo}
       <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </ AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(235, 245, 226, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;

// import styled from "styled-components";
// import Orb from "./Components/Orb/Orb";
// import bg from './img/bg.png'
// import { MainLayout } from './styles/Layuots'
// import Navigation from './Components/Navigation/Navigation'
// import React, { useMemo, useState } from "react";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import Income from "./Components/Income/Income";
// import Expenses from "./Components/Expenses/Expenses";
// import { useGlobalContext } from "./context/globalContext";
// import Header from "./Components/Auths/Header";
// import { Routes, Route } from "react-router-dom";
// import Login from "./Components/Auths/Login";
// import Signup from "./Components/Auths/Signup";
// import Welcome from "./Components/Auths/Welcome";
// import { useSelector } from "react-redux";

// function App() {
//   const isLoggedIn = useSelector(state => state.isLoggedIn);
//   console.log(isLoggedIn);

//   const [active, setActive] = useState(1)

//   const global = useGlobalContext()
//   console.log(global);

//   const displayData = () => {
//     switch (active) {
//       case 1:
//         return <Dashboard />
//       case 2:
//         return <Dashboard />
//       case 3:
//         return <Income />
//       case 4:
//         return <Expenses />
//       default:
//         return <Dashboard />
//     }
//   }

//   const orbMemo = useMemo(() => {
//     return <Orb />
//   }, [])

//   return (
//     <AppStyled bg={bg} className="App">
//       {orbMemo}
//       <header>
//         <Header />
//       </header>
//       <main>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           {isLoggedIn ? (
//             <Route path="/" element={<Welcome />} />
//           ) : (
//             <Route path="/" element={<Login />} />
//           )}
//         </Routes>
//       </main>
//       {isLoggedIn && (
//         <MainLayout>
//           <Navigation active={active} setActive={setActive} />
//           <main>
//             {displayData()}
//           </main>
//         </MainLayout>
//       )}
//     </AppStyled>
//   );
// }

// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${props => props.bg});
//   position: relative;
//   main{
//     flex: 1;
//     background: rgba(235, 245, 226, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     &::-webkit-scrollbar{
//       width: 0;
//     }
//   }
// `;

// export default App;
