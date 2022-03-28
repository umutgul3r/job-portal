module.exports = async function (req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "Fotoğraf Yok" });
    const file = req.files.file;
    console.log(file);
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Boyut Çok Fazla" });
    } // 1mb
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "application/pdf") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: "Dosya Türü Geçersiz." });
    } // 1mb
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
