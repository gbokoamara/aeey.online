import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventsAds } from "../data/payment";
import { useEvent } from "../hooks/useEvent";
import BackButton from "../utils/backButton";

export const EventDetail = () => {
  const { event, getEvent } = useEvent()
  const { id } = useParams();

  // const [event, setEvent] = useState(() => {
  //   // fallback local (important)
  //   return events.find((e) => String(e.id) === String(id)) || null;
  // });

  useEffect(() => {
        getEvent(id)
  }, [id]);

  if (!event) return <p>Événement introuvable...</p>;

  return (
    <div className="p-4 bg-amber-50 ">
      <BackButton className="top-10" />
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-60 object-cover rounded"
      />

      <h1 className="text-xl font-bold mt-3">{event.title}</h1>

      <p className="text-gray-600 mt-2">
        {new Date(event.date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {event.location && (
        <p className="text-sm text-gray-500">
          📍 {event.location}
        </p>
      )}

      <p className="mt-3">{event.description}</p>
    </div>
  );
};