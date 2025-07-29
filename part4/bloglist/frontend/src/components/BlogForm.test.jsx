import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm addBlog={createBlog} />)

    //await user.click(screen.getByText('add blog'))


    await user.type(screen.getByLabelText('title'), 'testing testing')
    await user.type(screen.getByLabelText('author'), 'Testi Cles')
    await user.type(screen.getByLabelText('url'), 'testingtestingtest.se')
    await user.click(screen.getByText('save'))



  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing testing')
})