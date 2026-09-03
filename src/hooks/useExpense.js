import { API_CONFIG } from "../config/api";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";
import { useRedirect } from "./useNavigate";
import { EventsOnLocal } from "../helper/getUser";
import { userOnLocal } from "../helper/getUser";
import api from "../config/axios";


export const useExpense = () => {
  const [loading, setLoading] = useState(false);
  const { setItem, removeItem } = useLocalStorage();
  const redirect = useRedirect();
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState(null);
  const [error, setError] = useState(null);
  // const expenses = ExpensesOnLocal();
  const user = userOnLocal();
  const userId = user.id;

  const addExpense = async (addData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.ADD}/${userId}`;
      logData("fetchUrl", url);
      const response = await api.post(url, { addData });
      logData("response on add expense", response);
      const expense = response?.data?.expense;
      logData("expense on add", expense);
      setItem("expense", expense);
      return expense;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (expenseId, updateData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.UPDATE}/${expenseId}`;
      logData("fetchUrl", url);
      const response = await api.put(url, { updateData });
      logData("response on update expense", response);
      const expenses = response?.data?.expenses;
      logData("expenses on expenses", expenses);
      setItem("expenses", expenses);
      setExpense(expenses);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllExpenses = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.GET_ALL}`;
      logData("fetchUrl", url);
      const response = await api.get(url);
      logData("response on add expense", response);
      const expenses = response?.data?.expenses;
      logData("expenses on fetch", expenses);
      setItem("expenses", expenses);
      setExpenses(expenses);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getExpense = async (expenseId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.GET_ONE}/${expenseId}`;
      logData("fetchUrl", url);
      const response = await api.get(url);
      logData("response on add expense", response);
      const expense = response?.data?.expense;
      logData("expense on fetch", expense);
      setItem("expense", expense);
      setExpense(expense);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (expenseId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.DELETE_ONE}/${expenseId}`;
      logData("fetchUrl", url);
      const response = await api.delete(url);
      logData("response on delete expense", response);
      const message = response?.data?.message;
      logData("message on fetch", message);
      // setItem("expense", expense)
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const approveExpense = async (expenseId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.APPROVE_ONE}/${expenseId}`;
      const response = await api.post(url);
      logData("response on update expense", response);
      const message = response;
      logData("message", message);
      await getExpense(expenseId);
      // const expenses = response?.data?.expenses;
      // setItem("expenses", expenses);
      // setExpense(expenses);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const rejectExpense = async (expenseId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.REJECT_ONE}/${expenseId}`;
      const response = await api.post(url);
      const expenses = response?.data?.expenses;
      await getExpense(expenseId);
      // setItem("expenses", expenses);
      // setExpense(expenses);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    expense,
    expenses,
    getExpense,
    addExpense,
    updateExpense,
    getAllExpenses,
    deleteExpense,
    approveExpense,
    rejectExpense,
    getExpenseById: getExpense,
  };
};
