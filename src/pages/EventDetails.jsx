import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventsAds } from "../data/payment";
import { useEvent } from "../hooks/useEvent";
import BackButton from "../utils/backButton";
import Button from "../utils/button";
import { useAppNavigation } from "../hooks/useAppNavigation";

export const EventDetail = () => {
  const { event, getEvent } = useEvent();
  const { goTo } = useAppNavigation();
  const { id } = useParams();

  useEffect(() => {
        getEvent(id)
  }, [id]);

  if (!event) return <p>Événement introuvable...</p>;

  // Paiement
  const handleSubmit = () => {
    goTo("/paiement", {
      state: {
        type:"event",
        eventId: event.id,
        title: event.title,
        amount: event.amount,
      },
    });
  };

  return (
    <div className="p-4 md:p-9 bg-amber-50 rounded">
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
      <div className="py-5 grid "> 
        <div className="flex justify-between w-full ">
           <p>Nombre de participant:</p> <strong> {event.participantCount}</strong>
        </div>
        <div className="flex justify-between w-full ">
          <p>Total de participation: </p> <strong>{event.collectedAmount}</strong>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="mt-3">{event.amount || 0} FCFA</p>
        <Button
            children="Payer ma participation "
            className="w-64 bg-blue-600 text-white mt-2 py-1"
            onClick={handleSubmit}
          />
      </div>
    </div>
  );
};