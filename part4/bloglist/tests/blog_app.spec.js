const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'caca',
        username: 'tehe',
        password: 'tehe'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('password')).toBeVisible()

  })

  
  describe('Login', () => {
      
    test('succeeds with correct credentials', async ({ page }) => {

    const textboxes = await page.getByRole('textbox').all()    
    await page.getByTestId('username').fill('tehe')
    await page.getByTestId('password').fill('tehe')

   /*  await textboxes[0].fill('tehe')    
    await textboxes[1].fill('tehe') */
    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('caca logged in')).toBeVisible()
    })

    test('succeeds with wrong credentials', async ({ page }) => {

    const textboxes = await page.getByRole('textbox').all()    
    await textboxes[0].fill('stupid')    
    await textboxes[1].fill('password')
    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Wrong username or password!')).toBeVisible()
    })
  })
   



  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
     // await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('tehe')
      await page.getByTestId('password').fill('tehe')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('a new note can be created', async ({ page }) => {
   //   await page.getByRole('button', { name: 'log in' }).click()

      await page.getByRole('button', { name: 'add blog' }).click()
      await page.getByTestId('title').fill('test title')
      await page.getByTestId('author').fill('Dr Test')
      await page.getByTestId('url').fill('testingtesting.se')

      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('test title')).toBeVisible()
     // await expect(page.getByText('blog was added!')).toBeVisible()

    })
  })  
})
