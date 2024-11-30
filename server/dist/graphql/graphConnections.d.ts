import express from 'express';
declare const connGraphQl: (app: express.Application) => Promise<void>;
export { connGraphQl };
