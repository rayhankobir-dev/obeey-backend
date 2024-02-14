import { faker } from "@faker-js/faker";
import Decimal from "decimal.js";

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
    profileImageURL: undefined,
    password: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: undefined,
    email: faker.internet.email(),
    emailVerified: false,
    profileImageURL: undefined,
    password: undefined,
    roleId: faker.string.uuid(),
  };
}
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
