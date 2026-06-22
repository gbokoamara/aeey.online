import { API_CONFIG } from "../config/api";
import axios from "axios";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";
import { useRedirect } from "./useNavigate";
import { EventsOnLocal } from "../helper/getUser";

export const useExpense = () => {
  const [loading, setLoading] = useState(false);
  const { setItem, removeItem } = useLocalStorage();
  const redirect = useRedirect();
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState(null);
  // const expenses = ExpensesOnLocal();
  // const userId = user.id;

  const addExpense = async (addData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.ADD}`;
      logData("fetchUrl", url);
      const response = await axios.post(url, { addData });
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
      const response = await axios.put(url, { updateData });
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
      const response = await axios.get(url);
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
      const response = await axios.get(url);
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
      const response = await axios.delete(url);
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

  return {
    loading,
    expense,
    expenses,
    addExpense,
    updateExpense,
    getAllExpenses,
    getExpense,
    deleteExpense,
  };
};
