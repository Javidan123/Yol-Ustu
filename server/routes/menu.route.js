import express from "express";
import {
    getMenu,
    getDishById,
    createDish,
    updateDish,
    deleteDish
} from '../controllers/menu.controller.js';

const router = express.Router();

router.get('/', getMenu);
router.get('/:id', getDishById);
router.post('/', createDish);
router.put('/:id', updateDish);
router.delete('/:id', deleteDish);

export default router;