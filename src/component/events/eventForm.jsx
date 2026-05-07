import { useEffect, useState } from "react";
import Input from "../../utils/input";
import Button from "../../utils/button";
import { useEvent } from "../../hooks/useEvent";
import { Modal } from "../../utils/Modal";
import { logData } from "../../utils/console";

export const AddEvent = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [reschedule, setReschedule] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const {
    loading,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getAllActiveEvents,
    getAllEvents,
    getEvent,
    markeEvent,
    publishEvent,
  } = useEvent();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    rescheduledAt: "",
    location: "",
    image: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      date: "",
      rescheduledAt: "",
      location: "",
      image: "",
    });
    setSelectedEvent(null);
    setActiveModal(false);
  };

  logData("selectedEvent", selectedEvent);
  logData("reschedule", reschedule);

  const handleSubmit = async () => {
    try {
      if (reschedule === "Modifier") {
        await updateEvent(selectedEvent.id, form);
        // alert("Event modifié !");
      } else if (reschedule === "Reprogrammer") {
        logData("selectedEvent.id ", selectedEvent.id);
        logData(" form", form);
      } else if (reschedule === "Reporter") {
        logData("selectedEvent.id ", selectedEvent.id);
        logData(" form", form);
      } else {
        await addEvent(form);
        alert("Event ajouté !");
      }
      resetForm();
      getAllEvents();
      setReschedule(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePublish = async (eventId, isPublished) => {
    try {
      await publishEvent(eventId, isPublished);
      getAllEvents();
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
      rescheduledAt: event.rescheduledAt?.slice(0, 10),
      location: event.location,
      image: event.image,
    });
  };

  const handleDelete = async (id) => {
    if (confirm("Supprimer cet événement ?")) {
      await deleteEvent(id);
      getAllEvents();
    }
  };

  useEffect(() => {
    getAllEvents()
  }, []);

  const getTitle = () => {
    if (reschedule === "Reprogrammer") {
      return "Reprogrammer l'événement";
    } else if (reschedule === "Reporter") {
      return "Reporter l'événement";
    } else if (reschedule === "Modifier") {
      return "Modifier l'événement";
    } else {
      return "Ajouter un événement";
    }
  };

  const submitTitle = () => {
    if (reschedule === "Reprogrammer") {
      return "Reprogrammer";
    } else if (reschedule === "Reporter") {
      return "Reporter ";
    } else if (reschedule === "Modifier") {
      return "Modifier";
    } else {
      return "Ajouter ";
    }
  };

  // filtrage
  const safeEvents = Array.isArray(events) ? events : [];
  // filtrage simple
  const filteredEvents = safeEvents?.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === "ALL") return matchSearch;
    if (statusFilter === "ACTIVE") return matchSearch && e.isActive;
    if (statusFilter === "INACTIVE") return matchSearch && !e.isActive;

    return matchSearch;
  });

  // stats
  const total = events.length;
  const activeCount = safeEvents.filter((e) => e.isPublished).length;
  const inactiveCount = total - activeCount;

  if (loading) {
    return <div>Chargement en cours ...</div>;
  }
  return (
    <div className="p-6 grid  gap-6">
      {/* <div className="bg-indigo-500 w-full h-10"> */}
      {/* zone de filtre et stats + boutton ajouter */}
      <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* LEFT: STATS */}
        <div className="flex gap-4 text-sm">
          <div className="bg-gray-100 px-3 py-1 rounded-xl">
            Total: <span className="font-semibold">{total}</span>
          </div>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">
            Actifs: {activeCount}
          </div>
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-xl">
            Inactifs: {inactiveCount}
          </div>
        </div>

        {/* CENTER: FILTER */}
        <div className="flex gap-2 flex-1 md:max-w-md">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-2 text-sm"
          >
            <option value="ALL">Tous</option>
            <option value="ACTIVE">Actifs</option>
            <option value="INACTIVE">Inactifs</option>
          </select>
        </div>

        {/* RIGHT: ADD BUTTON */}
        <Button
          children="+ Ajouter"
          onClick={(e) => {
            e.stopPropagation();
            resetForm();
            setReschedule("Ajouter");
            setActiveModal(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
        />
      </div>
      {/* </div> */}
      {/* LISTE EVENTS */}
      {events.length > 0 && (
        <div className="space-y-4 grid md:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-md md:max-w-2xl  overflow-hidden hover:shadow-xl transition cursor-pointer"
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

                <div className="flex justify-between">
                  <div className="text-xs text-gray-400 ">
                    📍 {event.location} • 📅 {event.date?.slice(0, 10)}{" "}
                  </div>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!event.isPublished} // ✅ force true/false
                      onChange={(e) => {
                        e.stopPropagation();
                        handlePublish(event.id, e.target.checked);
                      }}
                      className="accent-indigo-600 cursor-pointer"
                    />
                    <span>{event.isPublished ? "Actif" : "Inactif"}</span>
                  </label>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 justify-between">
                  <Button
                    children="Modifier"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(event);
                      setReschedule("Modifier");
                      setActiveModal(true);
                    }}
                    className="w-20 bg-blue-500 text-white"
                  />
                  <Button
                    children="Reprogrammer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(event);
                      setReschedule("Reprogrammer");
                      setActiveModal(true);
                    }}
                    className="w-28 bg-blue-500 text-white"
                  />
                  <Button
                    children="Reporter"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(event);
                      setReschedule("Reporter");
                      setActiveModal(true);
                    }}
                    className="w-20 bg-blue-500 text-white"
                  />

                  <Button
                    children="Supprimer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(event.id);
                    }}
                    className="w-20 bg-red-500 text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeModal && (
        <div>
          <Modal
            isOpen={activeModal}
            onClose={() => setActiveModal(false)}
            showCloseButton={false}
          >
            {/* FORMULAIRE */}
            <div className="bg-white shadow-xl  rounded-2xl p-5 space-y-4">
              <h2 className="text-xl font-semibold">{getTitle()}</h2>

              <Input
                value={form.title}
                type="text"
                placeholder="Titre"
                onChange={(e) => handleChange("title", e.target.value)}
              />

              <Input
                value={form.description}
                type="text"
                placeholder="Description"
                onChange={(e) => handleChange("description", e.target.value)}
              />

              <Input
                value={form.date}
                type="date"
                onChange={(e) => handleChange("date", e.target.value)}
              />
              {["Reprogrammer", "Reporter"].includes(reschedule) && (
                <Input
                  value={form.rescheduledAt}
                  type="date"
                  onChange={(e) =>
                    handleChange("rescheduledAt", e.target.value)
                  }
                />
              )}

              <Input
                value={form.location}
                type="text"
                placeholder="Lieu"
                onChange={(e) => handleChange("location", e.target.value)}
              />

              <Input
                value={form.image}
                type="text"
                placeholder="URL image"
                onChange={(e) => handleChange("image", e.target.value)}
              />

              <div className="flex gap-2">
                <Button onClick={handleSubmit}>{submitTitle()}</Button>

                {reschedule && (
                  <Button onClick={resetForm} variant="secondary">
                    Annuler
                  </Button>
                )}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
