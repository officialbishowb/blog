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
      mediaRoot: "content/posts/images",
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
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            description: "Format: MainCategory>SubCategory (e.g., Cybersecurity>Osint)",
            required: true
          },
          {
            type: "string",
            name: "body",
            label: "Body",
            isBody: true,
            ui: {
              component: "textarea"
            }
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
