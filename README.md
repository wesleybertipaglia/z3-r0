# 🤖 Z3-R0

**Z3-R0** is my submission for the [Alibaba Cloud Web Game Challenge](https://dev.to/devteam/join-us-for-the-alibaba-cloud-web-game-challenge-3000-in-prizes-1n5d?bb=220943) — a creative contest that invites developers to build robot-themed games or experiences using web technologies and Alibaba Cloud services.

![Z3-R0](./demo/z3r0.jpg)

Instead of a traditional game, I created an **interactive AI chatbot with a bold personality**, packed with entertainment features and lightweight design choices. Z3-R0 is your virtual sidekick: it chats, jokes, plays minigames, speaks aloud, and even reacts when you go AFK.

Built with **React**, **TypeScript**, and **Vite**, Z3-R0 was designed to be fast, fun, and easily deployable — even in resource-limited environments.

## 📌 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

## 💡 Features

- 🎮 **Interactive commands**: gifs, memes, jokes, quotes, games, music & more
- 🗣️ **Text-to-speech**: Uses the Web Speech API to speak responses aloud
- 🧠 **Simulated conversation**: Predefined behavior patterns for quirky dialogue
- 💤 **Idle detection**: Reacts with surprises when you’re inactive
- 🌍 **Multi-language support**: EN, ES, PT, CH, HI
- 💾 **Persistent local storage**: Saves language preference and last 20 messages
- 🛰️ **Dynamic status messages**: Adds personality with randomized system statuses
- 🎭 **Smooth UI transitions**: Online/offline animations and effects
- 🔊 **Sound effects integration**
- 🐳 **Docker-ready**: For clean builds and easy deployment

## 🚀 Demo

A preview of Z3-R0 in action:

![Z3-R0 Screenshot](./demo/image.png)

> _More interactive demo coming soon..._

## ⚡ Get Started

### Prerequisites

- Node.js (v18+ recommended)
- Docker (optional, for containerized build)

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/wesleybertipaglia/z3-r0.git

# Navigate into the project folder
cd z3-r0
```

### Run Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Run in Docker

```bash
# Build the Docker image
docker compose up -d
```

## 🛠️ Usage

Once the bot is live, try typing:

- `!gif` to get a random gif
- `!meme` to fetch a meme
- `!joke` for a random joke
- `!quote` for a motivational quote
- `!game` to get a list of available games
- `!hangman` to play Hangman
- `!trivia` to test your trivia knowledge
- `!music` to listen to some tunes
- `!help` for a list of commands

Z3-R0 keeps the chat engaging, even when you’re AFK 😎

## 🤝 Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [ChatGPT](https://openai.com/blog/chatgpt) for the robot's profile image.
- Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=91931">freesound_community</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=91931">Pixabay</a>
- Musics from [Spotify Embedded API](https://developer.spotify.com/documentation/web-playback-sdk/quick-start/)