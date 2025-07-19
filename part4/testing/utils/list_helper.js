const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    console.log("blogs here!", blogs)
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog  = (blogs) => {
    let best = blogs[0]
    for (let i in blogs) {
        if (best.likes<=blogs[i].likes){
            best= blogs[i]
        }
    }
    return best
}


const mostBlogs = (blogs) => {
  let bestAuthor = blogs[1].author //deafult
  let combined = _.countBy(blogs,"author")
  bestAuthor = _.maxBy(Object.keys(combined), author => combined[author]);


  return {author: bestAuthor, blogs: combined[bestAuthor]}
}

const mostLikes = (blogs) => {

  const combined = _.groupBy(blogs, 'author')
  const bestAuthor = _.maxBy(Object.entries(combined), ([author, blogs]) => _.sumBy(blogs, 'likes'))

  return {
    author: bestAuthor[0],
    likes: _.sumBy(bestAuthor[1], 'likes'),
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog , mostBlogs, mostLikes
}

