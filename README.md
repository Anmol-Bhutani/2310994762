# Afford Medical Technologies - Frontend Evaluation

This project is a notification management system designed for Afford Medical Technologies. The dashboard centralizes campus alerts, results, and placement notifications into a single, intuitive interface with a custom prioritization engine.

## Demo Video
You can watch the full demonstration of the application here:
[Demo Video Link](https://drive.google.com/file/d/1lTm7aOokdJbqHjcn23GYzYAC4M9bjym7/view?usp=sharing)

## Features

- **Dashboard Interface:** A professional dashboard using Material UI and Next.js with custom styling.
- **Priority Scoring:** A specialized "Priority Inbox" that automatically sorts notifications based on their importance and recency.
- **Category Filtering:** Ability to filter notifications by Placement, Result, and Event categories.
- **API Integration:** Server-side proxy handling for secure authentication and reliable data fetching.
- **Logging System:** Integration of a mandatory logging middleware to track application events.

## Technical Implementation

- **Next.js 15:** Utilizing the App Router and modern React patterns.
- **Material UI:** Used for the core design system and layouts.
- **Framer Motion:** Added for smooth page transitions and list animations.
- **Local Proxy:** A Next.js API route handles communication with the assessment server to manage tokens and avoid CORS issues.

## Setup and Installation

1. Clone the repository and navigate to the project root.
2. Run `node setup.js` to initialize the authentication credentials.
3. Move into the `notification_app_fe` directory.
4. Run `npm install` to install dependencies.
5. Run `npm run dev` to start the local development server.
6. The application will be available at http://localhost:3000.

## Project Structure
- **/Demo Video:** Local copy of the demonstration recording.
- **/Screenshots:** UI captures of the final implementation.
- **/notification_app_fe:** The Next.js frontend application.
- **/logging_middleware:** The custom logging package.

---
Submitted by Anmol Bhutani
