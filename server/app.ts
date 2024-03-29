import express, { Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import socketio from 'socket.io';
import path from 'path';
import http from 'http';

const app = express();
const port = process.env.PORT || 5000;
const prod = process.env.NODE_ENV === 'production';

app.use(json());
app.use(urlencoded({ extended: true }));

if (prod) {
  const filesPath = '../client/build';

  app.use(express.static(path.join(__dirname, filesPath)));

  app.get('/service-worker.js', (_, res) => {
    res.sendFile(path.join(__dirname, filesPath, 'service-worker.js'));
  });

  app.get('*', function (_, res) {
    res.sendFile(path.join(__dirname, filesPath, 'index.html'));
  });
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log('🚀 Server running on port', port);
});
