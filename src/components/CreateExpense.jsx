import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import "./CreateExpense.css";

// 지출 내역을 생성하는 컴포넌트
// props로 새로운 지출이 생성됐을 때 실행할 함수를 받음
const CreateExpense = (props) => {
  // 폼에 입력되는 데이터를 관리하는 상태
  const [formData, setFormData] = useState({
    date: "",
    item: "",
    amount: "",
    description: "",
  });

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 입력값 확인
      if (!formData.date || !formData.item || !formData.amount || !formData.description) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      // 금액이 올바른 숫자인지 확인
      const amount = Number(formData.amount);
      if (isNaN(amount) || amount <= 0) {  //amount가 숫자이고 양수인지 확인
        alert("올바른 금액을 입력해주세요.");
        return;
      }

      // 데이터베이스에 저장
      const { data, error } = await supabase
        .from("expenses") //Supabase를 사용해 expenses 테이블에 데이터 삽입
        .insert({
          date: formData.date,
          item: formData.item,
          amount: amount,
          description: formData.description,
        })
        .select()
        .single();
//select().single()은 새로 삽입된 단일 레코드를 반환.

      if (error) {
        console.error("저장 중 오류 발생:", error);
        throw error;
      }

      // 성공적으로 저장되면 부모 컴포넌트에 알림
      props.onExpenseCreated(data);
      
      // 입력 폼 초기화
      setFormData({
        date: "",
        item: "",
        amount: "",
        description: "",
      });

      // 성공 메시지 표시
      alert("저장되었습니다!");

    } catch (error) {
      alert("지출 내역 저장 중 오류가 발생했습니다.");
    }
  };

  // 입력 필드 값이 변경될 때 실행되는 함수(수정)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="날짜"
      />
      <input
        type="text"
        name="item"
        value={formData.item}
        onChange={handleChange}
        placeholder="항목"
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="금액"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="설명"
      />
      <button type="submit">저장</button>
    </form>
  );
};

export default CreateExpense;
