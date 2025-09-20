# laravel-12-react-crud-app

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Charlesbasis/laravel-12-react-crud-app/main.yml?branch=main)]()

<!-- TODO: Add description -->

## Table of Contents

- [Features](#features)
- [Tech Stack / Key Dependencies](#tech-stack--key-dependencies)
- [File Structure Overview](#file-structure-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage / Getting Started](#usage--getting-started)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Author/Acknowledgements](#authoracknowledgements)
- [Contact](#contact)

<!-- TODO: Add screenshots if applicable -->

## Features

This application provides a CRUD (Create, Read, Update, Delete) interface built using Laravel 12 and React. Key features include:

-   Modern UI built with React and Radix UI components.
-   Backend API powered by Laravel.
-   Uses Vite for fast build times.
-   Includes linting, formatting, and type checking.

## Tech Stack / Key Dependencies

-   **Backend:** PHP, Laravel
-   **Frontend:** JavaScript, TypeScript, React
-   **UI Library:** Radix UI, Headless UI
-   **Styling:** Tailwind CSS, tailwindcss-animate
-   **Other Dependencies:** Inertia.js, lucide-react, next-themes, sonner

## File Structure Overview

```text
.
├── .editorconfig
├── .env.example
├── .gitattributes
├── .github
├── .gitignore
├── .prettierignore
├── .prettierrc
├── app
├── artisan
├── bootstrap
├── components.json
├── composer.json
├── composer.lock
├── config
├── database
├── eslint.config.js
├── laravel
├── package-lock.json
├── package.json
├── phpunit.xml
├── public
├── resources
├── routes
├── storage
├── tests
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Prerequisites

-   PHP >= 8.1
-   Composer
-   Node.js >= 18
-   npm or yarn

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Charlesbasis/laravel-12-react-crud-app.git
    cd laravel-12-react-crud-app
    ```
2.  Install PHP dependencies:
    ```bash
    composer install
    ```
3.  Install JavaScript dependencies:
    ```bash
    npm install
    ```
4.  Create a copy of the `.env.example` file and rename it to `.env`:
    ```bash
    cp .env.example .env
    ```
5.  Generate an application key:
    ```bash
    php artisan key:generate
    ```
6.  Configure your database connection in the `.env` file.
7.  Run database migrations:
    ```bash
    php artisan migrate
    ```

## Usage / Getting Started

1.  Start the development server:
    ```bash
    npm run dev
    ```

2.  Build the project:

    ```bash
    npm run build
    ```

<!-- TODO: Add more detailed usage instructions -->

## Configuration

Configuration is primarily managed through the `.env` file. You can configure database connections, API keys, and other environment-specific settings there.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Distributed under the MIT License. See `LICENSE` file for more information.

## Author/Acknowledgements

<!-- TODO: Add author from package.json if available -->

## Contact

Your Name - Charles - info@cvhowlader.com
