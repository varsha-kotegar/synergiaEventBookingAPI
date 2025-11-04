const express = require("express");
const app = express();

app.use(express.json());

// -------------------------------------------
// Temporary in-memory data storage
// -------------------------------------------
let events = [];
let bookings = [];

// -------------------------------------------
// EVENT ROUTES
// -------------------------------------------

// 1️⃣ GET - Get all events
app.get("/events", (req, res) => {
  res.json(events);
});

// 2️⃣ POST - Create a new event
app.post("/events/add", (req, res) => {
  const { id, name, date, location, description } = req.body;

  const newEvent = { id, name, date, location, description };
  events.push(newEvent);

  res.status(201).json({ message: "Event created successfully", event: newEvent });
});

// 3️⃣ GET - Get event by ID
app.get("/event/:id", (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});

// 4️⃣ PUT - Update event details
app.put("/event/:id", (req, res) => {
  const event = events.find(e => e.id == req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  const { name, date, location, description } = req.body;
  event.name = name || event.name;
  event.date = date || event.date;
  event.location = location || event.location;
  event.description = description || event.description;

  res.json({ message: "Event updated successfully", event });
});

// 5️⃣ DELETE - Cancel an event
app.delete("/event/:id", (req, res) => {
  const index = events.findIndex(e => e.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }
  events.splice(index, 1);
  res.json({ message: "Event deleted successfully" });
});

// -------------------------------------------
// BOOKING ROUTES
// -------------------------------------------

// 1️⃣ GET - Get all bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// 2️⃣ POST - Create a new booking
app.post("/api/bookings", (req, res) => {
  const { id, participantName, email, eventId } = req.body;

  const booking = { id, participantName, email, eventId };
  bookings.push(booking);

  res.status(201).json({ message: "Booking created successfully", booking });
});

// 3️⃣ GET - Get booking by ID
app.get("/api/bookings/:id", (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  res.json(booking);
});

// 4️⃣ PUT - Update participant details
app.put("/api/bookings/:id", (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  const { participantName, email } = req.body;
  booking.participantName = participantName || booking.participantName;
  booking.email = email || booking.email;

  res.json({ message: "Booking updated successfully", booking });
});

// 5️⃣ DELETE - Cancel a booking
app.delete("/api/bookings/:id", (req, res) => {
  const index = bookings.findIndex(b => b.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Booking not found" });
  }
  bookings.splice(index, 1);
  res.json({ message: "Booking cancelled successfully" });
});

// -------------------------------------------
// Start server
// -------------------------------------------
app.listen(3000, () => {
  console.log("✅ Synergia Event Booking API running on port 3000");
});
