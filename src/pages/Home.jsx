import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import MonthNavigation from "../components/MonthNavigation";
import CreateExpense from "../components/CreateExpense";
import ExpenseList from "../components/ExpenseList";

const Home = () => {
  const [expenses, setExpenses] = useState([]); //지출 데이터
  const [selectedMonth, setSelectedMonth] = useState(1); //선택된 월 저장, 기본값은 1월

  useEffect(() => {
    //슈파베이스에서 지출 데이터 가져오기
    const fetchExpenses = async () => {
      const { data } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false });
      setExpenses(data || []);
    };

    fetchExpenses();
  }, []);

  const handleExpenseCreated = (newExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  //선택된 selectedMonth와 비교하여 해당 월의 지출만 필터링
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() + 1 === selectedMonth;
  }); //new Date현재 날짜와 시간
  //getMonth()는 0부터 시작하는 월(0: 1월, 11: 12월)을 반환.
  //사람이 이해하기 쉬운 월을 위해 +1을 추가.

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <MonthNavigation
        selectedMonth={selectedMonth}
        onMonthSelect={setSelectedMonth}
      />
      <CreateExpense onExpenseCreated={handleExpenseCreated} />
      <ExpenseList expenses={filteredExpenses} />
    </div>
  );
};

export default Home;
