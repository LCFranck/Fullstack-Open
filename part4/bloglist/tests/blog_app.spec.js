const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('http://localhost:5173')
        // empty the db here
    // create a user for the backend here
    // ...
  })

  test('Login form is shown', async ({ page }) => {
      await expect(page.getByText('username')).toBeVisible()
      await expect(page.getByText('password')).toBeVisible()

  })

  
  describe('Login', () => {
      
    test('succeeds with correct credentials', async ({ page }) => {

    const textboxes = await page.getByRole('textbox').all()    
    await textboxes[0].fill('tehe')    
    await textboxes[1].fill('tehe')
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
   


/* describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    // ...
  })

  test('a new blog can be created', async ({ page }) => {
    // ...
  })
}) */
})
