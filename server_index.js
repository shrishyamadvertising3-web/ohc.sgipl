const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory stores (replace with DB)
let patients = [];
let medicines = [
  { id: uuidv4(), name: 'पैरासिटामोल', quantity: 100 },
  { id: uuidv4(), name: 'एंटासिड', quantity: 50 },
  { id: uuidv4(), name: 'बैंडेज', quantity: 30 }
];

// Patients endpoints
app.get('/api/patients', (req, res) => {
  res.json(patients);
});

app.post('/api/patients', (req, res) => {
  const p = req.body;
  p.id = uuidv4();
  p.createdAt = new Date().toISOString();
  // TODO: server-side validation & sanitization
  patients.push(p);

  // Update medicines stock (simple logic)
  if (Array.isArray(p.medications)) {
    p.medications.forEach(med => {
      const existing = medicines.find(x => x.name.toLowerCase() === (med.name || '').toLowerCase());
      const qty = parseInt(med.quantity) || 0;
      if (existing) {
        existing.quantity = Math.max(0, existing.quantity - qty);
      } else {
        medicines.push({ id: uuidv4(), name: med.name, quantity: Math.max(0, 100 - qty) });
      }
    });
  }
  res.status(201).json(p);
});

// Medicines endpoints
app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

app.post('/api/medicines', (req, res) => {
  const { name, quantity } = req.body;
  if (!name || typeof quantity === 'undefined') {
    return res.status(400).json({ error: 'name and quantity required' });
  }
  const m = { id: uuidv4(), name, quantity: parseInt(quantity, 10) };
  medicines.push(m);
  res.status(201).json(m);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`OHC API listening on ${PORT}`));