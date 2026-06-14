# bKash Web

This is a web application that replicates some of the core functionalities of the bKash mobile app. It is built with Next.js and Tailwind CSS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [pnpm](https://pnpm.io/installation) installed on your machine.

### Installing

1.  Clone the repo
2.  Install the dependencies:
    ```bash
    pnpm install
    ```
3.  Run the development server:
    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows a standard Next.js App Router structure.

-   `src/app`: Contains all the routes and pages of the application.
    -   `src/app/(auth)`: Contains the authentication pages (login, signup).
    -   `src/app/(protected)`: Contains the protected pages that require authentication.
-   `src/components`: Contains all the reusable components.
-   `src/hooks`: Contains custom React hooks.
-   `src/lib`: Contains utility functions and library configurations.
-   `public`: Contains static assets.

## Available Scripts

In the project directory, you can run:

-   `pnpm dev`: Runs the app in the development mode.
-   `pnpm build`: Builds the app for production to the `out` folder.
-   `pnpm start`: Starts a production server.
-   `pnpm lint`: Runs the linter.

## Technologies Used

-   [Next.js](https://nextjs.org/) - React framework for production
-   [React](https://reactjs.org/) - A JavaScript library for building user interfaces
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
-   [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript
-   [shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
-   [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

## Static Export

This project is configured with `output: "export"` in `next.config.ts`. This means that `pnpm build` will generate a static export of the application in the `out` directory. This is ideal for deploying to static hosting services.
