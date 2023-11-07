import express from 'express';
import usersRouter from './user.router';
import postsRouter from './posts.router';

const app = express();

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
