const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({

  colorName: { type: String, required: true },
 
  colorUrl: { type: String, required: true },
   cat: { type: String }

  // initImage: { type: String, required: true },

  // cheked:{type: Boolean, default : false}
});

module.exports = mongoose.model('Color', colorSchema);



  // <li class="todo">
  //   <form action="/complete" method="POST">
  //     <label>
  //       {{#if completed}}
  //       <input type="checkbox" checked name="completed">
  //       <span class="completed">{{title}}</span>
  //       {{else}}
  //       <input type="checkbox" name="completed">
  //       <span>{{title}}</span>
  //       {{/if}}

  //       <input type="hidden" value="{{_id}}" name="id">

  //       <button class="btn btn-small" type="submit">Save</button>
  //     </label>
  //   </form>
  // </li>

//   <form action="/create" method="POST">
//   <h2>Create todo</h2>

//   <div class="input-field">
//     <input type="text" name="title">
//     <label>Todo title</label>
//   </div>

//   <button type="submit" class="btn">Create</button>
// </form>

// router.post('/create', async (req, res) => {
//   const todo = new Todo({
//     title: req.body.title
//   })

//   await todo.save()
//   res.redirect('/')
// })

// router.post('/complete', async (req, res) => {
//   const todo = await Todo.findById(req.body.id)

//   todo.completed = !!req.body.completed
//   await todo.save()

//   res.redirect('/')
// })
            //useState ARRAY
// function ListOfThings() {
//   const [items, setItems] = useState([]);
//   const [itemName, setItemName] = useState("");

//   const addItem = event => {
//     event.preventDefault();
//     setItems([
//       ...items,
//       {
//         id: items.length,
//         name: itemName
//       }
//     ]);
//     setItemName("");
//   };

//   return (
//     <>
//       <form onSubmit={addItem}>
//         <label>
//           <input
//             name="item"
//             type="text"
//             value={itemName}
//             onChange={e => setItemName(e.target.value)}
//           />
//         </label>
//       </form>
//       <ul>
//         {items.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </>
//   );
// }