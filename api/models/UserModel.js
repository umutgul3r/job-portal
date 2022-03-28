const mongoose = require("mongoose");
const logger = require("../scripts/loggers/User");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lutfen isim giriniz!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Lutfen e-mail giriniz!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Lutfen şifre giriniz!"],
    },
    role: {
      type: Number,
      default: 0,
    },
    profile: {
      type: String,
      default: "",
    },
    cv: {
      type: String,
      default:
        "https://res.cloudinary.com/umut44/image/upload/v1648190303/profile/blank-profile-picture-973460_1280_o0tnkh.webp",
    },
    applicationStatus: Array,
  },
  {
    timestamps: true,
  }
);

userSchema.post("save", function (object) {
  console.log("Kayıt Edildi", object);
  logger.log({ level: "info", message: object });
  next();
});

module.exports = mongoose.model("Users", userSchema);
