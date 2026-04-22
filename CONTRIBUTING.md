# Contributing to ReactTailwindAccessKit

Thank you for your interest in contributing to ReactTailwindAccessKit!

## Ways to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Create a detailed bug report including:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details

### Suggesting Features

1. Check existing issues and discussions
2. Open a new issue with:
   - Clear feature description
   - Use cases
   - Alternative solutions considered

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Add tests if applicable
5. Ensure tests pass: `npm test`
6. Commit with clear messages
7. Push to your fork
8. Submit a pull request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ReactTailwindAccessKit.git
cd ReactTailwindAccessKit

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Run lint before committing: `npm run lint`
- Add type definitions

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Commit Messages

Use clear, descriptive commit messages:

- `feat: add new dashboard module`
- `fix: resolve authentication bug`
- `docs: update setup guide`
- `refactor: improve role checking logic`

## Pull Request Guidelines

- Keep PRs focused and smaller
- Reference related issues
- Update documentation if needed
- Ensure all tests pass

## Code of Conduct

Be respectful and inclusive. Follow the [Contributor Covenant](https://www.contributor-covenant.org/).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.