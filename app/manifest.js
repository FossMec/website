export default function manifest() {
  return {
    name: "FOSS MEC - Free and Open Source Software Cell",
    short_name: "FOSS MEC",
    description:
      "Official website of FOSS MEC, the Free and Open Source Software Cell of Govt. Model Engineering College, Kochi.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C2444",
    theme_color: "#0C2444",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}