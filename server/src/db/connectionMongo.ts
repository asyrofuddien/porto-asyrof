import mongoose from 'mongoose';
import express from 'express';

const conn = async (): Promise<void> => {
  try {
    const dbUrl: string = process.env.MONGO_URI || 'mongodb://localhost:27017/defaultDB';
    await mongoose.connect(dbUrl, {});
    console.log('Connected to MongoDB on', dbUrl);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export { conn };
