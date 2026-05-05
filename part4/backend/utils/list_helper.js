const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const favorite = blogs.reduce((favorite, blog) => {
            return blog.likes > favorite.likes ? blog : favorite
        }, blogs[0])
        return {
            title: favorite.title,
            author: favorite.author,
            likes: favorite.likes
        }
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const authorCounts = {}
        blogs.forEach(blog => {
            authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1
        })
        const mostProlific = Object.keys(authorCounts).reduce((most, author) => {
            return authorCounts[author] > most.blogs ? { author, blogs: authorCounts[author] } : most
        }, { author: null, blogs: 0 })

        return mostProlific
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    } else {
        const authorLikes = {}
        blogs.forEach(blog => {
            authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
        })
        const mostLiked = Object.keys(authorLikes).reduce((most, author) => {
            return authorLikes[author] > most.likes ? { author, likes: authorLikes[author] } : most
        }, { author: null, likes: 0 })

        return mostLiked
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}