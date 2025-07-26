# Contributing to NearZen Framework

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support the project and show your appreciation, which we would also be very happy about:
> - Star the project ⭐
> - Tweet about it 🐦
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues
> - Use NearZen to start your own regional NEAR hub

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Enhancements](#suggesting-enhancements)
- [Your First Code Contribution](#your-first-code-contribution)
- [Improving The Documentation](#improving-the-documentation)
- [Adding Regional Templates](#adding-regional-templates)
- [Contributing Hub Case Studies](#contributing-hub-case-studies)
- [Styleguides](#styleguides)
- [Commit Messages](#commit-messages)
- [Join The Project Team](#join-the-project-team)

## Code of Conduct

This project and everyone participating in it is governed by the [NearZen Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [...].

## I Have a Question

> If you want to ask a question, we assume that you have read the available [Documentation](docs/).

Before you ask a question, it is best to search for existing [Issues](../../issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

- Open an [Issue](../../issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to investigate carefully, collect information and describe the issue in detail in your report. Please complete the following steps in advance to help us fix any potential bug as fast as possible.

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side.
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](../../issues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to [...].

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

- Open an [Issue](../../issues/new).
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to recreate the issue on their own.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such as `critical`).

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for NearZen, **including completely new features and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community to understand your suggestion and find related suggestions.

#### Before Submitting an Enhancement

- Make sure that you are using the latest version.
- Read the [documentation](docs/) carefully and find out if the functionality is already covered, maybe by an individual configuration.
- Perform a [search](../../issues) to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project.

#### How Do I Submit a Good Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](../../issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to.
- **Explain why this enhancement would be useful** to most NearZen users. You may also want to point out the other projects that solved it better and which could serve as inspiration.

### Your First Code Contribution

Unsure where to begin contributing to NearZen? You can start by looking through these `beginner` and `help-wanted` issues:

- [Beginner issues](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) - issues which should only require a few lines of code, and a test or two.
- [Help wanted issues](../../issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

### Improving The Documentation

Documentation is crucial for helping users understand and adopt NearZen. We welcome contributions to:

- Getting started guides
- API documentation
- Hub setup tutorials
- Best practices guides
- Translation to other languages

Documentation files are located in the `docs/` directory and are written in MDX format.

### Adding Regional Templates

We encourage regional adaptations and localized templates:

1. **Create a new folder** in `templates/` with your region identifier (e.g., `templates/africa/`, `templates/latam/`)
2. **Include localized content** such as:
   - Governance structures adapted to local regulations
   - Event formats popular in your region
   - Communication templates in local languages
   - Cultural considerations and best practices
3. **Add documentation** explaining the regional adaptations
4. **Test with local communities** before submitting

### Contributing Hub Case Studies

Share your real-world NearZen implementation experiences:

1. **Document your journey** in `examples/case-studies/`
2. **Include metrics and outcomes** from your hub activities
3. **Share challenges and solutions** to help other regions
4. **Provide contact information** for follow-up questions from the community

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 `:art:` when improving the format/structure of the code
  - 🐎 `:racehorse:` when improving performance
  - 📝 `:memo:` when writing docs
  - 🐛 `:bug:` when fixing a bug
  - 🔥 `:fire:` when removing code or files
  - 💚 `:green_heart:` when fixing the CI build
  - ✅ `:white_check_mark:` when adding tests
  - 🔒 `:lock:` when dealing with security
  - ⬆️ `:arrow_up:` when upgrading dependencies
  - ⬇️ `:arrow_down:` when downgrading dependencies
  - 👕 `:shirt:` when removing linter warnings

### JavaScript/TypeScript Styleguide

All JavaScript/TypeScript code is linted with [ESLint](https://eslint.org/) and formatted with [Prettier](https://prettier.io/).

- Use semicolons
- 2 spaces for indentation
- Use single quotes for strings
- Always use `const` or `let`, never `var`
- Use meaningful variable names
- Add JSDoc comments for functions and classes
- Follow the existing patterns in the codebase

### Documentation Styleguide

- Use [MDX](https://mdxjs.com/) for documentation files
- Use meaningful filenames (kebab-case)
- Include a table of contents for longer documents
- Use code blocks with appropriate language syntax highlighting
- Include examples and screenshots where helpful
- Keep line length under 100 characters
- Use relative links for internal documentation

## Join The Project Team

Interested in becoming a core maintainer? We're always looking for dedicated contributors who:

- Have made consistent, quality contributions to the project
- Show good understanding of the NEAR ecosystem
- Demonstrate excellent communication skills
- Are committed to the project's mission and values

Reach out to the current maintainers through [GitHub Discussions](../../discussions) or email ... to express your interest.

---

Thank you for contributing to NearZen! Together, we're building the future of decentralized regional communities. 🚀
