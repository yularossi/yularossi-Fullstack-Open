const { test, expect } = require('@playwright/test')

const baseUrl = 'http://localhost:5173'
const apiUrl = 'http://localhost:3003/api'

const resetDatabase = async (request) => {
  await request.post(`${apiUrl}/testing/reset`)
}

const createUser = async (request, user) => {
  await request.post(`${apiUrl}/users`, {
    data: user
  })
}

const login = async (page, username, password) => {
  await page.fill('input[name="Username"]', username)
  await page.fill('input[name="Password"]', password)
  await page.click('button[type="submit"]')
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create a new blog' }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill(author)
  await page.getByLabel('URL').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await expect(page.locator('.blog', { hasText: title })).toBeVisible()
}

const blogCard = (page, title) => page.locator('.blog', { hasText: title })

test.describe('Blog app', () => {
  test.beforeEach(async ({ request }) => {
    await resetDatabase(request)
    await createUser(request, {
      username: 'root',
      name: 'Superuser',
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
      await login(page, 'root', 'sekret')
      await expect(page.locator('text=Superuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto(baseUrl)
      await login(page, 'root', 'wrongpassword')
      await expect(page.locator('.notification.error')).toContainText('Wrong username or password')
      await expect(page.locator('text=Superuser logged in')).not.toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(baseUrl)
      await login(page, 'root', 'sekret')
      await expect(page.locator('text=Superuser logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'E2E testing with Playwright', 'Playwright', 'http://playwright.dev')
      await expect(blogCard(page, 'E2E testing with Playwright')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'Likeable blog', 'Tester', 'http://example.com')
      const blog = blogCard(page, 'Likeable blog')
      await expect(blog).toBeVisible()

      await blog.getByRole('button', { name: 'view' }).click()
      await blog.getByRole('button', { name: 'like' }).click()
      await expect(blog).toContainText('likes: 1')
    })

    test('creator can delete their blog', async ({ page }) => {
      await createBlog(page, 'Removable blog', 'Remover', 'http://remove.me')
      const blog = blogCard(page, 'Removable blog')
      await expect(blog).toBeVisible()

      await blog.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async dialog => dialog.accept())
      await blog.getByRole('button', { name: 'remove' }).click()
      await expect(blogCard(page, 'Removable blog')).toHaveCount(0)
    })

    test('only creator sees remove button', async ({ page, request }) => {
      await createBlog(page, 'Secret blog', 'Creator', 'http://secret.example')
      await expect(blogCard(page, 'Secret blog')).toHaveCount(1)

      await page.getByRole('button', { name: 'logout' }).click()
      await page.goto(baseUrl)
      await createUser(request, {
        username: 'other',
        name: 'Other user',
        password: 'password'
      })
      await login(page, 'other', 'password')
      await expect(page.locator('text=Other user logged in')).toBeVisible()

      const blog = blogCard(page, 'Secret blog')
      await expect(blog).toBeVisible()
      await blog.getByRole('button', { name: 'view' }).click()
      await expect(blog.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })

    test('blogs are ordered by likes descending', async ({ page }) => {
      await createBlog(page, 'Least liked', 'A', 'http://least.example')
      await createBlog(page, 'Most liked', 'B', 'http://most.example')

      const mostLikedBlog = blogCard(page, 'Most liked')
      await mostLikedBlog.getByRole('button', { name: 'view' }).click()
      await mostLikedBlog.getByRole('button', { name: 'like' }).click()
      await mostLikedBlog.getByRole('button', { name: 'like' }).click()

      await page.reload()
      await expect(page.locator('.blog').first()).toContainText('Most liked')
    })
  })
})
