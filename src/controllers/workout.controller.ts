import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all workouts
export const getWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await prisma.workout.findMany();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
};

// Get workout by ID
export const getWorkoutById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const workout = await prisma.workout.findUnique({
      where: { id: Number(id) },
      include: { scores: true },
    });
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
};

// Create new workout
export const createWorkout = async (req: Request, res: Response) => {
  const { name, description, type, rxDetails } = req.body;
  try {
    const newWorkout = await prisma.workout.create({
      data: { name, description, type, rxDetails },
    });
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
};

// Update workout
export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, type, rxDetails } = req.body;
  try {
    const updatedWorkout = await prisma.workout.update({
      where: { id: Number(id) },
      data: { name, description, type, rxDetails },
    });
    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workout' });
  }
};

// Delete workout
export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.workout.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
};

