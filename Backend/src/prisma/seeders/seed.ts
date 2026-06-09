import "dotenv/config";
import { prisma } from "../../utils/prisma";
import { faker } from "@faker-js/faker";
async function main() {
  const number = 50;
  const data = [];
  for (let i = 0; i < number; i++) {
    data.push({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    });
  }
  await prisma.product.createMany({
    data,
  });
}
main()
  .then((data) => {
    console.log(data);
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
