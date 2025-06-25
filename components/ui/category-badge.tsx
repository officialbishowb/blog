"use client"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Category } from "@/lib/blog-utils"
import { ArrowRightFromLine } from "lucide-react"

interface CategoryBadgeProps {
  category: Category
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const formatCategoryName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const truncateText = (text: string, maxLength: number = 15) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-1">
        <Link
          href={`/blog/category/${category.main}`}
          className="bg-accent-color/10 hover:bg-accent-color/20 text-primary cursor-pointer rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors whitespace-nowrap"
        >
          {truncateText(formatCategoryName(category.main))}
        </Link>
        {category.sub && (
          <>
            <ArrowRightFromLine className="w-4 h-4" />
            <Link
              href={`/blog/category/${category.main}/${category.sub}`}
              className="bg-accent-color/10 hover:bg-accent-color/20 text-primary cursor-pointer rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors whitespace-nowrap"
            >
              {truncateText(formatCategoryName(category.sub))}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}