"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const POSTS_PER_PAGE = 6;

interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  slug: string;
}

interface DaftarArtikelSectionProps {
  blogPosts: BlogPostItem[];
}

export default function DaftarArtikelSection({ blogPosts }: DaftarArtikelSectionProps) {
  const categories = useMemo(
    () => ["Semua", ...Array.from(new Set(blogPosts.map((p) => p.category)))],
    [blogPosts]
  );

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(
    () =>
      activeCategory === "Semua"
        ? blogPosts
        : blogPosts.filter((p) => p.category === activeCategory),
    [activeCategory, blogPosts]
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(
    () =>
      filteredPosts.slice(
        currentPage * POSTS_PER_PAGE,
        (currentPage + 1) * POSTS_PER_PAGE
      ),
    [filteredPosts, currentPage]
  );

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(0);
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(page);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  const startItem = currentPage * POSTS_PER_PAGE + 1;
  const endItem = Math.min(
    (currentPage + 1) * POSTS_PER_PAGE,
    filteredPosts.length
  );

  return (
    <div className="mt-12 sm:mt-20" ref={sectionRef}>
      <FadeIn>
        <h2 className="font-heading text-[28px] sm:text-[34px] font-bold text-dark mb-4 sm:mb-6">
          Daftar Artikel
        </h2>
      </FadeIn>

      {/* Category Filter Pills */}
      <FadeIn delay={0.1}>
        <div className="relative mb-6 sm:mb-10">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-brand text-white shadow-md"
                      : "bg-light-brand text-brand hover:bg-light-brand2"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* Right fade indicator */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {paginatedPosts.map((post, i) => (
          <FadeIn key={post.id} delay={i * 0.1}>
            <Link href={`/artikel/${post.slug}`} className="group block border border-gray-200 rounded-[20px] p-4 hover:border-brand-light transition-all duration-300">
              <div className="relative overflow-hidden rounded-[16px] aspect-[4/3] mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="text-brand text-[13px] font-semibold uppercase tracking-wider">
                {post.category}
              </span>
              <h3 className="font-heading text-[17px] sm:text-[20px] font-bold text-dark leading-[1.4] mt-2 mb-3 group-hover:text-brand transition-colors">
                {post.title}
              </h3>
              <p className="text-[15px] text-text-gray leading-[1.625] line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-[13px] text-text-gray">
                <div className="w-8 h-8 rounded-full bg-brand-light/40 flex items-center justify-center text-brand font-bold text-[12px]">
                  {post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="font-medium text-dark">{post.author}</span>
                <span className="w-1 h-1 rounded-full bg-text-gray" />
                <span>{post.readTime}</span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 gap-4">
          <p className="text-[14px] text-text-gray text-center sm:text-left">
            Menampilkan{" "}
            <span className="font-semibold text-dark">
              {startItem}–{endItem}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-dark">
              {filteredPosts.length}
            </span>{" "}
            artikel
          </p>

          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-light-brand text-brand hover:bg-light-brand2 disabled:hover:bg-light-brand"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold transition-all duration-300 cursor-pointer ${
                  currentPage === i
                    ? "bg-brand text-white shadow-md"
                    : "text-brand hover:bg-light-brand"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-light-brand text-brand hover:bg-light-brand2 disabled:hover:bg-light-brand"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
