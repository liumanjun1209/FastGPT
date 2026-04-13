# --------- install dependence -----------
FROM node:20.14.0-alpine AS maindeps
WORKDIR /app

ARG proxy

RUN [ -z "$proxy" ] || sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk add --no-cache libc6-compat && npm install -g pnpm@9.4.0

COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY ./packages ./packages
COPY ./projects/cc-flow/package.json ./projects/cc-flow/package.json

RUN [ -f pnpm-lock.yaml ] || (echo "Lockfile not found." && exit 1)

RUN if [ -z "$proxy" ]; then \
        pnpm i; \
    else \
        pnpm i --registry=https://registry.npmmirror.com; \
    fi

# --------- builder -----------
FROM node:20.14.0-alpine AS builder
WORKDIR /app

ARG proxy
ARG base_url

COPY package.json pnpm-workspace.yaml .npmrc tsconfig.json ./
COPY --from=maindeps /app/node_modules ./node_modules
COPY --from=maindeps /app/packages ./packages
COPY ./projects/cc-flow ./projects/cc-flow
COPY --from=maindeps /app/projects/cc-flow/node_modules ./projects/cc-flow/node_modules

RUN [ -z "$proxy" ] || sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk add --no-cache libc6-compat && npm install -g pnpm@9.4.0

ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NEXT_PUBLIC_BASE_URL=$base_url
RUN pnpm --filter=cc-flow build

# --------- runner -----------
FROM node:20.14.0-alpine AS runner
WORKDIR /app

ARG base_url

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN apk add --no-cache curl ca-certificates \
  && update-ca-certificates

COPY --from=builder /app/projects/cc-flow/public /app/projects/cc-flow/public
COPY --from=builder /app/projects/cc-flow/next.config.js /app/projects/cc-flow/next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/projects/cc-flow/.next/standalone /app/
COPY --from=builder --chown=nextjs:nodejs /app/projects/cc-flow/.next/static /app/projects/cc-flow/.next/static

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV NEXT_PUBLIC_BASE_URL=$base_url

EXPOSE 3001

USER nextjs

ENV serverPath=./projects/cc-flow/server.js

ENTRYPOINT ["sh","-c","node --max-old-space-size=4096 ${serverPath}"]
