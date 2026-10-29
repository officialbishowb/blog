FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lock ./
# tinacms pulls in better-sqlite3 (native build); the site never uses it
RUN bun install --frozen-lockfile --ignore-scripts
COPY . .
# tinacms build needs Tina Cloud credentials; NEXT_PUBLIC_* are also inlined by next build
ARG NEXT_PUBLIC_TINA_PUBLIC_CLIENT_ID
ARG NEXT_PUBLIC_TINA_TOKEN
ARG NEXT_PUBLIC_TINA_PUBLIC_BRANCH=main
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_TINA_PUBLIC_CLIENT_ID=$NEXT_PUBLIC_TINA_PUBLIC_CLIENT_ID \
    NEXT_PUBLIC_TINA_CLIENT_ID=$NEXT_PUBLIC_TINA_PUBLIC_CLIENT_ID \
    NEXT_PUBLIC_TINA_TOKEN=$NEXT_PUBLIC_TINA_TOKEN \
    NEXT_PUBLIC_TINA_PUBLIC_BRANCH=$NEXT_PUBLIC_TINA_PUBLIC_BRANCH
# builds the admin UI into public/admin, then the Next.js app
RUN bun run tina:build

FROM oven/bun:1-slim
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build --chown=bun:bun /app/.next/standalone ./
COPY --from=build --chown=bun:bun /app/.next/static ./.next/static
COPY --from=build --chown=bun:bun /app/public ./public
# category pages read markdown at request time
COPY --from=build --chown=bun:bun /app/content ./content
USER bun
EXPOSE 3000
CMD ["bun", "server.js"]
