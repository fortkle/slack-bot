import redis from 'botkit-storage-redis'

export default function() {
  return redis({
    url: process.env.REDISCLOUD_URL
  })
}
