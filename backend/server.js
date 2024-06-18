// express 설치
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`오른쪽 포트로 back-end 실행중 ${port}`);
});

var mongoose = require("mongoose");
mongoose.connect("mongodb+srv://kkb4363:qqwe1123@blog.5kf4h7p.mongodb.net/");

var db = mongoose.connection;

db.on("error", function () {
  console.log("Connection Failed!");
});

db.once("open", function () {
  console.log("Connected!");
});

const imageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

var categorySchema = mongoose.Schema({
  title: String,
  posts: [],
  updatedDate: String,
  imgSrc: String,
});

const Image = mongoose.model("Image", imageSchema);
var Category = mongoose.model("Schema", categorySchema);

app.post("/api/posts", upload.single("image"), async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.body.title,
      posts: [],
      updatedDate: req.body.updatedDate,
      imgSrc: `/public/images/${req.file.filename}`,
    });
    await newCategory.save();

    res.send("카테고리와 이미지가 성공적으로 저장되었습니다.");
  } catch (error) {
    console.log(error);
    res.status(500).send("서버 에러");
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find({});

    const filteredCategories = categories.map((category) => {
      const { _id, __v, ...rest } = category.toObject();
      return { ...rest, categoryId: _id };
    });

    res.json(filteredCategories);
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 에러");
  }
});

app.delete("/api/clear-all", async (req, res) => {
  try {
    await Image.deleteMany({});
    await Category.deleteMany({});
    res.send("모든 데이터가 성공적으로 삭제되었습니다.");
  } catch (error) {
    console.log(error);
    res.status(500).send("서버 에러");
  }
});

// 9. 데이터 저장
// newStudent.save(function (error, data) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Saved!");
//   }
// });

// 10. Student 레퍼런스 전체 데이터 가져오기
// Student.find(function (error, students) {
//   console.log("--- Read all ---");
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(students);
//   }
// });

// 11. 특정 아이디값 가져오기
// Student.findOne({ _id: "585b777f7e2315063457e4ac" }, function (error, student) {
//   console.log("--- Read one ---");
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(student);
//   }
// });

// 12. 특정아이디 수정하기
// Student.findById(
//   { _id: "585b777f7e2315063457e4ac" },
//   function (error, student) {
//     console.log("--- Update(PUT) ---");
//     if (error) {
//       console.log(error);
//     } else {
//       student.name = "--modified--";
//       student.save(function (error, modified_student) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log(modified_student);
//         }
//       });
//     }
//   }
// );

// 13. 삭제
// Student.remove({ _id: "585b7c4371110029b0f584a2" }, function (error, output) {
//   console.log("--- Delete ---");
//   if (error) {
//     console.log(error);
//   }

//   console.log("--- deleted ---");
// });
