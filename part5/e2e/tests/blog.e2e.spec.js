const { test, expect } = require('@playwright/test')

const baseUrl = 'http://localhost:5173'
const apiUrl = 'http://localhost:3003/api'

const createUser = async (request, user) => {
  await request.post(`${apiUrl}/users`, {
    data: user
  })
  return user
}

const login = async (page, username, password) => {
  await page.fill('input[name="Username"]', username)
  await page.fill('input[name="Password"]', password)
  await page.click('button[type="submit"]')
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('link', { name: /new blog/i }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('URL').fill(url)
  await page.getByRole('button', { name: /create/i }).click()
  await expect(page.locator('.blog', { hasText: title })).toBeVisible()
}

const blogCard = (page, title) => page.locator('.blog', { hasText: title })

let testUser

test.describe('Blog app', () => {
  test.beforeEach(async ({ request }) => {
    const uniqueId = Date.now()
    testUser = await createUser(request, {
      username: `root${uniqueId}`,
      name: `Superuser ${uniqueId}`,
      password: 'sekret'
    })
  })

  test('Login form is shown', async ({ page }) => {
    await page.goto(baseUrl)
    await expect(page.locator('text=Log in to application')).toBeVisible()
    await expect(page.locator('input[name="Username"]')).toBeVisible()
    await expect(page.locator('input[name="Password"]')).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto(baseUrl)
      await login(page, testUser.username, testUser.password)
      await expect(page.locator(`text=${testUser.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto(baseUrl)
      await login(page, testUser.username, 'wrongpassword')
      await expect(page.locator('.notification.error')).toContainText('Wrong username or password')
      await expect(page.locator(`text=${testUser.name} logged in`)).not.toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(baseUrl)
      await login(page, testUser.username, testUser.password)
      await expect(page.locator(`text=${testUser.name} logged in`)).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      const title = `E2E testing with Playwright ${Date.now()}`
      await createBlog(page, title, 'Playwright', 'http://playwright.dev')
      await expect(blogCard(page, title)).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      const title = `Likeable blog ${Date.now()}`
      await createBlog(page, title, 'Tester', 'http://example.com')
      const blog = blogCard(page, title)
      await expect(blog).toBeVisible()

      await blog.getByRole('button', { name: 'view' }).click()
      await blog.getByRole('button', { name: 'like' }).click()
      await expect(blog).toContainText('likes: 1')
    })

    test('creator can delete their blog', async ({ page }) => {
      const title = `Removable blog ${Date.now()}`
      await createBlog(page, title, 'Remover', 'http://remove.me')
      const blog = blogCard(page, title)
      await expect(blog).toBeVisible()

      await blog.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async dialog => dialog.accept())
      await blog.getByRole('button', { name: 'remove' }).click()
      await expect(blogCard(page, title)).toHaveCount(0)
    })

    test('only creator sees remove button', async ({ page, request }) => {
      const title = `Secret blog ${Date.now()}`
      await createBlog(page, title, 'Creator', 'http://secret.example')
      await expect(blogCard(page, title)).toHaveCount(1)

      await page.getByRole('button', { name: 'Logout' }).click()
      await page.goto(baseUrl)
      const otherUser = await createUser(request, {
        username: `other${Date.now()}`,
        name: 'Other user',
        password: 'password'
      })
      await login(page, otherUser.username, otherUser.password)
      await expect(page.locator(`text=${otherUser.name} logged in`)).toBeVisible()

      const blog = blogCard(page, title)
      await expect(blog).toBeVisible()
      await blog.getByRole('button', { name: 'view' }).click()
      await expect(blog.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })

    test('blogs are ordered by likes descending', async ({ page }) => {
      const leastTitle = `Least liked ${Date.now()}`
      const mostTitle = `Most liked ${Date.now()}`
      await createBlog(page, leastTitle, 'A', 'http://least.example')
      await createBlog(page, mostTitle, 'B', 'http://most.example')

      const mostLikedBlog = blogCard(page, mostTitle)
      await mostLikedBlog.getByRole('button', { name: 'view' }).click()
      await mostLikedBlog.getByRole('button', { name: 'like' }).click()
      await mostLikedBlog.getByRole('button', { name: 'like' }).click()

      await page.reload()
      await expect(page.locator('.blog').first()).toContainText(mostTitle)
    })
  })
})
