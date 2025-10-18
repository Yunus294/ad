import { faker } from '@faker-js/faker'
import { saveToStorage, loadFromStorage } from '@/utils/storage'
import { STORAGE_KEYS, AD_TYPES, PRICE_RANGE, RATING_RANGE } from '@/constants'
import type { AdModel, AdType, Comment } from './model'

export function generateAds(count = 30): AdModel[] {
  const ads: AdModel[] = []
  for (let i = 0; i < count; i++) {
    ads.push({
      id: faker.string.uuid(),
      title: faker.location.city(),
      country: faker.location.country(),
      city: faker.location.city(),
      price: faker.number.int({ min: PRICE_RANGE.MIN, max: PRICE_RANGE.MAX }),
      rating: faker.number.float({ min: RATING_RANGE.MIN, max: RATING_RANGE.MAX, fractionDigits: 1 }),
      type: faker.helpers.arrayElement(AD_TYPES),
      image: `https://picsum.photos/seed/${faker.string.uuid()}/800/480`,
      comments: [],
      likes: 0
    })
  }
  return ads
}

export function getAds(): AdModel[] {
  let data = loadFromStorage<AdModel[]>(STORAGE_KEYS.ADS_DATA)
  if (!data) {
    data = generateAds()
    saveToStorage(STORAGE_KEYS.ADS_DATA, data)
  }
  return data
}


