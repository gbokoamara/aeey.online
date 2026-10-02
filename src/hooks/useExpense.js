import { API_CONFIG } from "../config/api";
import { useLocalStorage } from "./useLocalStorage";
import {  useState } from "react";
import { userOnLocal } from "../helper/getUser";
import api from "../config/axios";
import { formatError } from "../helper/errorHelper";
import { toast } from "sonner";
import { toastError, toastInfo } from "../helper/toasterHelper";


export const useExpense = () => {
  const [loading, setLoading] = useState(false);
  const [loadingApproved, setLoadingApproved] = useState(false);
  const { setItem } = useLocalStorage();
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState(null);
  const [vote, setVote] = useState(null);
  const [stats, setStats] = useState(null);
  const [approvedStats, setApprovedStats] = useState(null);
  const [approvedExpenses, setApprovedExpenses] = useState([]);
  const user = userOnLocal();
  const userId = user.id;

  const addExpense = async (addData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.ADD}/${userId}`;
      const response = await api.post(url, { addData });
      const expense = response?.data?.expense;
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
      const response = await api.put(url, { updateData });
      const expenses = response?.data?.expenses;
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
      const response = await api.get(url);
      
      const expenses = response?.data?.expenses;
      const stats = response?.data?.stats;
      setItem("expenses", expenses);
      setStats(stats)
      setExpenses(expenses);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getApprovedExpense = async () => {
    setLoadingApproved(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.GET_APPROVED}`;
      const response = await api.get(url);
      const expenses = response?.data?.expenses;
      const expenseStats = response?.data?.expenseStats;
      setApprovedStats(expenseStats)
      setApprovedExpenses(expenses);
    } catch (error) {
      console.error("login error", error);
      const errorMessage = error?.response?.data?.message;
      toastError(errorMessage)
    } finally {
      setLoadingApproved(false);
    }
  };

  const getExpense = async (expenseId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.GET_ONE}/${expenseId}`;
      const response = await api.get(url);
      const expense = response?.data?.expense;
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
      const response = await api.delete(url);
      const message = response?.data?.message;
      toastInfo(message)
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
      const vote = response?.data?.vote;
      const message = response?.data?.message;
      const result = response?.data?.result
      setVote(vote)
      toast.success(message);
      return result;
    } catch (error) {
      console.error("login error", error);
      const defaultMessage="Impossible d'approuver cette dépense"
      const errorResponse = formatError(error, defaultMessage)
      // toast.error(errorResponse.message);
      setVote(errorResponse.vote)
      const message = response?.data?.message;
      toast.success(message);
    } finally {
      setLoading(false);
    }
  };

  const rejectExpense = async (expenseId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EXPENSE.REJECT_ONE}/${expenseId}`;
      const response = await api.post(url);
      const vote = response?.data?.vote;
      const message = response?.data?.message;
      const result = response?.data?.result;
      setVote(vote)
      toast.success(message);
      return result ;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    vote,
    stats,
    loading,
    expense,
    expenses,
    loadingApproved,
    approvedExpenses,
    processing:loading,
    approvedStats,
    getExpense,
    addExpense,
    updateExpense,
    getAllExpenses,
    deleteExpense,
    approveExpense,
    rejectExpense,
    getExpenseById: getExpense,
    getApprovedExpense,
  };
};
