
const dummy = (blogs) => {
    return 1
  }
  

const totalLikes = (blogs) => {
    const likes = blogs.map(blogs => blogs.likes)

    const reducer = (sum, item) => {
        return sum + item
      }
  //  console.log(blogs)
    return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

    const getMax = (arr, prop) => {
        var max;
        for (var i=0 ; i<arr.length ; i++) {
            if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
                max = arr[i];
        }
        return max;
    }
    return getMax(blogs, "likes")
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}