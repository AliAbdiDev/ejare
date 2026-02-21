export type MockSearchResult = {
  id: string;
  title: string;
  subtitle: string;
};

const MOCK_SEARCH_ITEMS: MockSearchResult[] = [
  { id: "1", title: "Digital camera", subtitle: "Electronics" },
  { id: "2", title: "Laptop bag", subtitle: "Accessories" },
  { id: "3", title: "Car charger", subtitle: "Vehicle accessories" },
  { id: "4", title: "Smart TV", subtitle: "Home electronics" },
  { id: "5", title: "Wireless headphones", subtitle: "Audio devices" },
  { id: "6", title: "Used bicycle", subtitle: "Sports and outdoors" },
  { id: "7", title: "Phone case", subtitle: "Mobile accessories" },
  { id: "8", title: "Gaming keyboard", subtitle: "Computer accessories" },
  { id: "9", title: "Tablet stand", subtitle: "Office tools" },
  { id: "10", title: "Monitor 24 inch", subtitle: "Computer components" },
  { id: "11", title: "Car audio player", subtitle: "Vehicle audio" },
  { id: "12", title: "Second hand smartphone", subtitle: "Mobile devices" },
];

export const mockSearchApi = async (query: string): Promise<MockSearchResult[]> => {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  await new Promise((resolve) => setTimeout(resolve, 450));

  if (normalizedQuery === "error") {
    throw new Error("Mock API error");
  }

  if (!normalizedQuery) {
    return [];
  }

  return MOCK_SEARCH_ITEMS.filter((item) =>
    [item.title, item.subtitle].some((value) =>
      value.toLocaleLowerCase().includes(normalizedQuery)
    )
  );
};
