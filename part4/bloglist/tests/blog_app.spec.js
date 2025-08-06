const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog} = require('./helper')

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

      await loginWith(page,'stupid','wrongpassword')
    //  await expect(page.getByText('Wrong username or password!')).toBeVisible()
        const errorDiv = page.locator('.error')  
        await expect(errorDiv).toContainText('Wrong username or password!')
    })
  })
   

  describe('when logged in', () => {
      beforeEach(async ({ page, request }) => {
        await loginWith(page,'tehe','tehe')

      })
  
      test('a new note can be created', async ({ page }) => {
        await createBlog(page, 'test', 'Dr Test', 'testingtesting.se')
        await expect(page.getByText('blog was added!')).toBeVisible()
      })

      describe('and a note exists', () => {
        beforeEach(async ({ page, request }) => {
          await createBlog(page, 'good blog', 'Dr Testi', 'testingtestingtesting.se')

      })
                
        test('a new note can be liked', async ({ page }) => {
          let blogElement = page.locator('.blog').filter({ hasText: 'good blog' }).first()
          await blogElement.getByRole('button', { name: 'show' }).click()
          blogElement = page.locator('.blog').filter({ hasText: 'good blog' }).first()

          for (let i = 1; i <= 5; i++) {
            await blogElement.getByRole('button', { name: 'like' }).click()
            await expect(blogElement).toContainText(`Likes: ${i}`)
          }
          await expect(blogElement).toContainText(`Likes: 5`)
        })


        test('user can delete their own blog', async ({ page }) => {
         // await createBlog(page, "deletethisblogplease", "Dr Delete", "deletable.com")
          await page.getByRole('button', { name: 'show' }).click()
          await page.getByRole('button', { name: 'delete' }).click()
          await expect(page.getByText("the blog 'good blog' was removed")).toBeVisible()
          await expect(page.getByText('good blog')).not.toBeVisible()
        })
    })
     describe('and a many blogs exist', () => {
        beforeEach(async ({ page, request }) => {
          await createBlog(page, 'Blog 1', 'first blogger', 'testingtestingtesting.au')
          await createBlog(page, 'Blog 2', 'second blogger', 'testingtestingtesting.fi')
          await createBlog(page, 'Blog 3', 'thir blogger', 'testingtestingtesting.ax')

          


      })
      //not my best work, would not work when i tried to refractor it so this is what im left with, sorry.
      test('blogs are in order by likes', async ({ page }) => {
          await page.waitForTimeout(1000) // needs to wait to make sure all blogs are actually created.

          
          let blogElement = page.locator('.blog').filter({ hasText: 'Blog 1' }).first()
          await blogElement.getByRole('button', { name: 'show' }).click()
          blogElement = page.locator('.blog').filter({ hasText: 'Blog 1' }).first()

          for (let i = 1; i <= 4; i++) {
            await blogElement.getByRole('button', { name: 'like' }).click()
            await expect(blogElement).toContainText(`Likes: ${i}`) //to ensure UI is updated
          }

          let blogElement2 = page.locator('.blog').filter({ hasText: 'Blog 2' }).first()

          await expect(blogElement2.getByRole('button', { name: 'show' })).toBeVisible() //to ensure button is visible
          await blogElement2.getByRole('button', { name: 'show' }).click()
          blogElement2 = page.locator('.blog').filter({ hasText: 'Blog 2' }).first()

          for (let i = 1; i <= 5; i++) {
            await blogElement2.getByRole('button', { name: 'like' }).click()
            await expect(blogElement2).toContainText(`Likes: ${i}`)
          }
        

          let blogElement3 = page.locator('.blog').filter({ hasText: 'Blog 3' }).first()

          await expect(blogElement3.getByRole('button', { name: 'show' })).toBeVisible()
          await blogElement3.getByRole('button', { name: 'show' }).click()

          blogElement3 = page.locator('.blog').filter({ hasText: 'Blog 3' }).first()

          for (let i = 1; i <= 7; i++) {
            blogElement3 = page.locator('.blog').filter({ hasText: 'Blog 3' }).first()
            await blogElement3.getByRole('button', { name: 'like' }).click()
            await expect(blogElement3).toContainText(`Likes: ${i}`)
          }


          const blogs = await page.locator('.blog').allTextContents()
          expect(blogs[0]).toContain('Blog 3') 
          expect(blogs[1]).toContain('Blog 2') 
          expect(blogs[2]).toContain('Blog 1')         
      }) 
    })  
  })  
})


