const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 0)
    })
    test('when list has only one blog equals the likes of that blog', () => {
        const blogs = [
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Con sidered_Harmful.html',
                likes: 5
            }
        ]
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 5)
    })
    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Con sidered_Harmful.html',
                likes: 5
            },
            {
                title: 'Python for Data Analysis',
                author: 'Wes McKinney',
                url: 'https://wesmckinney.com/blog/python-for-data-analysis/',
                likes: 10
            }
        ]
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 15)
    })
})

describe('favorite blog', () => {
    test('of empty list is null', () => {
        const blogs = []
        const result = listHelper.favoriteBlog(blogs)
        assert.strictEqual(result, null)
    })
    test('when list has only one blog equals that blog', () => {
        const blogs = [
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Con sidered_Harmful.html',
                likes: 5
            }
        ]
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })
    test('of a bigger list is found right', () => {
        const blogs = [
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Con sidered_Harmful.html',
                likes: 5
            },
            {
                title: 'Python for Data Analysis',
                author: 'Wes McKinney',
                url: 'https://wesmckinney.com/blog/python-for-data-analysis/',
                likes: 10
            }
        ]
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: 'Python for Data Analysis',
            author: 'Wes McKinney',
            likes: 10
        })
    })
})