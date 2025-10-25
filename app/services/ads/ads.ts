import { faker } from "@faker-js/faker";
import { saveToStorage, loadFromStorage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/constants";
import type { AdModel } from "./model";

export function generateAds(count = 30): AdModel[] {
  const ads: AdModel[] = [];

  for (let i = 0; i < count; i++) {
    const startDate = faker.date.future();
    const endDate = new Date(
      startDate.getTime() +
        faker.number.int({ min: 1, max: 7 }) * 24 * 60 * 60 * 1000
    );

    ads.push({
      id: faker.string.uuid(),
      title: faker.commerce.productName(),
      description: faker.lorem.sentence(),
      city: faker.location.city(),
      author: {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      },
      priority: faker.number.int({ min: 1, max: 9 }),
      rating: faker.number.int({ min: 1, max: 5 }),
      startDate: startDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      }),
      endDate: endDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      }),
      duration: `${faker.number.int({ min: 1, max: 7 })} days`,
      category: faker.commerce.department(),
      image: faker.image.urlPicsumPhotos({ width: 800, height: 480 }),
      comments: [],
      likes: faker.number.int({ min: 0, max: 50 }),
      price: faker.number.int({ min: 5, max: 500 }),
      type: faker.helpers.arrayElement(["offer", "request"]),
      country: faker.location.country(),
    });
  }

  return ads;
}

export function getAds(): AdModel[] {
  let data = loadFromStorage<AdModel[]>(STORAGE_KEYS.ADS_DATA);
  if (!data) {
    data = generateAds();
    saveToStorage(STORAGE_KEYS.ADS_DATA, data);
  }

  data = data.map((ad) => {
    if (!ad.author) {
      ad.author = {
        name: faker.person.fullName(),
        avatar: faker.image.avatar(),
      };
    }
    if (!ad.priority) {
      ad.priority = faker.number.int({ min: 1, max: 9 });
    }
    if (!ad.startDate) {
      const startDate = faker.date.future();
      ad.startDate = startDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });
    }
    if (!ad.endDate) {
      const endDate = new Date(
        Date.now() + faker.number.int({ min: 1, max: 7 }) * 24 * 60 * 60 * 1000
      );
      ad.endDate = endDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      });
    }
    if (!ad.duration) {
      ad.duration = `${faker.number.int({ min: 1, max: 7 })} days`;
    }
    if (!ad.category) {
      ad.category = faker.commerce.department();
    }

    return ad;
  });

  return data;
}
