

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    console.log("blogs here!", blogs)
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostLikes = (blogs) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", blogs[1])
    let best = blogs[0]
    for (let i in blogs) {
        if (best.likes<=blogs[i].likes){
            best= blogs[i]
        }
    }
    return best
}

module.exports = {
  dummy, totalLikes, mostLikes
}

