export const categories = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Breakfast" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Lunch" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Dinner" },
];

export function getCategories() {
  return categories.filter((c) => c);
}
