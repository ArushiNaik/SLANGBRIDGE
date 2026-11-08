# SLANGBRIDGE

A clean and engaging web app that helps older generations understand modern slang through simple definitions, examples, and interactive learning.

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java" alt="Java 17" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Spring%20Boot-4.0.1-6DB33F?style=for-the-badge&logo=springboot" alt="Spring Boot 4" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
</p>

## Overview

Modern slang can feel like a different language. SLANGBRIDGE exists to bridge that gap by helping users understand popular expressions in a way that is easy, relatable, and fun.

Whether it is a message, a meme, or a TikTok comment, this app helps people quickly decode the meaning behind the words.

## Why this project matters

Language evolves fast, and many people feel left behind by terms that spread quickly online. SLANGBRIDGE provides:

- clear definitions
- everyday examples
- a simple and friendly interface
- interactive learning through games
- a more approachable way to understand modern vocabulary

## Features

- Search slang terms and get instant meanings
- View example usage in context
- Discover a random slang word for quick learning
- Play a matching game to reinforce vocabulary
- Toggle dark mode for a comfortable experience
- Clean responsive UI for desktop and mobile devices

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Framer Motion
- CSS

### Backend
- Java 17
- Spring Boot
- H2 Database

## Project Structure

```bash
SLANGBRIDGE/
├── backend/
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
├── slangbridge-frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── README.md
├── README.md
├── package-lock.json
└── .idea/
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Java 17+
- Maven
- Node.js and npm

### Run the backend

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

The backend will run at:

```bash
http://localhost:8080
```

### Run the frontend

```bash
cd slangbridge-frontend
npm install
npm run dev
```

Then open:

```bash
http://localhost:5173
```

## How it works

The frontend sends requests to the backend API, which returns slang definitions and examples. Users can search for specific terms, explore random words, and play the matching game to make learning more engaging.

## Mission

SLANGBRIDGE is built to help people connect across generations by making modern language easier to understand and more fun to learn.

## Contributing

Contributions are welcome. You can help by:

- improving the slang database
- enhancing the UI and UX
- adding more learning features
- fixing bugs and improving accessibility

## License

This project does not currently specify a license.

---

Built to make communication clearer, one slang word at a time.
