const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
    await loginWith(page,'tehe','tehe')
   /*  await textboxes[0].fill('tehe')    
    await textboxes[1].fill('tehe') */
   // await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('caca logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {

   // const textboxes = await page.getByRole('textbox').all()    
    await loginWith(page,'stupid','wrongpassword')
  //  await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Wrong username or password!')).toBeVisible()
    })
  })
   



  describe('when logged in', () => {
      beforeEach(async ({ page, request }) => {
        await loginWith(page,'tehe','tehe')

      })
    
      test('a new note can be created', async ({ page }) => {
    //   await page.getByRole('button', { name: 'log in' }).click()
    // await page.getByRole('button', { name: 'log in' }).click()

        await createBlog(page, 'test', 'Dr Test', 'testingtesting.se')
        await expect(page.getByText('blog was added!')).toBeVisible()
      // await expect(page.getByText('blog was added!')).toBeVisible()

      })
      describe('and a note exists', () => {
        beforeEach(async ({ page, request }) => {
          await createBlog(page, 'good blog', 'Dr Testi', 'testingtestingtesting.se')

      })
        
        test('a new note can be liked', async ({ page }) => {
      //   await page.getByRole('button', { name: 'log in' }).click()
      // await page.getByRole('button', { name: 'log in' }).click()

        
          await page.getByRole('button', { name: 'show' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await expect(page.getByText('Likes: 1')).toBeVisible()
        // await expect(page.getByText('blog was added!')).toBeVisible()

        })
        test('user can delete their own blog', async ({ page }) => {
          await createBlog(page, "deletethisblogplease", "Dr Delete", "deletable.com")
          await page.getByRole('button', { name: 'show' }).click()
          await page.getByRole('button', { name: 'delete' }).click()

          await expect(page.getByText('deletethisblogplease')).not.toBeVisible()
        })
    })
    describe('and a many blogs exist', () => {
        beforeEach(async ({ page, request }) => {
          await createBlog(page, 'blog 1', 'Dr blog', 'testingtestingtesting.se')
          await createBlog(page, 'blog 2', 'Dr blog', 'testingtestingtesting.se')

          await createBlog(page, 'blog 3', 'Dr blog', 'testingtestingtesting.se')


      })
        
        test('a new note can be liked', async ({ page }) => {
         const blogElements = await page.locator('.Blog').all() 
          console.log(blogElements.length+ " kolla här!")
        })
      })
  })  
})
