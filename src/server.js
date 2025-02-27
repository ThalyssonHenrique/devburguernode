import app from './app'

const port = 3004

app.listen({ port }, () => {
  console.log(`† Server is running on port ${port} †`)
})
