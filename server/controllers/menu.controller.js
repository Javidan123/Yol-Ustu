// import Dish from "../models/Dish.js";
// import dishValidation from "../validations/dishValidation.js";

// export const getMenu = async (req, res) => {
//     try {
//         const dishs = await Dish.find({});

//         if (dishs.length == 0) return res.status(404).json({ success: false, message: "Menu is empty" })

//         res.status(200).json({data: dishs})
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Internal server error" })
//         console.log(err.message)
//     }
// }

// export const getDishById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const dish = await Dish.findById({ _id: id });
        
//         if (!dish) {
//             return res.status(404).json({ success: false, message: "Dish not found" })
//         }

//         res.status(200).json({ success: true, data: dish })
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Internal server error" })
//         console.log(err.message)
//     }
// }

// export const createDish = async (req, res) => {
//     try {
//         const parsed = dishValidation.parse(req.body);

//         const newDish = new Dish(parsed);

//         await newDish.save();
//         res.status(201).json({ success: true, message: "Dish was creat", data: newDish });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Internal server error" })
//         console.log(err.message)
//     }
// }

// export const updateDish = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const parsed = dishValidation.parse(req.body);
        
//         const dish = await Dish.findByIdAndUpdate({ _id: id }, parsed, { returnDocument: "after", runValidators: true });
        
//         if (!dish) {
//             return res.status(404).json({ success: false, message: "Dish not found" })
//         }

//         res.status(200).json({ success: true, message: "Dish was updated", data: dish })
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Internal server error" })
//         console.log(err.message)
//     }
// }

// export const deleteDish = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const dish = await Dish.findByIdAndDelete({ _id: id });

//         if (!dish) {
//             return res.status(404).json({ success: false, message: "Dish not found" })
//         }

//         res.status(200).json({ success: true, message: "Dish was deleted", data: dish })
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Internal server error" })
//         console.log(err.message)
//     }
// }



import dishService from "../services/dish.service.js";

export const getMenu = async (req, res) => {
    try {
        const dishes = await dishService.getMenu();
        res.status(200).json({ success: true, data: dishes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getDishById = async (req, res) => {
    try {
        const { id } = req.params;
        const dish = await dishService.getDishById(id);
        res.status(200).json({ success: true, data: dish });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const createDish = async (req, res) => {
    try {
        const newDish = await dishService.createDish(req.body);
        res.status(201).json({ success: true, message: "Dish was created", data: newDish });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateDish = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDish = await dishService.updateDish(id, req.body);
        res.status(200).json({ success: true, message: "Dish was updated", data: updatedDish });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteDish = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDish = await dishService.deleteDish(id);
        res.status(200).json({ success: true, message: "Dish was deleted", data: deletedDish });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};