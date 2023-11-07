import express from 'express';

const postsRouter = express.Router();
postsRouter.use(express.json());


const posts: Post[] = [ {
  id: 1,
  title: 'Post 1',
  content: 'Contenuto del Post 1',
  ownerId: 1,
},
{
  id: 2,
  title: 'Post 2',
  content: 'Contenuto del Post 2',
  ownerId: 1,
},
{
  id: 3,
  title: 'Post 3',
  content: 'Contenuto del Post 3',
  ownerId: 1,
},]


export interface Post {
  id: number;
  title: string;
  content: string;
  ownerId: number;
}

let lastId = posts.length; 
// elenco  post by all

postsRouter.get('/userPosts/', (req, res) => {

  res.send(posts);
});
// elenco  post by id

postsRouter.get('/userPosts/:userId', (req, res) => {

  const userId = Number(req.params.userId);

  const userPosts = posts.filter((post) => post.ownerId === userId);

  res.send(userPosts);
});


postsRouter.post('/', (req, res) => {
  const newPost = req.body;

  if (  !newPost.title || !newPost.content || !newPost.ownerId) {
      return res.status(400).send('Dati del post incompleti o non validi');
  }


  newPost.id = lastId+1;

  posts.push(newPost);
  res.status(201).send(newPost); // Restituisci il post appena creato
});



postsRouter.put('/userPosts/:postId', (req, res) => {
  const postId = Number(req.params.postId);
  const updatedPost = req.body;

  const postToUpdate = posts.find((post) => post.id === postId);
  if (!postToUpdate) {
      return res.status(404).send('Post non trovato');
  }
  if (updatedPost.title || updatedPost.content) {
      postToUpdate.title = updatedPost.title;
      postToUpdate.content = updatedPost.content;
//lol postToUpdate.ownerId = updatedPost.ownerId;

      res.send(postToUpdate);

  }
  

});


export default postsRouter;
