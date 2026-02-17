import { Request, Response } from 'express';
import prisma from '../prisma';

// Get all athletes
export const getAthletes = async (req: Request, res: Response) => {
  try {
    const athletes = await prisma.athlete.findMany({
      include: { affiliate: true },
    });
    res.json(athletes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch athletes' });
  }
};

// Get athlete by ID
export const getAthleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const athlete = await prisma.athlete.findUnique({
      where: { id: Number(id) },
      include: { affiliate: true, scores: true },
    });
    if (!athlete) {
      return res.status(404).json({ error: 'Athlete not found' });
    }
    res.json(athlete);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch athlete' });
  }
};

// Create new athlete
export const createAthlete = async (req: Request, res: Response) => {
  const { name, gender, affiliateId } = req.body;
  try {
    const newAthlete = await prisma.athlete.create({
      data: {
        name,
        gender,
        affiliateId: affiliateId ? Number(affiliateId) : null,
      },
    });
    res.status(201).json(newAthlete);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create athlete' });
  }
};

// Update athlete
export const updateAthlete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, gender, affiliateId } = req.body;
  try {
    const updatedAthlete = await prisma.athlete.update({
      where: { id: Number(id) },
      data: {
        name,
        gender,
        affiliateId: affiliateId ? Number(affiliateId) : null,
      },
    });
    res.json(updatedAthlete);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update athlete' });
  }
};

// Delete athlete
export const deleteAthlete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.athlete.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Athlete deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete athlete' });
  }
};

