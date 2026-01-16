# Snippet Vault

Code snippet manager
---

## Features

* **Code Editing**: Integrated with the **Monaco Editor** (the engine behind VS Code) for both creation and read-only viewing.
* **Next.js 15**: Leveraging Server Components for data fetching and Client Components for editing.
* **Themeable Foundation**: Centralized design tokens allow you to change the entire brand identity by updating a single CSS variable.

---

## Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Database**: [Prisma](https://www.prisma.io/) with SQLite (or your chosen provider)
* **Code Editor**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/snippetbox.git](https://github.com/your-username/snippetbox.git)
cd snippetbox
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup the Database
```bash
# Generate the Prisma client
npx prisma generate

# Run migrations to create your local database
npx prisma migrate dev --name init
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Customization

The project uses a **Design Token** system located in `app/globals.css`. To change the brand identity, simply update the `:root` variables:

```css
:root {
  --brand-color: #6366f1;
  --bg-app: #fcfcfd;
  --text-main: #0f172a;
}
```

---

## Project Structure

* **/app**: Next.js App Router pages and global styles.
* **/components**: Reusable UI components (Header, SnippetForm, CodeViewer).
* **/actions**: Server Actions for CRUD operations.
* **/db**: Prisma client configuration.