import express from "express";
import { 
    createOwner, 
    getAllOwners, 
    getOwnerById, 
    updateOwner, 
    deleteOwner, 
    getAllApartments, 
    getAllShops, 
    signInOwner,
  } from "../controllers/ownerController.js";
  
  const router = express.Router();
  
  router.post("/", createOwner);
  router.post("/signin", signInOwner);
  router.get("/", getAllOwners);
  router.get("/:id", getOwnerById);
  router.put("/:id", updateOwner);
  router.delete("/:id", deleteOwner);
  router.get("/:id/apartments", getAllApartments); 
  router.get("/:id/shops", getAllShops);  
  
 export default router;