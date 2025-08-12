const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// Parse form bodies
app.use(express.urlencoded({ extended: true }));

// Support PUT & DELETE via form method override (use _method)
app.use(methodOverride('_method'));

// In-memory "database" (array) and id generator
let todos = [];
let nextId = 1;

// Helper: allowed priorities
const PRIORITIES = ['High', 'Medium', 'Low'];

// Home route: list + filter
app.get('/', (req, res) => {
  const selectedPriority = req.query.priority || 'All';
  const error = req.query.error || null;
  let filtered = todos;
  if (selectedPriority && selectedPriority !== 'All') {
    filtered = todos.filter(t => t.priority === selectedPriority);
  }
  res.render('index', { todos: filtered, selectedPriority, error });
});

// Add todo
app.post('/todos', (req, res) => {
  const text = req.body.text ? req.body.text.trim() : '';
  const priority = req.body.priority || 'Medium';
  if (!text) {
    return res.redirect('/?error=Please+enter+a+todo');
  }
  todos.push({ id: nextId++, text, priority });
  res.redirect('/');
});

// Edit page
app.get('/todos/:id/edit', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  const error = req.query.error || null;
  if (!todo) return res.status(404).send('Todo not found');
  res.render('edit', { todo, error });
});

// Update todo
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const text = req.body.text ? req.body.text.trim() : '';
  const priority = req.body.priority || 'Medium';
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).send('Todo not found');
  if (!text) {
    return res.redirect(`/todos/${id}/edit?error=Please+enter+a+todo`);
  }
  todos[idx].text = text;
  todos[idx].priority = priority;
  res.redirect('/');
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.redirect('/');
});

// Start server using PORT from environment (Render provides this)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});