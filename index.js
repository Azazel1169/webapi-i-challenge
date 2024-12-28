const express = require("express");

const server = express();
server.use(express.json()); // IMPORTANT this teaches express to parse req.body

server.get('/hobbits', (req, res) => {
    console.log(req.query)
    // query string parameters get added to req.query
    const sortField = req.query.sortby || 'id';
    const hobbits = [
      {
        id: 1,
        name: 'Samwise Gamgee',
      },
      {
        id: 3,
        name: 'Bilbo Baggins',
      },

      {
        id: 2,
        name: 'Frodo Baggins',
      },
    ];
  
    // apply the sorting
    const response = hobbits.sort(
      (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
    );
  
    res.status(200).json(response);
  });

  let hobbits = [
    {
      id: 1,
      name: 'Bilbo Baggins',
      age: 111,
    },
    {
      id: 2,
      name: 'Frodo Baggins',
      age: 33,
    },
  ];
  let nextId = 3;
  
  // and modify the post endpoint like so:
  server.post('/hobbits', (req, res) => {
    console.log(req.body)
    const hobbit = req.body;
    hobbit.id = nextId++;
  
    hobbits.push(hobbit);
  
    res.status(201).json(hobbits);
  });

server.get("/hobbits/:id", (req, res) => {
  // GET EXISTING HOBBIT by id
  // the desired id comes in the URL, and is found in 'req.params.id'
  res.status(200).json(hobbits.find((hob) => hob.id == req.params.id));
});

// this request handler executes when making a POST request to /hobbits
server.post("/hobbits", (req, res) => {
  res.status(201).json({ url: "/hobbits", operation: "POST" });
});

server.put('/hobbits/:id', (req, res) => {
    const hobbit = hobbits.find(h => h.id == req.params.id);
  
    if (!hobbit) {
      res.status(404).json({ message: 'Hobbit does not exist' });
    } else {
      // modify the existing hobbit
      Object.assign(hobbit, req.body);
  
      res.status(200).json(hobbit);
    }
  });
server.delete("/hobbits/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params);
  // or we could destructure it like so: const { id } = req.params;
  res.status(200).json({
    url: `/hobbits/${id}`,
    operation: `DELETE for hobbit with id ${id}`,
  });
});

server.listen(8000, () => console.log("API running on port 8000"));
