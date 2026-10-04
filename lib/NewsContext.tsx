"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { NewsItem, NewsCategory } from "./types";
import { INITIAL_NEWS } from "./newsData";
import { slugify, calculateReadTime } from "./utils";

interface NewsContextType {
  news: NewsItem[];
  isLoaded: boolean;
  addNews: (data: Omit<NewsItem, "id" | "viewsCount">) => NewsItem;
  updateNews: (id: string, data: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;
  incrementViews: (id: string) => void;
  toggleTrending: (id: string) => void;
  resetToDefault: () => void;
  getNewsBySlug: (slug: string) => NewsItem | undefined;
  getNewsByCategory: (category: NewsCategory) => NewsItem[];
  getTrendingNews: () => NewsItem[];
  getHeadlineNews: () => NewsItem | undefined;
  searchNews: (query: string) => NewsItem[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const STORAGE_KEY = "info_grobogan_news_v1";

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage in browser
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setNews(parsed);
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NEWS));
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NEWS));
      }
    } catch (e) {
      console.warn("Failed to read from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when news state changes
  const saveNews = (updatedList: NewsItem[]) => {
    setNews(updatedList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (e) {
      console.warn("Failed to write to localStorage", e);
    }
  };

  const addNews = (data: Omit<NewsItem, "id" | "viewsCount">): NewsItem => {
    const newItem: NewsItem = {
      ...data,
      id: `grob-${Date.now()}`,
      slug: data.slug || slugify(data.title),
      viewsCount: 0,
      readTime: data.readTime || calculateReadTime(data.content),
      publishedAt: data.publishedAt || new Date().toISOString(),
    };

    const updated = [newItem, ...news];
    saveNews(updated);
    return newItem;
  };

  const updateNews = (id: string, data: Partial<NewsItem>) => {
    const updated = news.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, ...data };
        if (data.title && !data.slug) {
          updatedItem.slug = slugify(data.title);
        }
        if (data.content) {
          updatedItem.readTime = calculateReadTime(data.content);
        }
        return updatedItem;
      }
      return item;
    });
    saveNews(updated);
  };

  const deleteNews = (id: string) => {
    const updated = news.filter((item) => item.id !== id);
    saveNews(updated);
  };

  const incrementViews = (id: string) => {
    setNews((prevNews) => {
      const updated = prevNews.map((item) =>
        item.id === id ? { ...item, viewsCount: (item.viewsCount || 0) + 1 } : item
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const toggleTrending = (id: string) => {
    const updated = news.map((item) =>
      item.id === id ? { ...item, isTrending: !item.isTrending } : item
    );
    saveNews(updated);
  };

  const resetToDefault = () => {
    saveNews(INITIAL_NEWS);
  };

  const getNewsBySlug = (slug: string) => {
    return news.find((item) => item.slug === slug);
  };

  const getNewsByCategory = (category: NewsCategory) => {
    return news.filter((item) => item.category === category);
  };

  const getTrendingNews = () => {
    return [...news]
      .sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0))
      .slice(0, 5);
  };

  const getHeadlineNews = () => {
    return news.find((item) => item.isHeadline) || news[0];
  };

  const searchNews = (query: string) => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return news.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q)
    );
  };

  return (
    <NewsContext.Provider
      value={{
        news,
        isLoaded,
        addNews,
        updateNews,
        deleteNews,
        incrementViews,
        toggleTrending,
        resetToDefault,
        getNewsBySlug,
        getNewsByCategory,
        getTrendingNews,
        getHeadlineNews,
        searchNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
