# React Spreadsheet Prototype

A responsive, spreadsheet-style frontend built using **React 18**, **TypeScript**, **Tailwind CSS**, and **@tanstack/react-table v8**. This UI simulates a mini-spreadsheet interface with editable cells, headers, status/priority styling, and infinite row support.

## Features

- ✅ Spreadsheet-style table UI
- ✅ Add new grouped columns from third-row "+" button
- ✅ Editable cells with in-place editing
- ✅ Conditional color styling for `status` and `priority` values
- ✅ Infinite scroll with automatic row appending
- ✅ Fixed column widths matching headers
- ✅ Central alignment for icons and dropdowns in grouped headers
- ✅Status/priority values like `High`, `In-process`, `Blocked` auto-colored
- ✅"+" buttons dynamically add grouped headers and subheaders


## Tech Stack

- [React 18](https://reactjs.org/)
- [TypeScript (Strict Mode)](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@tanstack/react-table v8](https://tanstack.com/table/v8)
- [Vite](https://vitejs.dev/) for fast bundling and dev server

## 🧪 How to Run Locally

1. **Clone the repo**
```bash
git clone https://github.com/your-username/spreadsheet-ui.git
cd spreadsheet-ui
npm install
npm run dev


