const { Hotel } = require("../models");

exports.getAllHotel = async (req, res) => {
  try {
    const hotels = await Hotel.findAll(); // Lấy tất cả các bản ghi từ bảng hotels
    res.status(200).json({
      status: "success",
      results: hotels.length,
      data: {
        hotels,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while retrieving hotels.",
    });
  }
};

exports.createHotel = async (req, res) => {
  try {
    const { name, image, price, description } = req.body;
    console.log(req.body);
    const newHotel = await Hotel.create({ name, image, price, description });
    res.status(201).json({ status: "success", data: { hotel: newHotel } });
  } catch (err) {
    console.error("Error creating hotel:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, image, price, description } = req.body;
    
    console.log(id);

    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res
        .status(404)
        .json({ status: "error", message: "Không tìm thấy khách sạn" });
    }

    hotel.name = name;
    hotel.image = image;
    hotel.price = price;
    hotel.description = description;

    await hotel.save();

    res.status(200).json({ status: "success", data: { hotel } });
  } catch (err) {
    console.error("Lỗi khi cập nhật khách sạn:", err);
    res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
  }
};

exports.deleteHotel = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Kiểm tra khách sạn tồn tại
      const hotel = await Hotel.findByPk(id);
      if (!hotel) {
        return res.status(404).json({ status: "error", message: "Không tìm thấy khách sạn" });
      }
  
      // Xóa khách sạn
      await hotel.destroy();
  
      res.status(200).json({ status: "success", message: "Xóa khách sạn thành công" });
    } catch (err) {
      console.error("Lỗi khi xóa khách sạn:", err);
      res.status(500).json({ status: "error", message: "Lỗi máy chủ nội bộ" });
    }
  };
  