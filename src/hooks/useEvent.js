import { API_CONFIG } from "../config/api";
import axios from "axios";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";
import { useRedirect } from "./useNavigate";
import { EventsOnLocal } from "../helper/getUser";

export const useEvent = () => {
  const [loading, setLoading] = useState(false);
  const { setItem, removeItem } = useLocalStorage();
  const redirect = useRedirect();
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  // const events = EventsOnLocal();
  // const userId = user.id;

  const addEvent = async (addData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT.ADD}`;
      // logData("fetchUrl", url);
      const response = await axios.post(url, { addData });
      // logData("response on add event", response);
      const event = response?.data?.event;
      // logData("event on add", event);
      setItem("event", event);
      return event;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (eventId, updateData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT.UPDATE}/${eventId}`;
      // logData("fetchUrl", url);
      const response = await axios.put(url, { updateData });
      // logData("response on update event", response);
      const events = response?.data?.events;
      // logData("events on events", events);
      setItem("events", events);
      setEvent(events);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllEvents = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT.GET_ALL}`;
      // logData("fetchUrl", url);
      const response = await axios.get(url);
      // logData("response on add event", response);
      const events = response?.data?.events;
      // logData("events on fetch", events);
      setItem("events", events);
      setEvents(events);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllActiveEvents = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT.GET_ALL_ACTIVE}`;
      // logData("fetchUrl", url);
      const response = await axios.get(url);
      // logData("response on add event", response);
      const events = response?.data?.events;
      // logData("events on fetch", events);
      setItem("events", events);
      setEvents(events);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getEvent = async (eventId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT.GET_ONE}/${eventId}`;
      // logData("fetchUrl", url);
      const response = await axios.get(url);
      // logData("response on add event", response);
      const event = response?.data?.event;
      // logData("event on fetch", event);
      setItem("event", event);
      setEvent(event);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const markeEvent = async (eventId, isPublished) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT.MARKE_ONE}/${eventId}`;
      // logData("fetchUrl", url);
      const response = await axios.put(url, { isPublished });
      // logData("response on add event", response);
      const event = response?.data?.event;
      // logData("event on fetch", event);
      setItem("event", event);
      // return event
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const publishEvent = async (eventId, isPublished) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT.PUBLISH}/${eventId}`;
      // logData("fetchUrl", url);
      const response = await axios.put(url, { isPublished });
      // logData("response on add event", response);
      const event = response?.data?.event;
      // logData("event on fetch", event);
      setItem("event", event);
      // return event
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.EVENT.DELETE_ONE}/${eventId}`;
      // logData("fetchUrl", url);
      const response = await axios.delete(url);
      logData("response on delete event", response);
      const message = response?.data?.message;
      logData("message on fetch", message);
      // setItem("event", event)
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    event,
    events,
    addEvent,
    updateEvent,
    getAllEvents,
    getAllActiveEvents,
    getEvent,
    markeEvent,
    deleteEvent,
    publishEvent,
  };
};
