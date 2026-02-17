import { Request, Response } from 'express';
import prisma from '../prisma';

export const getAffiliates = async (req: Request, res: Response) => {
  try {
    const affiliates = await prisma.affiliate.findMany();
    res.json(affiliates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch affiliates' });
  }
};

export const getAffiliateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const affiliate = await prisma.affiliate.findUnique({
      where: { id: Number(id) },
      include: { athletes: true },
    });
    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }
    res.json(affiliate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch affiliate' });
  }
};

export const createAffiliate = async (req: Request, res: Response) => {
  const { name, city, founded } = req.body;
  try {
    const newAffiliate = await prisma.affiliate.create({
      data: { name, city, founded },
    });
    res.status(201).json(newAffiliate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create affiliate' });
  }
};

export const updateAffiliate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, city, founded } = req.body;
  try {
    const updatedAffiliate = await prisma.affiliate.update({
      where: { id: Number(id) },
      data: { name, city, founded },
    });
    res.json(updatedAffiliate);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update affiliate' });
  }
};

export const deleteAffiliate = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.affiliate.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Affiliate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete affiliate' });
  }
};
