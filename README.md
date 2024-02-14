# Playwright API Testing Framework

This Playwright API Testing Framework is designed to automate API testing scenarios using Playwright in a TypeScript environment. The framework showcases how to leverage Playwright for comprehensive testing coverage, including interactions with web storage, handling authentication, and performing operations against both Conduit's real-world application and GitHub's APIs.

## Features

- **Conduit Application Testing**: Automate user authentication, article publication, and verification through both API and UI layers.
- **GitHub API Integration**: Perform operations like creating repositories, issues, and handling repository deletion through GitHub's API.
- **Authentication Handling**: Manage authentication states for testing by utilizing JSON files and environment variables for storing sensitive data.
- **Cross-Origin Handling**: Demonstrates handling of local storage across different origins.

## Project Structure

- `/.auth/` - Contains JSON files (`api-user.json`, `ui-user.json`) for storing/generating authentication tokens and states.
- `/controller/` - Houses the `ConduitController` and `GitHubController` for managing API requests.
- `/src/pages/` - Contains page objects for UI interactions, like `ConduitPage`.
- `/src/tests/` - Includes test specifications (`conduit.api.spec.ts`, `github.api.spec.ts`) and setup files for API and UI authentication states.

## Getting Started

### Prerequisites

- Node.js
- A valid Conduit account and a GitHub account with generated personal access tokens.

### Installation

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install` in the project root directory.
3. Configure the `.env` file at the root of your project with your Conduit and GitHub credentials:

```env
CONDUIT_EMAIL=<your_email>
CONDUIT_PASSWORD=<your_password>
GITHUB_TOKEN=<your_github_token>


## Getting Started

### Installation

1. Clone the repository to your local machine:

```bash
git clone <repo url>
```

2. Clone the repository to your local machine:
```bash
cd playwright-api-testing
```

3. Modify .auth/api-user.json or .auth/ui-user.json files to include your actual Conduit JWT tokens (this must be manually extracted from Chrome dev console).

4. Running Tests
To run Conduit related tests, execute npm run test-conduit.
To perform GitHub API tests, use npm run test-github.
To generate and view an allure report of the test run, execute npm run allure.