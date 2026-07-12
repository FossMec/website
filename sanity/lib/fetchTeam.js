import { client } from "./client";

export async function fetchTeamYears() {
  const data = await client.fetch(`
    *[_type == "teamYear"] | order(year desc) {
      year,
      title,
      members[] {
        name,
        position,
        image,
        linkedin,
        github
      }
    }
  `);
  return data || [];
}
