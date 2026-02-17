import { Request, Response } from 'express';
import prisma from '../prisma';

export const getScores = async (req: Request, res: Response) => {
  try {
    const scores = await prisma.score.findMany({
      include: {
        athlete: true,
        workout: true,
      },
    });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
};

export const getScoreById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const score = await prisma.score.findUnique({
      where: { id: Number(id) },
      include: {
        athlete: true,
        workout: true,
      },
    });
    if (!score) {
      return res.status(404).json({ error: 'Score not found' });
    }
    res.json(score);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch score' });
  }
};

export const createScore = async (req: Request, res: Response) => {
  const { athleteId, workoutId, result, scaled, date } = req.body;
  try {
    const newScore = await prisma.score.create({
      data: {
        athleteId: Number(athleteId),
        workoutId: Number(workoutId),
        result,
        scaled: scaled || false,
        date: date ? new Date(date) : undefined,
      },
    });
    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create score' });
  }
};

export const updateScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { athleteId, workoutId, result, scaled, date } = req.body;
  try {
    const updatedScore = await prisma.score.update({
      where: { id: Number(id) },
      data: {
        result,
        scaled,
        date: date ? new Date(date) : undefined,
      },
    });
    res.json(updatedScore);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update score' });
  }
};

export const deleteScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.score.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete score' });
  }
};
