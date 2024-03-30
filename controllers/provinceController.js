const Province = require('../models/Province');
const District = require('../models/District');

exports.createProvince = async (req, res) => {
    try {
      const newProvince = new Province(req.body);
      const createdProvince = await newProvince.save();
      res.status(201).json(createdProvince);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.getAllProvinces = async (req, res) => {
    try {
      const provinces = await Province.find();
      res.json(provinces);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getProvinceById = async (req, res) => {
    try {
      const province = await Province.findById(req.params.id);
      if (!province) {
        res.status(404).json({ message: 'Province not found' });
      } else {
        res.json(province);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateProvince = async (req, res) => {
    try {
      const updatedProvince = await Province.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProvince) {
        res.status(404).json({ message: 'Province not found' });
      } else {
        res.json(updatedProvince);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.deleteProvince = async (req, res) => {
    try {
      const deletedProvince = await Province.findByIdAndDelete(req.params.id);
      if (!deletedProvince) {
        res.status(404).json({ message: 'Province not found' });
      } else {
        res.json({ message: 'Province deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  