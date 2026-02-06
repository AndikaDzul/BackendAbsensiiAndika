import express from 'express';
const app = express();

// ... rute api kamu ...

// JANGAN gunakan app.listen() untuk Vercel, cukup export
export default app;