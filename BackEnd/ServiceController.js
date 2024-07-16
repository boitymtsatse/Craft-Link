
const userModel = require('./ServiceModel');
const addService = async (req, res) => {
    const { img, name, service, skills, exp, description, rate } = req.body;
    //find in db
    try {
      let serviceName = await userModel.findOne({ name });
  
      if (serviceName) return res.status(400).json("This name is taken.");
  
      if (!img || !name || !service || !skills || !exp || !description || !rate)
        return res.status(400).json("All fields are required");
  
      
  
      newService = new userModel({ name, email, password });
  
      
  
      await newService.save();
  
  
      res.status(200).json({ message: 'Service added successfully!' });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  
  module.exports = { addService };