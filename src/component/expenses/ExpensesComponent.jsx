
import { useEffect, useState } from "react";
import Input from "../../utils/input";
import Button from "../../utils/button";
import { useEvent } from "../../hooks/useEvent";

export const ExpensePage = () => {
  const { events, addEvent, updateEvent, deleteEvent, getAllActiveEvents } = useEvent();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      location: "",
      image: "",
    });
    setSelectedEvent(null);
  };

  const handleSubmit = async () => {
    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent.id, form);
        // alert("Event modifié !");
      } else {
        await addEvent(form);
        alert("Event ajouté !");
      }
      resetForm();
      getAllActiveEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date?.slice(0, 10),
      location: event.location,
      image: event.image,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer cet événement ?")) {
      await deleteEvent(id);
      getAllActiveEvents();
    }
  };

  useEffect(() => {
    getAllActiveEvents();
  }, []);

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      
      {/* FORMULAIRE */}
      <div className="bg-white shadow-xl rounded-2xl p-5 space-y-4">
        <h2 className="text-xl font-semibold">
          {selectedEvent ? "Modifier l'événement" : "Ajouter un événement"}
        </h2>

        <Input value={form.title} type="text" placeholder="Titre"
          onChange={(e) => handleChange("title", e.target.value)} />

        <Input value={form.description} type="text" placeholder="Description"
          onChange={(e) => handleChange("description", e.target.value)} />

        <Input value={form.date} type="date"
          onChange={(e) => handleChange("date", e.target.value)} />

        <Input value={form.location} type="text" placeholder="Lieu"
          onChange={(e) => handleChange("location", e.target.value)} />

        <Input value={form.image} type="text" placeholder="URL image"
          onChange={(e) => handleChange("image", e.target.value)} />

        <div className="flex gap-2">
          <Button onClick={handleSubmit}>
            {selectedEvent ? "Modifier" : "Ajouter"}
          </Button>

          {selectedEvent && (
            <Button onClick={resetForm} variant="secondary">
              Annuler
            </Button>
          )}
        </div>
      </div>

      {/* LISTE EVENTS */}
      {events.length > 0 && (
        <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer"
            onClick={() => handleEdit(event)}
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.description}</p>

              <div className="text-xs text-gray-400">
                📍 {event.location} • 📅 {event.date?.slice(0, 10)}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(event);
                  }}
                  className="text-blue-500 text-sm"
                >
                  Modifier
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(event.id);
                  }}
                  className="text-red-500 text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
    )}
    </div>
  );
};
