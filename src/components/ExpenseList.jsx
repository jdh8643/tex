import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ExpenseList.css';
                //부모(홈)한테 받아옴(필터)
const ExpenseList = ({ expenses }) => {
  const navigate = useNavigate();
//디테일
  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div      //결과 값
          key={expense.id}
          className="expense-item"
          onClick={() => navigate(`/detail/${expense.id}`)}
        >
          <div className="expense-date">{expense.date}</div>
          <div className="expense-main">
            <div className="expense-title">{expense.item}</div>
            <div className="expense-content">{expense.description}</div>
          </div>
          <div className="expense-amount"> 
            {expense.amount.toLocaleString()}원
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;