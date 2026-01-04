import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_PUBLIC_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_PUBLIC_CLIENT_ID!, // Get this from Tina Cloud
  token: process.env.NEXT_PUBLIC_TINA_TOKEN!, // Get this from Tina Cloud
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "content/posts/images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Posts",
        name: "post",
        path: "content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            description: "Format: MainCategory>SubCategory (e.g., Cybersecurity>Osint)",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            description: "Author name for the post",
          },
          {
            type: "string",
            name: "keywords",
            label: "Keywords",
            description: "Comma-separated keywords for SEO (e.g., 'seo, blogging, tips')",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            description: "Comma-separated tags for categorization (e.g., 'productivity, habits, self-improvement')",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            description: "Open Graph image for social media sharing (e.g., /assets/posts/images/image.png)",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
            ui: {
              component: "textarea",
            },
            required: true,
          },
        ],
      },
    ],
  },
}); 