import Redis from 'ioredis'

const client = new Redis()

client.on('SIGINT', () => {
    client.quit()
})

export default client

