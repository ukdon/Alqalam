import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layuots';
import { naira } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import { mobile } from '../../responsive'
import { tablet } from '../../responsive'

function Dashboard(){
  const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses} = useGlobalContext()
    
  useEffect(() => {
    getIncomes()
    getExpenses()

  }, [getIncomes, getExpenses])

  return (
    <DashboardStyled>
       <InnerLayout>
           <h1>Duka Ma'amaloli</h1>
           <div className="stats-con">
             <div className="chart-con">
                <Chart />
                <div className="amount-con">
                    <div className="income">
                        <h2>Duka Kudin Da Kasamu</h2>
                        <p>
                          {naira} {totalIncome()}
                        </p>
                    </div>
                    <div className="expense">
                      <h2>Duka Kudin Da Ka Kashe</h2>
                      <p>
                        {naira} {totalExpenses()}
                      </p>
                    </div>
                    <div className="balance">
                      <h2>Kudin Da Ya Rage</h2>
                      <p>
                        {naira} {totalBalance()}
                      </p>
                    </div>
                </div>
             </div>
             <div className="history-con">
                 <History />
                 <h2 className="salary-title">Karanchi <span>Abinda Kasamu</span>Mafi Yawa</h2>
                 <div className="salary-item">
                     <p>
                       {Math.min(...incomes.map(item => item.amount))}
                     </p>
                     <p>
                       {Math.max(...incomes.map(item => item.amount))}
                     </p>
                 </div>
                 <h2 className="salary-title">Karanchi <span>Abinda Ka Kashe</span>Mafi Yawa</h2>
                 <div className="salary-item">
                     <p>
                       {Math.min(...expenses.map(item => item.amount))}
                     </p>
                     <p>
                       {Math.max(...expenses.map(item => item.amount))}
                     </p>
                 </div>
               </div>
           </div>
       </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
    .stats-con{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 2rem;
      ${tablet({ gridTemplateColumns: '1fr 1fr', gap: '1rem' })}
      ${mobile({ display: 'flex', flexDirection: 'column', gap: '2rem' })}
      .chart-con{
        grid-column: 1 / 4;
        height: 400px;
        ${mobile({ height: '200px' })}
        .amount-con{
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           gap: 2rem;
           margin-top: 2rem;
           .income, .expense{
               grid-column: span 2;
            }
           .expense{
               color: red;
            }
            .income, .expense, .balance{
             background: #ebf9e7;
             border: 2px solid #FFFFFF;
             box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
             padding: 0.8rem;
             border-radius: 20px;
             p{
              font-size: 3.5rem;
              font-weight: 700;
             }
           }

           .balance{
             grid-column: 2 / 4;
             display: flex;
             flex-direction: column;
             justify-content: center;
             align-items: center;
             p{
               color: var(--color-green);
               opacity: 0.6;
               font-size: 4rem;
             }
           }
           
        }
      }

      .history-con{
        grid-column: 4 / -1;
        ${tablet({ gridColumn: '1/ -1' })}
        h2{
          margin: 1rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .salary-title{
          font-size: 1.2rem;
          span{
            font-size: 1.8rem;
          }
        }
        .salary-item{
             background: #ebf9e7;
             border: 2px solid #FFFFFF;
             box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
             padding: 1rem;
             border-radius: 20px;
             display: flex;
             align-items: center;
             justify-content: space-between;
             p{
               font-weight: 600;
               font-size: 1.6rem;
             }
        }
      }
      
    }

`;

export default Dashboard


