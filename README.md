# easy-blog

Easy Blog is a lightweight blogging software that uses a express.js server with handlebars for generating the views and a mongodb backend

## Functionallity 

* Users can register and create Blogposts with text and a Header Image.
* User can also edit and delete their own articles. Articles are protected so that only their author can edit or delete.

## Demo 

You can see a Demo [here](https://easy-blog.adaptable.app/)

## Deployment

For local deployment

* install mongodb-server and node on your computer
* Create an [cloudinary account](https://cloudinary.com) for image upload
* git clone this repo
* run ```npm ci``` in the repo folder
Put your credentials for local deployment in a .env file  in the projects root like this
```
PORT=3000
SESSION_SECRET="Secret"
CLOUDINARY_NAME="Cloudinary Account Name"
CLOUDINARY_KEY="Cloudinary API Key"
CLOUDINARY_SECRET="Cloudinary Secret"
MONGODB_URI="URL to Mongo DB instance"
```
* run ```npm run dev```

You need a mongodb and a node server, as well as a cloudinary account for image upload. 

Put your credentials for local deployment in a .env file like this

For deploying on production server pass the enviroment variables to the process enviroment.
[Example for adaptable.io](https://adaptable.io/docs/templates/express-app-template#runtime-environment-variables)
