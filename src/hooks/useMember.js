import { API_CONFIG } from "../config/api";
import axios from "axios";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";
import { useRedirect } from "./useNavigate";
import { EventsOnLocal } from "../helper/getUser";

export const useMember = () => {
  const [loading, setLoading] = useState(false);
  const { setItem, removeItem } = useLocalStorage();
  const redirect = useRedirect();
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  // const members = membersOnLocal();
  // const userId = user.id;


  const updatemember = async (memberId, updateData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.member.UPDATE}/${memberId}`;
      logData("fetchUrl", url);
      const response = await axios.put(url, { updateData });
      logData("response on update member", response);
      const members = response?.data?.members;
      logData("members on members", members);
      setItem("members", members);
      setmember(members);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllmembers = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBER.GET_ALL}`;
      logData("fetchUrl", url);
      const response = await axios.get(url);
      logData("response on add member", response);
      const members = response?.data?.members;
      logData("members on fetch", members);
      setItem("members", members);
      setmembers(members);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getPendingMembers = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBER.GET_PENDING}`;
      logData("fetchUrl", url);
      const response = await axios.get(url);
      logData("response on add member", response);
      const members = response?.data?.pendingMembers;
      logData("members on fetch", members);
      setItem("members", members);
      setMembers(members);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getmember = async (memberId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBER.GET_ONE}/${memberId}`;
      logData("fetchUrl", url);
      const response = await axios.get(url);
      logData("response on add member", response);
      const member = response?.data?.member;
      logData("member on fetch", member);
      setItem("member", member);
      setmember(member);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const deletemember = async (memberId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.member.DELETE_ONE}/${memberId}`;
      logData("fetchUrl", url);
      const response = await axios.delete(url);
      logData("response on delete member", response);
      const message = response?.data?.message;
      logData("message on fetch", message);
      // setItem("member", member)
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    member,
    members,
    updatemember,
    getAllmembers,
    getmember,
    deletemember,
    getPendingMembers,
  };
};
