// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_PUBLIC_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_PUBLIC_CLIENT_ID,
  // Get this from Tina Cloud
  token: process.env.NEXT_PUBLIC_TINA_TOKEN,
  // Get this from Tina Cloud
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "content/posts/image",
      publicFolder: "public"
    }
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
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Date"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            description: "Format: MainCategory>SubCategory (e.g., Cybersecurity>Osint)"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
