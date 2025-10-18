import { getAds } from "./ads"
import { saveToStorage, loadFromStorage } from "@/utils/storage"
import { STORAGE_KEYS } from "@/constants"
import type { AdModel, Comment, SearchFilters } from "./model"

export function filterAds({
  query,
  country,
  type,
  minPrice,
  maxPrice,
  rating,
}: SearchFilters): AdModel[] {
  let ads = getAds()

  if (query) ads = ads.filter(ad => ad.title.toLowerCase().includes(query.toLowerCase()))
  if (country) ads = ads.filter(ad => ad.country === country)
  if (type) ads = ads.filter(ad => ad.type === type)
  if (minPrice) ads = ads.filter(ad => ad.price >= minPrice)
  if (maxPrice) ads = ads.filter(ad => ad.price <= maxPrice)
  if (rating) ads = ads.filter(ad => ad.rating >= rating)

  return ads
}

export function addComment(adId: string, commentText: string, author: string = 'User'): void {
  const ads = getAds()
  const ad = ads.find(a => a.id === adId)
  if (!ad) return

  const comment: Comment = {
    id: crypto.randomUUID(),
    text: commentText,
    author,
    createdAt: new Date()
  }

  ad.comments.push(comment)
  saveToStorage(STORAGE_KEYS.ADS_DATA, ads)
}

export function getUserLikedAds(): string[] {
  return loadFromStorage<string[]>(STORAGE_KEYS.USER_LIKED_ADS) || []
}

export function isLiked(adId: string): boolean {
  const likedAds = getUserLikedAds()
  return likedAds.includes(adId)
}

export function toggleLike(adId: string): void {
  const ads = getAds()
  const ad = ads.find(a => a.id === adId)
  if (!ad) return

  let likedAds = getUserLikedAds()

  if (likedAds.includes(adId)) {
    ad.likes = Math.max(0, (ad.likes || 0) - 1)
    likedAds = likedAds.filter(id => id !== adId)
  } else {
    ad.likes = (ad.likes || 0) + 1
    likedAds.push(adId)
  }

  saveToStorage(STORAGE_KEYS.ADS_DATA, ads)
  saveToStorage(STORAGE_KEYS.USER_LIKED_ADS, likedAds)
}
