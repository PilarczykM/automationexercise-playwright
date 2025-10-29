import { faker } from "@faker-js/faker";
import { type AccountInformation, COUNTRIES } from "../POMs/SignupPage";

export type UserData = ReturnType<typeof createUser>;

export function createUser() {
	const gender: "male" | "female" = faker.helpers.arrayElement(["male", "female"]);
	const firstName = faker.person.firstName(gender);
	const lastName = faker.person.lastName();
	const state = faker.location.state({ abbreviated: true });

	return {
		address: faker.location.streetAddress(),
		address2: faker.location.secondaryAddress(),
		city: faker.location.city(),
		company: faker.company.name(),
		country: faker.helpers.arrayElement(Object.values(COUNTRIES)),
		dateOfBirth: faker.date.birthdate({ max: 65, min: 18, mode: "age" }),
		email: faker.internet.email({ firstName, lastName }),
		firstName: firstName,
		lastName: lastName,
		mobileNumber: faker.phone.number(),
		name: `${firstName} ${lastName}`,
		password: faker.internet.password({ length: 12, memorable: false }),
		state: state,
		title: (gender === "male" ? "Mr." : "Mrs.") as AccountInformation["title"],
		zipcode: faker.location.zipCode(state),
	};
}
