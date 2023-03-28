const mongoose = require("mongoose");
const User = require("../models/User.model");
const Article = require("../models/article.model");
const bcrypt = require("bcrypt");
const users = [];

async function createUsers() {
  const userNames = ["dieter", "paul", "anna"];
  for (const userName of userNames) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userName, salt);
    const user = { username: userName, password: password };
    console.log(user);
    users.push(user);
  }
}

function addUserToArticle(userArr, articleArr) {
  console.log(Array.isArray(userArr));

  articleArr.forEach((article) => {
    const randomUser = userArr[Math.floor(Math.random() * 2)];
    console.log(`Picked ${randomUser} of ${userArr}`);
    article.author = randomUser._id;
  });
}

const articles = [
  {
    title: "The one and only",
    topics: ["News", "Celebrities"],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae metus fermentum, tincidunt nibh in, ullamcorper arcu. Aenean mattis metus vitae neque lacinia tincidunt. Pellentesque blandit finibus purus nec pulvinar. Pellentesque maximus auctor leo. Cras elementum tincidunt augue nec luctus. Fusce placerat faucibus risus, id eleifend sem bibendum nec. Nullam id felis tempus, sollicitudin lectus ut, blandit nulla. Quisque ultrices ex vel diam finibus egestas. Praesent vel tortor at elit semper aliquam in nec lectus. Integer vel nunc maximus, efficitur nisl ut, efficitur ipsum. In ac ante sed tortor iaculis egestas id tincidunt tortor.
Fusce in vehicula ligula. Mauris ante tortor, placerat eget finibus eu, fermentum vel risus. Ut pharetra sit amet lacus nec vehicula. Phasellus dictum, nunc nec vehicula pretium, justo risus scelerisque nulla, quis vulputate odio augue id urna. Duis odio ex, ornare at sapien non, cursus blandit ligula. Suspendisse eu pretium neque. Aliquam sit amet justo ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ut est posuere elit commodo cursus nec ac nisi. Morbi sagittis efficitur mi quis commodo. Etiam ut libero in felis sodales sodales nec sed nulla. Aenean vitae velit quis lectus rhoncus luctus non a quam. Quisque vestibulum sem quam, vel vestibulum dolor accumsan sit amet. Donec id mattis urna, in vestibulum augue.
Fusce sed massa facilisis, faucibus augue ac, congue massa. Aliquam a condimentum augue. Nam vehicula, lorem in venenatis vehicula, lorem ipsum posuere risus, ac pulvinar ex massa ac nisi. Mauris et congue enim, a consequat justo. Donec auctor sem ornare luctus consectetur. Donec suscipit, ipsum porta facilisis hendrerit, quam velit luctus metus, sit amet imperdiet tellus ipsum vitae mauris. Quisque ultricies lectus ultricies elit molestie, ac ullamcorper turpis placerat.
Etiam tincidunt sapien ligula, id efficitur libero egestas in. Ut vitae suscipit ipsum. Sed eros felis, porttitor commodo sem efficitur, suscipit consequat lacus. Aliquam volutpat diam sed efficitur convallis. Quisque scelerisque, mi eget tempor imperdiet, ante augue molestie est, ut dapibus lorem quam ut dolor. Maecenas facilisis turpis ac velit congue, vitae condimentum est tempus. Integer sodales, augue et sodales consequat, tortor dui volutpat lectus, nec finibus nisi ex quis ipsum. In tristique, velit eu vestibulum sagittis, justo ipsum malesuada mi, at porta ex metus vitae est. Integer quis massa et leo ornare ullamcorper et ac diam.
Morbi scelerisque, nunc at ornare malesuada, ante nisi cursus nulla, et iaculis neque erat at metus. Vivamus justo risus, convallis in commodo sit amet, ultrices ac ex. Cras ut massa turpis. Morbi velit ipsum, laoreet ut faucibus et, consequat sed velit. Donec et augue arcu. Aenean sed lectus a quam sodales tincidunt a eu est. Pellentesque in nunc vitae ligula volutpat varius at nec lectus. Mauris risus purus, dictum sodales mauris sed, volutpat dapibus magna. Proin dignissim sed mi ut suscipit.
`,
  },
  {
    title: "The one and only",
    topics: ["News", "Celebrities"],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae metus fermentum, tincidunt nibh in, ullamcorper arcu. Aenean mattis metus vitae neque lacinia tincidunt. Pellentesque blandit finibus purus nec pulvinar. Pellentesque maximus auctor leo. Cras elementum tincidunt augue nec luctus. Fusce placerat faucibus risus, id eleifend sem bibendum nec. Nullam id felis tempus, sollicitudin lectus ut, blandit nulla. Quisque ultrices ex vel diam finibus egestas. Praesent vel tortor at elit semper aliquam in nec lectus. Integer vel nunc maximus, efficitur nisl ut, efficitur ipsum. In ac ante sed tortor iaculis egestas id tincidunt tortor.
Fusce in vehicula ligula. Mauris ante tortor, placerat eget finibus eu, fermentum vel risus. Ut pharetra sit amet lacus nec vehicula. Phasellus dictum, nunc nec vehicula pretium, justo risus scelerisque nulla, quis vulputate odio augue id urna. Duis odio ex, ornare at sapien non, cursus blandit ligula. Suspendisse eu pretium neque. Aliquam sit amet justo ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ut est posuere elit commodo cursus nec ac nisi. Morbi sagittis efficitur mi quis commodo. Etiam ut libero in felis sodales sodales nec sed nulla. Aenean vitae velit quis lectus rhoncus luctus non a quam. Quisque vestibulum sem quam, vel vestibulum dolor accumsan sit amet. Donec id mattis urna, in vestibulum augue.
Fusce sed massa facilisis, faucibus augue ac, congue massa. Aliquam a condimentum augue. Nam vehicula, lorem in venenatis vehicula, lorem ipsum posuere risus, ac pulvinar ex massa ac nisi. Mauris et congue enim, a consequat justo. Donec auctor sem ornare luctus consectetur. Donec suscipit, ipsum porta facilisis hendrerit, quam velit luctus metus, sit amet imperdiet tellus ipsum vitae mauris. Quisque ultricies lectus ultricies elit molestie, ac ullamcorper turpis placerat.
Etiam tincidunt sapien ligula, id efficitur libero egestas in. Ut vitae suscipit ipsum. Sed eros felis, porttitor commodo sem efficitur, suscipit consequat lacus. Aliquam volutpat diam sed efficitur convallis. Quisque scelerisque, mi eget tempor imperdiet, ante augue molestie est, ut dapibus lorem quam ut dolor. Maecenas facilisis turpis ac velit congue, vitae condimentum est tempus. Integer sodales, augue et sodales consequat, tortor dui volutpat lectus, nec finibus nisi ex quis ipsum. In tristique, velit eu vestibulum sagittis, justo ipsum malesuada mi, at porta ex metus vitae est. Integer quis massa et leo ornare ullamcorper et ac diam.
Morbi scelerisque, nunc at ornare malesuada, ante nisi cursus nulla, et iaculis neque erat at metus. Vivamus justo risus, convallis in commodo sit amet, ultrices ac ex. Cras ut massa turpis. Morbi velit ipsum, laoreet ut faucibus et, consequat sed velit. Donec et augue arcu. Aenean sed lectus a quam sodales tincidunt a eu est. Pellentesque in nunc vitae ligula volutpat varius at nec lectus. Mauris risus purus, dictum sodales mauris sed, volutpat dapibus magna. Proin dignissim sed mi ut suscipit.
`,
  },
  {
    title: "The one and only",
    topics: ["News", "Celebrities"],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae metus fermentum, tincidunt nibh in, ullamcorper arcu. Aenean mattis metus vitae neque lacinia tincidunt. Pellentesque blandit finibus purus nec pulvinar. Pellentesque maximus auctor leo. Cras elementum tincidunt augue nec luctus. Fusce placerat faucibus risus, id eleifend sem bibendum nec. Nullam id felis tempus, sollicitudin lectus ut, blandit nulla. Quisque ultrices ex vel diam finibus egestas. Praesent vel tortor at elit semper aliquam in nec lectus. Integer vel nunc maximus, efficitur nisl ut, efficitur ipsum. In ac ante sed tortor iaculis egestas id tincidunt tortor.
Fusce in vehicula ligula. Mauris ante tortor, placerat eget finibus eu, fermentum vel risus. Ut pharetra sit amet lacus nec vehicula. Phasellus dictum, nunc nec vehicula pretium, justo risus scelerisque nulla, quis vulputate odio augue id urna. Duis odio ex, ornare at sapien non, cursus blandit ligula. Suspendisse eu pretium neque. Aliquam sit amet justo ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ut est posuere elit commodo cursus nec ac nisi. Morbi sagittis efficitur mi quis commodo. Etiam ut libero in felis sodales sodales nec sed nulla. Aenean vitae velit quis lectus rhoncus luctus non a quam. Quisque vestibulum sem quam, vel vestibulum dolor accumsan sit amet. Donec id mattis urna, in vestibulum augue.
Fusce sed massa facilisis, faucibus augue ac, congue massa. Aliquam a condimentum augue. Nam vehicula, lorem in venenatis vehicula, lorem ipsum posuere risus, ac pulvinar ex massa ac nisi. Mauris et congue enim, a consequat justo. Donec auctor sem ornare luctus consectetur. Donec suscipit, ipsum porta facilisis hendrerit, quam velit luctus metus, sit amet imperdiet tellus ipsum vitae mauris. Quisque ultricies lectus ultricies elit molestie, ac ullamcorper turpis placerat.
Etiam tincidunt sapien ligula, id efficitur libero egestas in. Ut vitae suscipit ipsum. Sed eros felis, porttitor commodo sem efficitur, suscipit consequat lacus. Aliquam volutpat diam sed efficitur convallis. Quisque scelerisque, mi eget tempor imperdiet, ante augue molestie est, ut dapibus lorem quam ut dolor. Maecenas facilisis turpis ac velit congue, vitae condimentum est tempus. Integer sodales, augue et sodales consequat, tortor dui volutpat lectus, nec finibus nisi ex quis ipsum. In tristique, velit eu vestibulum sagittis, justo ipsum malesuada mi, at porta ex metus vitae est. Integer quis massa et leo ornare ullamcorper et ac diam.
Morbi scelerisque, nunc at ornare malesuada, ante nisi cursus nulla, et iaculis neque erat at metus. Vivamus justo risus, convallis in commodo sit amet, ultrices ac ex. Cras ut massa turpis. Morbi velit ipsum, laoreet ut faucibus et, consequat sed velit. Donec et augue arcu. Aenean sed lectus a quam sodales tincidunt a eu est. Pellentesque in nunc vitae ligula volutpat varius at nec lectus. Mauris risus purus, dictum sodales mauris sed, volutpat dapibus magna. Proin dignissim sed mi ut suscipit.
`,
  },
  {
    title: "The one and only",
    topics: ["News", "Celebrities"],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae metus fermentum, tincidunt nibh in, ullamcorper arcu. Aenean mattis metus vitae neque lacinia tincidunt. Pellentesque blandit finibus purus nec pulvinar. Pellentesque maximus auctor leo. Cras elementum tincidunt augue nec luctus. Fusce placerat faucibus risus, id eleifend sem bibendum nec. Nullam id felis tempus, sollicitudin lectus ut, blandit nulla. Quisque ultrices ex vel diam finibus egestas. Praesent vel tortor at elit semper aliquam in nec lectus. Integer vel nunc maximus, efficitur nisl ut, efficitur ipsum. In ac ante sed tortor iaculis egestas id tincidunt tortor.
Fusce in vehicula ligula. Mauris ante tortor, placerat eget finibus eu, fermentum vel risus. Ut pharetra sit amet lacus nec vehicula. Phasellus dictum, nunc nec vehicula pretium, justo risus scelerisque nulla, quis vulputate odio augue id urna. Duis odio ex, ornare at sapien non, cursus blandit ligula. Suspendisse eu pretium neque. Aliquam sit amet justo ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ut est posuere elit commodo cursus nec ac nisi. Morbi sagittis efficitur mi quis commodo. Etiam ut libero in felis sodales sodales nec sed nulla. Aenean vitae velit quis lectus rhoncus luctus non a quam. Quisque vestibulum sem quam, vel vestibulum dolor accumsan sit amet. Donec id mattis urna, in vestibulum augue.
Fusce sed massa facilisis, faucibus augue ac, congue massa. Aliquam a condimentum augue. Nam vehicula, lorem in venenatis vehicula, lorem ipsum posuere risus, ac pulvinar ex massa ac nisi. Mauris et congue enim, a consequat justo. Donec auctor sem ornare luctus consectetur. Donec suscipit, ipsum porta facilisis hendrerit, quam velit luctus metus, sit amet imperdiet tellus ipsum vitae mauris. Quisque ultricies lectus ultricies elit molestie, ac ullamcorper turpis placerat.
Etiam tincidunt sapien ligula, id efficitur libero egestas in. Ut vitae suscipit ipsum. Sed eros felis, porttitor commodo sem efficitur, suscipit consequat lacus. Aliquam volutpat diam sed efficitur convallis. Quisque scelerisque, mi eget tempor imperdiet, ante augue molestie est, ut dapibus lorem quam ut dolor. Maecenas facilisis turpis ac velit congue, vitae condimentum est tempus. Integer sodales, augue et sodales consequat, tortor dui volutpat lectus, nec finibus nisi ex quis ipsum. In tristique, velit eu vestibulum sagittis, justo ipsum malesuada mi, at porta ex metus vitae est. Integer quis massa et leo ornare ullamcorper et ac diam.
Morbi scelerisque, nunc at ornare malesuada, ante nisi cursus nulla, et iaculis neque erat at metus. Vivamus justo risus, convallis in commodo sit amet, ultrices ac ex. Cras ut massa turpis. Morbi velit ipsum, laoreet ut faucibus et, consequat sed velit. Donec et augue arcu. Aenean sed lectus a quam sodales tincidunt a eu est. Pellentesque in nunc vitae ligula volutpat varius at nec lectus. Mauris risus purus, dictum sodales mauris sed, volutpat dapibus magna. Proin dignissim sed mi ut suscipit.
`,
  },
  {
    title: "The one and only",
    topics: ["News", "Celebrities"],
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae metus fermentum, tincidunt nibh in, ullamcorper arcu. Aenean mattis metus vitae neque lacinia tincidunt. Pellentesque blandit finibus purus nec pulvinar. Pellentesque maximus auctor leo. Cras elementum tincidunt augue nec luctus. Fusce placerat faucibus risus, id eleifend sem bibendum nec. Nullam id felis tempus, sollicitudin lectus ut, blandit nulla. Quisque ultrices ex vel diam finibus egestas. Praesent vel tortor at elit semper aliquam in nec lectus. Integer vel nunc maximus, efficitur nisl ut, efficitur ipsum. In ac ante sed tortor iaculis egestas id tincidunt tortor.
Fusce in vehicula ligula. Mauris ante tortor, placerat eget finibus eu, fermentum vel risus. Ut pharetra sit amet lacus nec vehicula. Phasellus dictum, nunc nec vehicula pretium, justo risus scelerisque nulla, quis vulputate odio augue id urna. Duis odio ex, ornare at sapien non, cursus blandit ligula. Suspendisse eu pretium neque. Aliquam sit amet justo ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ut est posuere elit commodo cursus nec ac nisi. Morbi sagittis efficitur mi quis commodo. Etiam ut libero in felis sodales sodales nec sed nulla. Aenean vitae velit quis lectus rhoncus luctus non a quam. Quisque vestibulum sem quam, vel vestibulum dolor accumsan sit amet. Donec id mattis urna, in vestibulum augue.
Fusce sed massa facilisis, faucibus augue ac, congue massa. Aliquam a condimentum augue. Nam vehicula, lorem in venenatis vehicula, lorem ipsum posuere risus, ac pulvinar ex massa ac nisi. Mauris et congue enim, a consequat justo. Donec auctor sem ornare luctus consectetur. Donec suscipit, ipsum porta facilisis hendrerit, quam velit luctus metus, sit amet imperdiet tellus ipsum vitae mauris. Quisque ultricies lectus ultricies elit molestie, ac ullamcorper turpis placerat.
Etiam tincidunt sapien ligula, id efficitur libero egestas in. Ut vitae suscipit ipsum. Sed eros felis, porttitor commodo sem efficitur, suscipit consequat lacus. Aliquam volutpat diam sed efficitur convallis. Quisque scelerisque, mi eget tempor imperdiet, ante augue molestie est, ut dapibus lorem quam ut dolor. Maecenas facilisis turpis ac velit congue, vitae condimentum est tempus. Integer sodales, augue et sodales consequat, tortor dui volutpat lectus, nec finibus nisi ex quis ipsum. In tristique, velit eu vestibulum sagittis, justo ipsum malesuada mi, at porta ex metus vitae est. Integer quis massa et leo ornare ullamcorper et ac diam.
Morbi scelerisque, nunc at ornare malesuada, ante nisi cursus nulla, et iaculis neque erat at metus. Vivamus justo risus, convallis in commodo sit amet, ultrices ac ex. Cras ut massa turpis. Morbi velit ipsum, laoreet ut faucibus et, consequat sed velit. Donec et augue arcu. Aenean sed lectus a quam sodales tincidunt a eu est. Pellentesque in nunc vitae ligula volutpat varius at nec lectus. Mauris risus purus, dictum sodales mauris sed, volutpat dapibus magna. Proin dignissim sed mi ut suscipit.
`,
  },
];

async function seedData() {
  try {
    /* CONNECT */
    const MONGO_URI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/easy-blog";
    const conn = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${conn.connections[0].name}"`
    );
    // Uncomment for Delete dat
    // await User.deleteMany();
    // await Article.deleteMany();

    await createUsers();
    const newUsers = await User.create(users);
    console.log(`Created ${newUsers.length} users`);
    const usersFromDB = User.find({});
    addUserToArticle(newUsers, articles);
    const articlesFromDb = await Article.create(articles);
    console.log(`created ${articlesFromDb.length} articles`);
    /* CLOSE DB CONNECTION */
  } catch (e) {
    console.log("error seeding data in DB....", e);
  }
  try {
    mongoose.connection.close();
  } catch (e) {
    console.log(e);
  }
}

seedData();
