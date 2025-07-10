const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

//part 4.3
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

//part 4.4

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})


// part 4.5

describe('total likes', () => {
  const listWithManyBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b5q17f8',
      title: 'Saakelikatten',
      author: 'Joe Gas',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/katten.pdf',
      likes: 50000,
      __v: 0
    },{
      _id: 'aaqqqqqqqqqqqqqqqq',
      title: 'Frog facts',
      author: 'Man Upp',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/facts.pdf',
      likes: 7,
      __v: 0
    }
  ]
  
  test('this is stooopid', () => {
    const result = listHelper.mostLikes(listWithManyBlog)
    assert.deepStrictEqual(result, listWithManyBlog[1])
  })
})