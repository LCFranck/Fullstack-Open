import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'testing testing',
    author: 'testi cles',
    url: 'testingtesting.ax',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('testing testing testi cles')
  expect(element).toBeDefined()
})

test('rendered content should not have likes', () => {
  const blog = {
    title: 'testing testing',
    author: 'testi cles',
    url: 'testingtesting.ax',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const element = screen.queryByText('Likes: 0')
  const element2 = screen.queryByText('URL: testingtesting.ax')

  expect(element).toBeNull()
  expect(element2).toBeNull()

})

/* test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    const mockHandler = vi.fn()

    render(
        <Blog blog={blog} toggleImportance={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)


    expect(mockHandler.mock.calls).toHaveLength(2)
}) */
