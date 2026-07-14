# CareerCraft AI

Your all-in-one solution for building a winning career profile.

## Features
- **Resume Builder**: Professional templates and real-time editing.
- **AI Cover Letter Generator**: Tailored letters based on job descriptions.
- **AI Resume Review**: Instant scoring and feedback across key categories.
- **AI Interview Prep**: Practice questions and answers with PDF export.

## Deployment & Git Help

### Resolving Authentication Failed (GitHub)
If you see `fatal: Authentication failed`, GitHub likely requires a **Personal Access Token (PAT)** instead of your password.

1. **Generate a Token**:
   - Go to GitHub **Settings** > **Developer Settings** > **Personal Access Tokens** > **Tokens (classic)**.
   - Generate a new token with `repo` scopes.
2. **Use the Token**:
   - When the terminal asks for your password, paste the **Token** instead.
3. **Cache Credentials** (Optional):
   - Run `git config --global credential.helper store` to avoid entering it every time.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + ShadCN UI
- **AI**: Genkit + Google Gemini
- **PDF Generation**: html2canvas + jsPDF
