# Wordply

A simple Wordle clone built with React and Vite.  
This project focuses on implementing core Wordle mechanics such as daily challenges, word validation, and keyboard feedback without using a backend or database.

![Wordply Logo](public/logo.png)

## ✨ Features

- **Daily Challenge (UTC-based)**  
  One deterministic word per day shared by all users.

- **Practice Mode**  
  Unlimited random words after completing the daily challenge.

- **Word Validation**  
  Guesses are checked against a predefined word list.

- **Keyboard Feedback**  
  Correct, present, and absent letter states with proper priority handling.

- **Local Storage Persistence**  
  Daily completion and lock state are stored locally in the browser.

## 🚀 Live Demo

Check out the live app at: [wordply.gabrielnathanael.site](https://wordply.gabrielnathanael.site/)

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Toasts**: [React Hot Toast](https://react-hot-toast.com/)
- **Build Tool**: [Vite](https://vite.dev/)

## 📦 Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/GabrielNathanael/wordle-clone-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd wordle-clone-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 Credits

The word bank list used in this project is sourced from this [Gist by dracos](https://gist.github.com/dracos/dd0668f281e685bad51479e5acaadb93).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Created by [Gabriel Nathanael](https://gabrielnathanael.site/)
