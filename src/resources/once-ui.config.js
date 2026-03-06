import { Geist, Geist_Mono } from "next/font/google";

const baseURL = "http://localhost:4000";

const heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Geist({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts = { heading, body, label, code };

export const themes = {
  demo1: {
    theme: "light",
    neutral: "slate",
    brand: "green",
    accent: "emerald",
    solid: "contrast",
    solidStyle: "flat",
    border: "conservative",
    surface: "filled",
    transition: "all",
    scaling: "100",
  },
  demo2: {
    theme: "dark",
    neutral: "gray",
    brand: "yellow",
    accent: "orange",
    solid: "color",
    solidStyle: "plastic",
    border: "playful",
    surface: "translucent",
    transition: "all",
    scaling: "105",
  },
  demo3: {
    theme: "light",
    neutral: "sand",
    brand: "orange",
    accent: "yellow",
    solid: "contrast",
    solidStyle: "flat",
    border: "conservative",
    surface: "filled",
    transition: "micro",
    scaling: "95",
  },
};

export { baseURL, fonts };
