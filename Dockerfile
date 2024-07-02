# Dockerfile
FROM node:18.14.0
# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the entire project to the working directory
COPY . .

# Build the Next.js application for production
RUN pnpm run build
# Set the environment variable to run the Next.js application in production mode
ENV DATABASE_URL=postgresql://lets-move-be_owner:RIGmuZoJ8S7Q@ep-shrill-dew-a4i504n9.us-east-1.aws.neon.tech/lets-move-be?sslmode=require
ENV TOKEN_SECRET=e56623570e0a0152989fd38e13da9cd6eb7031e4e039e939ba845167ee59b496
ENV BUNDLER_URL=https://bundler.biconomy.io/api/v2/80002/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44
ENV PAYMASTER_URL=https://paymaster.biconomy.io/api/v1/80002/rwVwmc_KC.54aefb59-b033-465e-a952-2b3976ba5df4
ENV PAYMASTER_API_KEY=rwVwmc_KC.54aefb59-b033-465e-a952-2b3976ba5df4
ENV OWNER_PK=3be0510293ce3f421cf8c815540c9445689e77dc60c61a3910c0361efa0fd4bd
ENV OWNER_ADDRESS=0xCC3D7Eb9a9671B1D2bC1830A2e263A364f95AFBf
ENV RPC_URL=https://polygon-amoy.g.alchemy.com/v2/reDkrw-FC5a9yf-zq_eKtFH-QpBxPyv1
ENV PORT=3000

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]