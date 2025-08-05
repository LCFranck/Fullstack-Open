
/* 
const blogs = [
    { title: 'unimpressive blog', author: 'Becca Bored', url: 'idontevencareaboutlikes.com', likes: 2 },
    { title: 'goose activities', author: 'joe gas', url: 'goose.com', likes: 6000000 },
    { title: 'bog facts', author: 'Bog lover', url: 'ilovebogs.com', likes: 100 }
] */

const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}


const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'add blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'save' }).click()    
    await page.getByRole('button', { name: 'cancel' }).click()

}

export { loginWith, createBlog }