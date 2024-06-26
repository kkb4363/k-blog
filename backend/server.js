const express = require("express");
const app = express();
const router = express.Router();
const port = 8080;
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

// const fs = require("fs");
// const https = require("https");

// const options = {
//   key: fs.readFileSync(path.resolve(__dirname, "keys/ca.key")),
//   cert: fs.readFileSync(path.resolve(__dirname, "keys/ca.crt")),
// };

// const server = https.createServer(options, app);

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
app.use(express.json());

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

// server.listen(443, () => {
//   console.log(`HTTPS server started on port 443`);
// });

var mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://kkb4363:${process.env.MONGODB_PW}@blog.5kf4h7p.mongodb.net/`
);

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

let categorySchema = mongoose.Schema({
  title: String,
  posts: [String],
  updatedDate: String,
  imgSrc: String,
});

let postSchema = mongoose.Schema({
  title: String,
  tags: [String],
  text: String,
  categoryId: String,
  imgSrc: String,
  createdDate: String,
  postId: String,
  likes: [String],
});

let userScheme = mongoose.Schema({
  email: String,
  googleId: String,
});

const Image = mongoose.model("ImageSchema", imageSchema);
let Category = mongoose.model("categorySchema", categorySchema);
let Posts = mongoose.model("postSchema", postSchema);
let User = mongoose.model("userScheme", userScheme);

// router.get("/kakaoLogin", async (req, res) => {
//   let REST_API_KEY = "a1a3e3c9f31843f5ba0e82d6421104c8";
//   let REDIRECT_URI = "http://localhost:5173";

//   let code = req.query.code;
//   axios
//     .post("https://kauth.kakao.com/oauth/token", null, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       params: {
//         grant_type: "authorization_code",
//         client_id: REST_API_KEY,
//         redirect_uri: REDIRECT_URI,
//         code: code,
//       },
//     })
//     .then((response) => {
//       console.log(response);
//       let accessToken = response.data.access_token;
//       axios
//         .get("https://kapi.kakao.com/v2/user/me", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//           },
//         })
//         .then((res) => {
//           console.log(res.data);
//           res.send(res.data);
//         })
//         .catch((err) => {
//           console.error("Error fetching user info:", err);
//         });
//     })
//     .catch((err) => {
//       console.error("Error fetching access token:", err);
//     });
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["email", "profile"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//   }),
//   function (req, res) {
//     res.redirect("/");
//   }
// );

// const googleStrategyConfig = new GoogleStrategy(
//   {
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_KEY,
//     callbackURL: "/auth/google/callback",
//     scope: ["email", "profile"],
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     console.log(profile);
//     try {
//       const user = await User.findOne({ googleId: profile.id });

//       if (user) {
//         return done(null, user);
//       } else {
//         const newUser = new User({
//           email: profile.emails[0].value,
//           googleId: profile.id,
//         });

//         await newUser.save();
//         return done(null, user);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// passport.use("google", googleStrategyConfig);

app.post("/api/category", upload.single("image"), async (req, res) => {
  try {
    const newCategory = new Category({
      title: req.body.title,
      posts: [],
      updatedDate: req.body.updatedDate,
      imgSrc: `/public/images/${req.file.filename}`,
    });
    await newCategory.save();

    res.send("카테고리와 이미지가 성공적으로 저장됨");
  } catch (error) {
    console.log(error);
    res.status(500).send("카테고리 생성 에러");
  }
});

app.patch("/api/edit/:Id", async (req, res) => {
  const { Id } = req.params;
  const { title, text, tags } = req.body;

  try {
    const blog = await Posts.findById(Id);

    if (!blog) {
      return res.status(404).json({ error: "블로그를 찾을 수 없습니다." });
    }

    if (title) blog.title = title;
    if (text) blog.text = text;
    if (tags) blog.tags = tags;

    await blog.save();

    res.json(blog);
  } catch (error) {
    console.error("블로그 수정 중 오류:", error);
    res.status(500).json({ error: "블로그를 수정할 수 없습니다." });
  }
});

app.delete("/api/delete/:Id", async (req, res) => {
  const { Id } = req.params;

  try {
    const deletedBlog = await Posts.findByIdAndDelete(Id);

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ error: "삭제할 블로그를 찾을 수 없습니다." });
    }

    await Category.updateMany({}, { $pull: { posts: deletedBlog._id } });

    res.json({ message: "블로그가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("블로그 삭제 중 오류:", error);
    res.status(500).json({ error: "블로그를 삭제할 수 없습니다." });
  }
});

app.post("/api/post", async (req, res) => {
  try {
    const newPost = new Posts({
      title: req.body.title,
      tags: req.body.tags,
      text: req.body.text,
      categoryId: req.body.categoryId,
      createdDate: req.body.createdDate,
      likes: [],
    });

    const savedPost = await newPost.save();

    const category = await Category.findById(req.body.categoryId);

    const imgSrc = category.imgSrc;

    savedPost.imgSrc = imgSrc;
    await savedPost.save();

    await Category.findByIdAndUpdate(req.body.categoryId, {
      $push: { posts: savedPost._id },
    });

    res.send("포스트 만들기 성공");
  } catch (err) {
    console.error(err);
    res.status(500).send("포스트 생성 에러");
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Posts.find({});
    const categories = await Category.find({});

    const categoryMap = categories.reduce((map, category) => {
      map[category._id.toString()] = category.imgSrc;
      return map;
    }, {});

    const filteredPosts = posts.map((post) => {
      const { _id, __v, categoryId, ...rest } = post.toObject();

      return {
        ...rest,
        categoryId,
        postId: _id,
        imgSrc: categoryMap[categoryId],
      };
    });

    res.json(filteredPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send("포스트 조회 에러");
  }
});

app.get("/api/posts/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const posts = await Posts.find({ categoryId });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send("포스트 조회 에러");
  }
});

app.get("/api/tag/:tag", async (req, res) => {
  try {
    const tagName = req.params.tag;

    const posts = await Posts.find({
      tags: { $regex: new RegExp(tagName, "i") },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("포스트 조회 에러");
  }
});

app.get("/api/post/:Id", async (req, res) => {
  try {
    const postId = req.params.Id;
    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).send("포스트를 찾을 수 없습니다.");
    }

    const { __v, ...rest } = post.toObject();

    res.json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).send("포스트 내용 조회 에러");
  }
});

app.post("/api/post/like/:Id", async (req, res) => {
  const postId = req.params.Id;
  const kakaoId = req.body.kakaoId;

  try {
    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).send("포스트를 찾을 수 없습니다.");
    }

    const index = post.likes.indexOf(kakaoId);

    if (index === -1) {
      post.likes.push(kakaoId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();

    const { __v, ...rest } = post.toObject();
    res.json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).send("좋아요 업데이트 에러");
  }
});

// Student.findOne({ _id: "585b777f7e2315063457e4ac" }, function (error, student) {
//   console.log("--- Read one ---");
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(student);
//   }
// });

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find({});

    const filteredCategories = categories.map((category) => {
      const { _id, __v, posts, ...rest } = category.toObject();
      return { ...rest, posts: posts, categoryId: _id };
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
    await Posts.deleteMany({});
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
