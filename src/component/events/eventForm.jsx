
import { useState } from "react";
import Input from "../../utils/input";
import Button from "../../utils/button";
// import Input from "../utils/input";
// import Button from "../utils/button";

export const AddEvent = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Event ajouté !");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 space-y-3">
      <Input name="title" placeholder="Titre" onChange={handleChange} />
      <Input name="description" placeholder="Description" onChange={handleChange} />
      <Input name="date" type="date" onChange={handleChange} />
      <Input name="location" placeholder="Lieu" onChange={handleChange} />
      <Input name="image" placeholder="URL image" onChange={handleChange} />

      <Button onClick={handleSubmit}>
        Ajouter l'événement
      </Button>
    </div>
  );
};