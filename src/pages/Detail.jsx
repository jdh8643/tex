import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    date: '',
    item: '',
    amount: '',
    description: ''
  });

  useEffect(() => {
    fetchExpense();
  }, [id]);

  const fetchExpense = async () => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setExpense(data);
      setEditForm({
        date: data.date,
        item: data.item,
        amount: data.amount,
        description: data.description
      });
    } catch (error) {
      console.error('Error fetching expense:', error);
      alert('지출 내역을 불러오는데 실패했습니다.');
      navigate('/');
    }
  };

  const handleEdit = () => {
    setIsEditing(true); //수정 활성화 
  };

  const handleCancel = () => {
    setIsEditing(false); //수정취소 되돌려
    setEditForm({
      date: expense.date,
      item: expense.item,
      amount: expense.amount,
      description: expense.description
    });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('expenses')     //수정 저장
        .update({
          date: editForm.date,
          item: editForm.item,
          amount: Number(editForm.amount),
          description: editForm.description
        })
        .eq('id', id);

      if (error) throw error;

      setIsEditing(false);
      fetchExpense();   //다 실행하고 처음으로
      alert('수정되었습니다.');
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const { error } = await supabase
          .from('expenses')
          .delete()     
          .eq('id', id);

        if (error) throw error;

        navigate('/');
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!expense) return null;

  return (
    <div className="detail-container">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="date"
            name="date"
            value={editForm.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="item"
            value={editForm.item}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            value={editForm.amount}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            value={editForm.description}
            onChange={handleChange}
            required
          />
          <div className="button-group">
            <button onClick={handleSave}>저장</button>
            <button onClick={handleCancel}>취소</button>
          </div>
        </div>
      ) : (
        <div className="expense-detail">
          <div className="detail-row">
            <label>날짜:</label>
            <span>{expense.date}</span>
          </div>
          <div className="detail-row">
            <label>항목:</label>
            <span>{expense.item}</span>
          </div>
          <div className="detail-row">
            <label>금액:</label>
            <span>{expense.amount.toLocaleString()}원</span>
          </div>
          <div className="detail-row">
            <label>내용:</label>
            <span>{expense.description}</span>
          </div>
          <div className="button-group">
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
            <button onClick={() => navigate('/')}>목록으로</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;