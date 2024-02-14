import { AuthenticationType, UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeKey() {
  return {
    primaryKey: faker.lorem.words(5),
    secondaryKey: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeKeyComplete() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    primaryKey: faker.lorem.words(5),
    secondaryKey: faker.lorem.words(5),
    status: true,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeRole() {
  return {
    role: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeRoleComplete() {
  return {
    id: faker.string.uuid(),
    role: faker.lorem.words(5),
    status: true,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: undefined,
    email: faker.internet.email(),
    gender: undefined,
    avatar: undefined,
    coverImage: undefined,
    password: undefined,
    country: undefined,
    language: undefined,
    subscriptionStatus: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: undefined,
    email: faker.internet.email(),
    gender: undefined,
    emailVerified: false,
    avatar: undefined,
    coverImage: undefined,
    genreId: undefined,
    password: undefined,
    country: undefined,
    language: undefined,
    roleId: faker.string.uuid(),
    subscriptionPlanId: undefined,
    subscriptionStatus: undefined,
  };
}
export function fakeGenre() {
  return {
    slug: faker.lorem.words(5),
    genreName: faker.lorem.words(5),
    genreImage: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeGenreComplete() {
  return {
    id: faker.string.uuid(),
    slug: faker.lorem.words(5),
    genreName: faker.lorem.words(5),
    genreImage: faker.lorem.words(5),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakePodcast() {
  return {
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
    thumbnail: faker.lorem.words(5),
    audio: faker.lorem.words(5),
  };
}
export function fakePodcastComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: faker.lorem.words(5),
    thumbnail: faker.lorem.words(5),
    audio: faker.lorem.words(5),
    language: 'english',
    isPremium: false,
    genreId: faker.string.uuid(),
    authorId: faker.string.uuid(),
    royaltyAmount: 0,
  };
}
export function fakeListenHistoryComplete() {
  return {
    id: faker.string.uuid(),
    podcastId: faker.string.uuid(),
    userId: faker.string.uuid(),
    viewedAt: new Date(),
  };
}
export function fakeSubscriptionPlan() {
  return {
    plan: faker.lorem.words(5),
    price: faker.number.float(),
    duration: faker.number.int(),
  };
}
export function fakeSubscriptionPlanComplete() {
  return {
    id: faker.string.uuid(),
    plan: faker.lorem.words(5),
    price: faker.number.float(),
    duration: faker.number.int(),
  };
}
export function fakeEmailSeetingComplete() {
  return {
    id: faker.string.uuid(),
    promotionalEmail: true,
    securityEmail: true,
    userId: faker.string.uuid(),
  };
}
