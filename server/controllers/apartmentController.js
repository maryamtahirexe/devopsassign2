import Apartment from "../models/Apartment.js";

export const createApartment = async (req, res) => {
  try {
    const { name, location } = req.body; 
    const newApartment = new Apartment({ name, location });
    await newApartment.save();

    res.status(201).json({ message: "Apartment created successfully", apartment: newApartment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApartmentById = async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateApartment = async (req, res) => {
  try {
    const { name, location } = req.body;
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      { name, location },  
      { new: true }
    );

    if (!updatedApartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.status(200).json({ message: "Apartment updated successfully", apartment: updatedApartment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteApartment = async (req, res) => {
  try {
    const apartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }

    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
