
//============================================================================
//dependencies

const express = require('express');
const bodyParser= require('body-parser');
const db = require('./db');
const async = require('async');
const validator = require('express-validator');

// Models
const Gray = require('./models/gray_post');
const Post = require('./models/post');

const app = express();



app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());


app.use(express.static('public'));




//============================================================================
//home index page
app.get('/', (req, res) => {


  const grayList = Gray.find({});
  const postList = Post.find({});

  const resources = {
    grayArray: grayList.exec.bind(grayList),
    postArray: postList.exec.bind(postList)
  };

  async.parallel(resources, (error, results)=> {
    if(error){
      res.status(500).send(error);
      return;
    }
    info = results;
    combinedArray = [...info.grayArray, ...info.postArray];

    sortedArray = combinedArray.sort((a,b)=>{
      if(a.post_id.slice(2) > b.post_id.slice(2)){
        return -1;
      } else if(b.post_id.slice(2) > a.post_id.slice(2)){
        return 1;
      }
    })
    res.render('pages/index', {data: sortedArray});
  });

})

//============================================================================
//contact page
app.get('/contact', (req, res) => {
    res.render('pages/contact');
})

//============================================================================
//about page
app.get('/about', (req, res) => {

    const gray = grayQuery('p_1481421678010');

    // extract data from queried post
    gray.exec(function(err, grays){
        if(err)
          return console.log(err);

        grays.forEach(function(gray){
          var black = gray.black,
              blackImage = gray.blackImage,
              white = gray.white,
              whiteImage = gray.whiteImage,
              title = gray.title,
              content = gray.content,
              author = gray.author;

              // render post
              res.render('pages/gray', {
                black:black,
                blackImage:blackImage,
                white:white,
                whiteImage:whiteImage,
                title:title,
                content:content,
                author:author
              });
        })
    })
})


//============================================================================
// GRAY POST
//============================================================================

//submit gray post page
app.get('/supersecretsubmitgray', (req, res) => {
    res.render('pages/supersecretsubmitgray', {errors: null});
});

//submit a gray style post
app.post('/supersecretsubmitgray', (req, res) => {
  console.log(req.body);
  //Form validation
  req.checkBody({
    'black': {
      notEmpty: {
        errorMessage: "You're missing a side of the topic"
      }
    },
    'blackImage': {
      notEmpty: {
        errorMessage: "Image links must start with http!"
      }
    },
    'white': {
      notEmpty: {
        errorMessage: "You're missing a side of the topic"
      }
    },
    'whiteImage': {
      notEmpty: {
        errorMessage: "Image links must start with http!"
      }
    },
    'title': {
      notEmpty: {
        errorMessage: "Slap a title on the thing"
      }
    },
    'content': {
      notEmpty: {
        errorMessage: "You forgot the most important part!"
      }
    },
    'author': {
      notEmpty: {
        errorMessage: "Give yourself some credit!"
      }
    },

  })


  const errors = req.validationErrors();
  if(errors){
    res.render('pages/supersecretsubmitgray', {errors: errors});
    console.log(errors);
    return;
  } else{
    console.log('No errors found');

    // make new gray post
    var gray = new Gray();
        gray.black = req.body.black;
        gray.blackImage = req.body.blackImage;
        gray.white = req.body.white;
        gray.whiteImage = req.body.whiteImage;
        gray.title = req.body.title;
        gray.content = req.body.content;
        gray.author = req.body.author;

    // save post
    gray.save(function(err){
      if (err)
        res.send(err);
    });

    //go back to home page
    res.render('pages/index');
  }
})



    //============================================================================
    // populate the gray post page with the current gray post's data
    app.get('/gray/:id', function(req, res) {

        const idString = String(req.params.id);
        const gray = grayQuery(idString);

        // extract data from queried post
        gray.exec(function(err, grays){
            if(err)
              return console.log(err);

            grays.forEach(function(gray){
              var black = gray.black,
                  blackImage = gray.blackImage,
                  white = gray.white,
                  whiteImage = gray.whiteImage,
                  title = gray.title,
                  content = gray.content,
                  author = gray.author;


                  // render post
                  res.render('pages/gray', {
                    black:black,
                    blackImage:blackImage,
                    white:white,
                    whiteImage:whiteImage,
                    title:title,
                    content:content,
                    author:author
                  });
            })
        })

    });

//============================================================================
// POST
//============================================================================

//submit post page
app.get('/supersecretsubmitpost', (req, res) => {
    res.render('pages/supersecretsubmitpost', {errors: null});
});

//submit a gray style post
app.post('/supersecretsubmitpost', (req, res) => {
  console.log(req.body);
  //Form validation
  req.checkBody({
    'title': {
      notEmpty: {
        errorMessage: "Slap a title on the thing"
      }
    },
    'content': {
      notEmpty: {
        errorMessage: "You forgot the most important part!"
      }
    },
    'author': {
      notEmpty: {
        errorMessage: "Give yourself some credit!"
      }
    },

  })


  const errors = req.validationErrors();
  if(errors){
    res.render('pages/supersecretsubmitpost', {errors: errors});
    console.log(errors);
    return;
  } else{
    console.log('No errors found');

    // make new post
    var post = new Post();
        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.body.author;
        post.image = req.body.postImage;

    // save post
    post.save(function(err){
      if (err)
        res.send(err);
    });

    //go back to home page
    res.render('pages/index');
  }
})



    //============================================================================
    // populate the gray post page with the current gray post's data
    app.get('/post/:id', function(req, res) {

        const idString = String(req.params.id);
        const post = postQuery(idString);


        // extract data from queried post
        post.exec(function(err, posts){
            if(err)
              return console.log(err);

            posts.forEach(function(post){
              //console.log(post.title);
                  // render post
                  res.render('pages/post', {
                    image: post.image,
                    title:post.title,
                    content:post.content,
                    author:post.author
                  });
            })
        })

    });


//============================================================================
//Handle 404 error
app.use(function(req, res, next) {
    res.status(404).render('pages/404');
});

//============================================================================
//Listen on port
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
})


//==================================================
// Helper Functions
//==================================================

// query gray post to display
function grayQuery(id){ // id must be a string
  var query = Gray.find({post_id: id}, function(err, gray){
    if(err) throw err;
    return gray;
  });

  return query;
}

// query post to display
function postQuery(id){ // id must be a string
  var query = Post.find({post_id: id}, function(err, post){
    if(err) throw err;
    return post;
  });

  return query;
}












